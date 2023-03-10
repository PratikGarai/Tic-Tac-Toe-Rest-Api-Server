const { MESSAGES } = require("../utils/constants");
const Game = require("./Game");

class Store {
  constructor() {
    this.games = {};
  }

  createGame(id) {
    // Create a new game and store it in the games object.

    // Check if the game already exists.
    if (this.games[id]) {
      throw new Error(MESSAGES.ERROR_GAME_ALREADY_EXISTS);
    }

    // Create a new game.
    this.games[id] = new Game();
    return MESSAGES.SUCCESS_GAME_INITIALISED;
  }

  getGame(id) {
    // Return the game with the given id.
    if (!this.games[id])
      throw new Error(MESSAGES.ERROR_GAME_DOESNOT_EXISTS);
    return this.games[id];
  }

  gameDelete(id) {
    // Delete the game with the given id.
    delete this.games[id];
  }
}

module.exports = Store;
