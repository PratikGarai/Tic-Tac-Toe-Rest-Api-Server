const { uuid } = require("uuidv4");
const StoreModel = require("../models/Store");
const { MESSAGES } = require("../utils/constants");

const STORE = new StoreModel();

const createGame = (playerAId) => {
  // Create a new game and store it in the games object.
  const id = uuid();
  STORE.createGame(id);
  STORE.getGame(id).initialiseA(playerAId);
  return {
    gameId: id,
  };
};

module.exports = {
  createGame,
};
