const GAME_STATES = {
  UNINITIALISED: "Uninitialised",
  GAME_IN_PROGRESS: "Game in progress",
  GAME_OVER: "Game over",
  PLAYER_A_WON: "Player A wins",
  PLAYER_B_WON: "Player B wins",
  DRAW: "Draw",
};

const MESSAGES = {
  SUCCESS_GAME_INITIALISED: "Game initialised",
  ERROR_INVALID_USER: "Error! Invalid user",
  ERROR_GAME_STATE_UNINITIALISED: "Error! Game state is uninitialised",
  ERROR_NOT_YOUR_TURN: "Error! It is not your turn",
  ERROR_GAME_OVER: "Error! Game is over",
  ERROR_INVALID_MOVE: "Error! Invalid move",
  ERROR_PLAYER_ALREADY_EXISTS: "Error! Player A already exists",
  ERROR_GAME_ALREADY_EXISTS: "Error! Game already exists",
  ERROR_GAME_DOESNOT_EXISTS: "Error! Game does not exist",
};

const BOARD_SIZE = 5;

module.exports = {
  GAME_STATES,
  MESSAGES,
  BOARD_SIZE,
};
