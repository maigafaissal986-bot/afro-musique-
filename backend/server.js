const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Afro Musique API fonctionne !"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Afro Musique API démarrée sur le port ${PORT}`);
});
