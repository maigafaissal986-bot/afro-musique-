"use strict";

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Vérifier que l'API fonctionne.
app.get("/", (req, res) => {
  res.status(200).json({
    succes: true,
    message: "L'API Afro Musique fonctionne !"
  });
});

// Vérifier l'état du serveur.
app.get("/sante", (req, res) => {
  res.status(200).json({
    succes: true,
    statut: "ok"
  });
});

// Recevoir une demande musicale.
app.post("/generatrice", (req, res) => {
  try {
    const { titre, artiste, style, description } = req.body || {};

    if (
      typeof titre !== "string" ||
      typeof description !== "string" ||
      !titre.trim() ||
      !description.trim()
    ) {
      return res.status(400).json({
        succes: false,
        erreur: "Le titre et la description sont obligatoires."
      });
    }

    const musique = {
      titre: titre.trim(),
      artiste:
        typeof artiste === "string" && artiste.trim()
          ? artiste.trim()
          : "Artiste",
      style:
        typeof style === "string" && style.trim()
          ? style.trim()
          : "Afrobeat",
      description: description.trim()
    };

    console.log("Nouvelle demande musicale :", {
      titre: musique.titre,
      artiste: musique.artiste,
      style: musique.style
    });

    return res.status(200).json({
      succes: true,
      message: "Demande reçue par Afro Musique.",
      musique: musique,
      audioGenere: false,
      prochaineEtape:
        "Connecter un service de génération musicale pour créer le fichier audio."
    });

  } catch (error) {
    console.error("Erreur lors du traitement :", error);

    return res.status(500).json({
      succes: false,
      erreur: "Une erreur interne est survenue."
    });
  }
});

// Traiter les routes inconnues.
app.use((req, res) => {
  res.status(404).json({
    succes: false,
    erreur: "Route introuvable."
  });
});

// Traiter les erreurs.
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err.message);

  if (err instanceof SyntaxError && err.status === 400) {
    return res.status(400).json({
      succes: false,
      erreur: "Le JSON envoyé est invalide."
    });
  }

  return res.status(500).json({
    succes: false,
    erreur: "Erreur interne du serveur."
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Afro Musique API lancée sur le port ${PORT}`);
});
