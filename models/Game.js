const { GAME_STATES, MESSAGES, BOARD_SIZE } = require("../utils/constants");

class Game {
  constructor() {
    // Create an instance of the Game class.
    this.gameState = GAME_STATES.UNINITIALISED;
    this.playerA = null;
    this.playerB = null;
    this.currentPlayer = null;
    this.board = null;
  }

  initialiseA(playerA) {
    // Initialise the game with player A.
    this.playerA = playerA;
  }

  initialiseB(playerB) {
    // Initialise the game with player B.
    this.playerB = playerB;
  }

  initialiseBoard() {
    // Initialise the game board as a 2D array of "_".
    this.board = new Array(BOARD_SIZE)
      .fill(null)
      .map(() => new Array(BOARD_SIZE).fill("_"));
  }

  start() {
    // Start the game.
    this.gameState = GAME_STATES.GAME_IN_PROGRESS;
    this.currentPlayer = this.playerA;
    this.initialiseBoard();
  }

  move(player, row, col) {
    // Make a move.

    // Check if player is allowd to play this game.
    if (player !== this.playerA && player !== this.playerB) {
      throw new Error(MESSAGES.ERROR_INVALID_USER);
    }

    // Check if game is in progress.
    if (this.gameState !== GAME_STATES.GAME_IN_PROGRESS) {
      throw new Error(MESSAGES.ERROR_GAME_OVER);
    }

    // Check if it is the player's turn.
    if (this.currentPlayer !== player) {
      throw new Error(MESSAGES.ERROR_NOT_YOUR_TURN);
    }

    // Check if the move is valid.
    if (this.board[row][col] !== "_") {
      throw new Error(MESSAGES.ERROR_INVALID_MOVE);
    }

    // Make the move.
    if (player === this.playerA) this.board[row][col] = "X";
    else this.board[row][col] = "O";

    // Switch the current player.
    if (this.currentPlayer === this.playerA) this.currentPlayer = this.playerB;
    else this.currentPlayer = this.playerA;

    return this.gameState;
  }
}

module.exports = Game;
