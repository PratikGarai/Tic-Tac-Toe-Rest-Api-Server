const { v4: uuidv4 } = require("uuid");
const StoreModel = require("../models/Store");
const { MESSAGES, GAME_STATES } = require("../utils/constants");

const STORE = new StoreModel();

const createGame = (playerAId) => {
  // Create a new game and store it in the games object.
  const id = uuidv4();
  STORE.createGame(id);
  STORE.getGame(id).initialiseA(playerAId);
  return {
    gameId: id,
    message: MESSAGES.SUCCESS_GAME_INITIALISED,
  };
};

const joinGame = (gameId, playerBId) => {
  // Join the game with the given id.
  const game = STORE.getGame(gameId);
  game.initialiseB(playerBId);
  return {
    gameId: gameId,
    message: MESSAGES.SUCCESS_GAME_JOINED,
  };
};

const checkStatusOfGame = (gameId) => {
  // Check the status of the game.
  const game = STORE.getGame(gameId);
  const board = game.getBoard();
  if (board) {
    return {
      status: game.getState(),
      board: board,
    };
  } else {
    return {
      status: game.getState(),
    };
  }
};

const abortGame = (gameId) => {
  // Abort the game with the given id.
  const game = STORE.getGame(gameId);
  game.abortGame();
  return {
    gameId: gameId,
    message: MESSAGES.SUCCESS_GAME_ABORTED,
  };
};

const makeMove = (gameId, playerId, x, y) => {
  // Make a move in the game with the given id.
  const game = STORE.getGame(gameId);
  game.move(playerId, x, y);
  const state = game.getState();
  if (state === GAME_STATES.GAME_IN_PROGRESS) {
    const player = game.getCurrentPlayer();
    return {
      gameId: gameId,
      status: game.getState(),
      message: `It is ${player}'s turn`,
    };
  } else {
    return {
      gameId: gameId,
      status: game.getState(),
    };
  }
};

const undoMove = (gameId) => {
  const game = STORE.getGame(gameId);
  game.undo()
  return {
    message : "Ok"
  }
} 

module.exports = {
  createGame,
  joinGame,
  checkStatusOfGame,
  abortGame,
  makeMove,
  undoMove
};
