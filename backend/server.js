const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "L'API Afro Musique fonctionne !"
  });
});

app.get("/sante", (req, res) => {
  res.json({
    statut: "ok"
  });
});

app.post("/generatrice", (req, res) => {
  try {
    const { titre, artiste, style, description } = req.body;

    if (!titre || !description) {
      return res.status(400).json({
        succes: false,
        erreur: "Le titre et la description sont obligatoires."
      });
    }

    res.json({
      succes: true,
      message: "Demande reçue par Afro Musique.",
      musique: {
        titre,
        artiste: artiste || "Artiste",
        style: style || "Afro",
        description
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      succes: false,
      erreur: "Erreur du serveur."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Afro Musique API lancée sur le port ${PORT}`);
});
