const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: String,
  genre: String,
  url: String, // lien audio vers fichier mp3, etc.
}, { timestamps: true });

module.exports = mongoose.model('Song', SongSchema);
