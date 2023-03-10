const { GAME_STATES, MESSAGES, BOARD_SIZE } = require("../utils/constants");

class Game {
  constructor() {
    // Create an instance of the Game class.
    this.gameState = GAME_STATES.UNINITIALISED;
    this.playerA = null;
    this.playerB = null;
    this.currentPlayer = null;
    this.board = null;
    this.turnCount = 0;
    this.buffer = [];
  }

  initialiseA(playerA) {
    // Initialise the game with player A.
    if (this.playerA) {
      throw new Error(MESSAGES.ERROR_PLAYER_ALREADY_EXISTS);
    }
    this.playerA = playerA;
  }

  initialiseB(playerB) {
    // Initialise the game with player B.
    if (playerB === this.playerA) {
      throw new Error(MESSAGES.ERROR_PLAYER_ALREADY_EXISTS);
    }
    if (this.playerB) {
      throw new Error(MESSAGES.ERROR_PLAYER_ALREADY_EXISTS);
    }
    this.playerB = playerB;
    this.start();
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
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
      throw new Error(MESSAGES.ERROR_INVALID_MOVE);
    }
    if (this.board[row][col] !== "_") {
      throw new Error(MESSAGES.ERROR_INVALID_MOVE);
    }

    // Make the move.
    if (player === this.playerA) {
      this.board[row][col] = "X";
      this.buffer.push({
        player: this.playerA,
        pos: [row, col],
      });
    } else {
      this.board[row][col] = "O";
      this.buffer.push({
        player: this.playerB,
        pos: [row, col],
      });
    }

    // Switch the current player.
    if (this.currentPlayer === this.playerA) {
      this.currentPlayer = this.playerB;
    } else {
      this.currentPlayer = this.playerA;
    }
    this.turnCount++;
    this.checkGame();
    // Check if the game is over.
    if (
      this.gameState === GAME_STATES.GAME_IN_PROGRESS &&
      this.turnCount === BOARD_SIZE * BOARD_SIZE
    ) {
      this.gameState = GAME_STATES.DRAW;
    }
    return this.gameState;
  }

  checkGame() {
    // Check if the game is over.

    if (this.gameState === GAME_STATES.GAME_IN_PROGRESS) {
      // Check if player A won rowise or columnwise.
      for (let i = 0; i < BOARD_SIZE; i++) {
        let rowWin = 0;
        let colWin = 0;
        for (let j = 0; j < BOARD_SIZE; j++) {
          if (this.board[i][j] === "X") rowWin++;
          if (this.board[j][i] === "X") colWin++;
        }
        if (rowWin == BOARD_SIZE || colWin == BOARD_SIZE) {
          this.gameState = GAME_STATES.PLAYER_A_WON;
          return this.gameState;
        }
      }

      // Check if player B won rowwise or columnwise.
      for (let i = 0; i < BOARD_SIZE; i++) {
        let rowWin = 0;
        let colWin = 0;
        for (let j = 0; j < BOARD_SIZE; j++) {
          if (this.board[i][j] === "O") rowWin++;
          if (this.board[j][i] === "O") colWin++;
        }
        if (rowWin == BOARD_SIZE || colWin == BOARD_SIZE) {
          this.gameState = GAME_STATES.PLAYER_B_WON;
          return this.gameState;
        }
      }

      // Check if player A won diagonally.
      let ldiagWin = 0;
      let rdiagWin = 0;
      for (let i = 0; i < BOARD_SIZE; i++) {
        if (this.board[i][i] === "X") ldiagWin++;
        if (this.board[i][BOARD_SIZE - 1 - i] === "X") rdiagWin++;
      }
      if (ldiagWin == BOARD_SIZE || rdiagWin == BOARD_SIZE) {
        this.gameState = GAME_STATES.PLAYER_A_WON;
        return this.gameState;
      }

      // Check if player B won diagonally.
      ldiagWin = 0;
      rdiagWin = 0;
      for (let i = 0; i < BOARD_SIZE; i++) {
        if (this.board[i][i] === "O") ldiagWin++;
        if (this.board[i][BOARD_SIZE - 1 - i] === "O") rdiagWin++;
      }
      if (ldiagWin == BOARD_SIZE || rdiagWin == BOARD_SIZE) {
        this.gameState = GAME_STATES.PLAYER_A_WON;
        return this.gameState;
      }
    } else {
      return this.gameState;
    }
  }

  getState() {
    // Get the current state of the game.
    return this.gameState;
  }

  getBoard() {
    return this.board;
  }

  abortGame() {
    // Abort the game.
    if (
      this.gameState === GAME_STATES.GAME_IN_PROGRESS ||
      this.gameState === GAME_STATES.UNINITIALISED
    ) {
      this.gameState = GAME_STATES.GAME_ABORTED;
      return this.gameState;
    } else {
      throw new Error(MESSAGES.ERROR_GAME_OVER);
    }
  }

  getCurrentPlayer() {
    if (this.gameState === GAME_STATES.GAME_IN_PROGRESS) {
      return this.currentPlayer === this.playerA ? "Player A" : "Player B";
    } else {
      throw new Error(MESSAGES.ERROR_GAME_OVER);
    }
  }

  undo() {
    if (this.gameState !== GAME_STATES.GAME_IN_PROGRESS) {
      throw new Error(MESSAGES.ERROR_GAME_NOT_IN_PROGRESS);
    }
    if (this.buffer.length === 0) {
      throw new Error(MESSAGES.ERROR_NO_UNDO);
    }

    const lastMove = this.buffer[this.buffer.length - 1];
    this.board[lastMove.pos[0]][lastMove.pos[1]] = "_";
    this.currentPlayer = lastMove.player;
    this.buffer = this.buffer.slice(0, this.buffer.length - 1);
  }
}

module.exports = Game;
