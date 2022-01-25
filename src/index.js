import "./style.css";
import generateaiMove from "./generateaiMove";
import generateCoordinates from "./generateCoordinates";
import Player from "./Player";
import Ship from "./Ship";

const gameboards = document.querySelectorAll(".gameboard");
const message = document.querySelector(".message");
const coordinatesArray = generateCoordinates();

gameboards.forEach((board) => {
  for (let i = 0; i < 100; i += 1) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-coord", coordinatesArray[i]);
    board.appendChild(cell);
  }
});

const player1cells = document.querySelectorAll("#player1 .cell");
const player2cells = document.querySelectorAll("#player2 .cell");

message.textContent = "Place your ships! (press 'R' to rotate)";
const createFleet = () => {
  const acCarrier = new Ship(5);
  const battleship = new Ship(4);
  const cruiser = new Ship(3);
  const destroyer1 = new Ship(2);
  const destroyer2 = new Ship(2);
  const submarine1 = new Ship(1);
  const submarine2 = new Ship(1);
  const fleet = [
    acCarrier,
    battleship,
    cruiser,
    destroyer1,
    destroyer2,
    submarine1,
    submarine2,
  ];
  return fleet;
};

const player1 = new Player("Player 1", createFleet());
const player2 = new Player("Computer", createFleet());
player2.isAI = true;

const gameStart = () => {
  const getRandomInclusive = (min, max) => {
    const minVal = Math.ceil(min);
    const maxVal = Math.floor(max);
    return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
  };
  const rotateRandom = (ship) => {
    const rotate = getRandomInclusive(0, 1);
    if (rotate === 1) {
      ship.rotate();
    }
  };

  let currentCell;
  let currentCoordinates;

  const placeShip = (e) => {
    player1.gameboard.placeShip(
      player1.fleet[0],
      e.target.getAttribute("data-coord")
    );
    player1cells.forEach((cell) => {
      for (let i = 0; i < player1.fleet[0].length; i += 1) {
        if (cell.getAttribute("data-coord") === currentCoordinates[i]) {
          const shipCell = cell;
          shipCell.style.backgroundColor = "rgb(139, 139, 139)";
        }
      }
    });
    player1.fleet.shift();
  };

  const highlightShip = (ship, target, board) => {
    const targetShipCoordinates = [];
    const targetCell = target;
    currentCell = target;
    let inRange = true;
    const letters = "ABCDEFGHIJ";
    const targetLetter = target.getAttribute("data-coord").charAt(0);
    const targetNumber = Number(target.getAttribute("data-coord").slice(1));
    if (!ship.isVertical) {
      for (let i = 0; i < ship.length; i += 1) {
        targetShipCoordinates.push(targetLetter + (targetNumber + i));
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        targetShipCoordinates.push(
          letters.charAt(letters.indexOf(targetLetter) + i) + targetNumber
        );
      }
    }
    currentCoordinates = targetShipCoordinates;
    for (let i = 0; i < targetShipCoordinates.length; i += 1) {
      if (board.coordinates.indexOf(targetShipCoordinates[i]) === -1) {
        inRange = false;
      }
    }
    if (!inRange) {
      if (targetCell.style.backgroundColor !== "rgb(139, 139, 139)") {
        targetCell.style.backgroundColor = "red";
      }
    } else {
      player1cells.forEach((cell) => {
        for (let i = 0; i < targetShipCoordinates.length; i += 1) {
          if (cell.getAttribute("data-coord") === targetShipCoordinates[i]) {
            const greenCell = cell;
            greenCell.style.backgroundColor = "green";
          }
        }
      });
      targetCell.addEventListener("click", placeShip);
      targetCell.addEventListener("mouseleave", (e) => {
        e.target.removeEventListener("click", placeShip);
      });
    }
  };

  const clearBg = () => {
    player1cells.forEach((cell) => {
      const target = cell;
      const bgColor = cell.style.backgroundColor;
      if (bgColor === "red" || bgColor === "green") {
        target.style.backgroundColor = "white";
      }
    });
  };

  const rotateShip = (e) => {
    if (e.key === "r") {
      clearBg();
      player1.fleet[0].rotate();
      highlightShip(player1.fleet[0], currentCell, player1.gameboard);
    }
  };

  if (player2.isAI) {
    while (player2.fleet.length > 0) {
      const move = generateaiMove(player2.gameboard.coordinates);
      rotateRandom(player2.fleet[0]);
      const place = player2.gameboard.placeShip(player2.fleet[0], move);
      if (place === "OK") {
        player2.fleet.shift();
      }
    }
  }

  const highlight = (e) => {
    highlightShip(player1.fleet[0], e.target, player1.gameboard);
  };

  player1cells.forEach((cell) => {
    cell.addEventListener("mouseenter", highlight);
  });

  player1cells.forEach((cell) => {
    cell.addEventListener("mouseleave", clearBg);
  });

  window.addEventListener("keyup", rotateShip);

  const battleStart = () => {
    const enableControls = (func) => {
      player2cells.forEach((cell) => {
        cell.addEventListener("click", func);
      });
    };
    const disableControls = (func) => {
      player2cells.forEach((cell) => {
        cell.removeEventListener("click", func);
      });
    };
    const attackComputer = (e) => {
      const attackCoordinate = e.target.getAttribute("data-coord");
      const attackOutcome = player2.getAttacked(attackCoordinate);
      if (attackOutcome === "miss") {
        e.target.textContent = "●";
        message.textContent = `${player1.name} attacked ${attackCoordinate} and missed!`;
      } else if (attackOutcome === "hit") {
        e.target.textContent = "✕";
        e.target.style.backgroundColor = "rgb(139, 139, 139)";
        message.textContent = `${player1.name} attacked ${attackCoordinate} and hit!`;
      } else if (attackOutcome === "sunk") {
        e.target.textContent = "✕";
        e.target.style.backgroundColor = "rgb(139, 139, 139)";
        message.textContent = `${player1.name} attacked ${attackCoordinate} and sunk the enemy ship!`;
      } else if (attackOutcome === "game over") {
        e.target.textContent = "✕";
        e.target.style.backgroundColor = "rgb(139, 139, 139)";
        message.textContent = `${player1.name} sunk all enemy ships and won!`;
      }
    };
    const aiArray = generateCoordinates();
    const receiveAttack = () => {
      const attackCoordinate = generateaiMove(aiArray);
      aiArray.splice(aiArray.indexOf(attackCoordinate), 1);
      const attackOutcome = player1.getAttacked(attackCoordinate);
      let attackCell;
      for (let i = 0; i < player1cells.length; i += 1) {
        if (player1cells[i].getAttribute("data-coord") === attackCoordinate) {
          attackCell = player1cells[i];
        }
      }
      if (attackOutcome === "miss") {
        attackCell.textContent = "●";
        message.textContent = `${player2.name} attacked ${attackCoordinate} and missed!`;
      } else if (attackOutcome === "hit") {
        attackCell.textContent = "✕";
        message.textContent = `${player2.name} attacked ${attackCoordinate} and hit!`;
      } else if (attackOutcome === "sunk") {
        attackCell.textContent = "✕";
        message.textContent = `${player2.name} attacked ${attackCoordinate} and sunk the enemy ship!`;
      } else if (attackOutcome === "game over") {
        attackCell.textContent = "✕";
        message.textContent = `${player2.name} sunk all enemy ships and won!`;
      }
    };
    const compTurn = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          if (player2.gameboard.ships.length !== 0) {
            receiveAttack();
          }
          resolve("resolved");
        }, 2000);
      });
    const attackCycle = async (e) => {
      attackComputer(e);
      disableControls(attackCycle);
      await compTurn();
      enableControls(attackCycle);
      if (
        player1.gameboard.ships.length === 0 ||
        player2.gameboard.ships.length === 0
      ) {
        disableControls(attackCycle);
      }
    };
    enableControls(attackCycle);
  };

  const disablePlacement = () => {
    if (player1.fleet.length === 0) {
      player1cells.forEach((cell) => {
        cell.removeEventListener("mouseenter", highlight);
      });
      message.textContent = "Battle begins!";
      battleStart();
      window.removeEventListener("click", disablePlacement);
    }
  };

  window.addEventListener("click", disablePlacement);
  /*
  player2.gameboard.ships.forEach((ship) => {
    ship.coordinates.forEach((c) => {
      player2cells.forEach((cell) => {
        if (c === cell.getAttribute("data-coord")) {
          cell.classList.add("ship");
        }
      });
    });
  });
*/
};

gameStart();
