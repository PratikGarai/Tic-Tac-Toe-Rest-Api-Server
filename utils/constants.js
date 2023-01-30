const GAME_STATES = {
    UNINITIALISED : "Uninitialised",
    GAME_IN_PROGRESS : "Game in progress",
    GAME_OVER : "Game over",
    PLAYER_A_WON : "Player A wins",
    PLAYER_B_WON : "Player B wins",
    DRAW : "Draw"
}

const MESSAGES = {
    ERROR_GAME_STATE_UNINITIALISED : "Error! Game state is uninitialised",
    ERROR_NOT_YOUR_TURN : "Error! It is not your turn",
    ERROR_GAME_OVER : "Error! Game is over",
    ERROR_INVALID_MOVE : "Error! Invalid move"
}

module.exports = {
    GAME_STATES,
    MESSAGES
}