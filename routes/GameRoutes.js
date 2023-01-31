const express = require("express");
const Joi = require("joi");
const schemaValidation = require("../middlewares/SchemaValidation");
const GameController = require("../controllers/GameController");

const router = express.Router();

// @desc    Create a new game
// @route   POST /new
// @access  Public
router.post(
  "/new",
  schemaValidation(
    Joi.object().keys({
      "playerA-Id": Joi.string().required(),
    })
  ),
  (req, res) => {
    res.json(GameController.createGame(req.body["playerA-Id"]));
  }
);

// @desc    Join a game
// @route   POST /:gameId/join
// @access  Public
router.post(
  "/:gameId/join",
  schemaValidation(
    Joi.object().keys({
      "playerB-Id": Joi.string().required(),
    })
  ),
  (req, res) => {
    res.json(
      GameController.joinGame(req.params.gameId, req.body["playerB-Id"])
    );
  }
);

// @desc    Make a move
// @route   POST /:gameId/move
// @access  Public
router.post(
  "/:gameId/move",
  schemaValidation(
    Joi.object().keys({
      playerId: Joi.string().required(),
      x: Joi.number().required(),
      y: Joi.number().required(),
    })
  ),
  (req, res) => {
    res.json(
      GameController.makeMove(
        req.params.gameId,
        req.body["playerId"],
        req.body["x"],
        req.body["y"]
      )
    );
  }
);

// @desc    Get game status
// @route   Get /:gameId/status
// @access  Public
router.get("/:gameId/status", (req, res) => {
  res.json(GameController.checkStatusOfGame(req.params.gameId));
});

// @desc    Abort a game`
// @route   Get /:gameId/abort
// @access  Public
router.get("/:gameId/abort", (req, res) => {
  res.json(GameController.abortGame(req.params.gameId));
});

// @desc    Undo the last move in game
// @route   Get /:gameId/undo
// @access  Public
router.get("/:gameId/undo", (req, res) => {
  res.json(GameController.undoMove(req.params.gameId));
});

module.exports = router;
