const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const { notFound, errorHandler } = require("./middlewares/ErrorMiddlewares");
const cors = require("cors");
const gameRoutes = require("./routes/GameRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server API is running");
});

app.use("/game", gameRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

main = async () => {
  app.listen(
    PORT,
    console.log(
      `Server running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT}...`.yellow.bold
    )
  );
};

main();