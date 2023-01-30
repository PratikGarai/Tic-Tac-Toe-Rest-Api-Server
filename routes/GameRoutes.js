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

module.exports = router;
