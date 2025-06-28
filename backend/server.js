// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { Parser } = require('json2csv'); // <-- ajouté pour export CSV

const app = express();

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB models
const Song = require('./models/Song');
const Playlist = require('./models/Playlist');

// --- ROUTES SONGS ---

// Ajouter une chanson
app.post('/api/songs', async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtenir toutes les chansons
app.get('/api/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ROUTES PLAYLISTS ---

// Créer une nouvelle playlist
app.post('/api/playlists', async (req, res) => {
  try {
    const playlist = new Playlist({ name: req.body.name, songs: [] });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ajouter une chanson à une playlist
app.put('/api/playlists/:id/songs', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: 'Playlist non trouvée' });

    const songId = req.body.songId;
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.json(playlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Récupérer toutes les playlists (avec les chansons)
app.get('/api/playlists', async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs');
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- EXPORT CSV DES CHANSONS ---
app.get('/api/export/songs', async (req, res) => {
  try {
    const songs = await Song.find().lean();
    const fields = ['title', 'artist', 'genre', 'url', 'createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(songs);

    res.setHeader('Content-Disposition', 'attachment; filename=songs.csv');
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Erreur export CSV' });
  }
});

// Test simple
app.get('/api/hello', (req, res) => {
  res.send({ message: 'API backend OK' });
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Lancement serveur
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
