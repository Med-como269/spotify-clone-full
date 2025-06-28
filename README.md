# Spotify Clone – Projet de Rattrapage

Ce projet est une maquette fonctionnelle inspirée de Spotify, développée dans le cadre du rattrapage. Il permet de lire des musiques, de gérer des playlists, des favoris, d’importer des fichiers audio locaux, et de suivre les choix des utilisateurs.

---

##  Technologies utilisées

| Côté | Techno principale |
|------|-------------------|
| Frontend | Angular 16 |
| Backend  | Node.js + Express |
| Base de données | MongoDB Atlas |
| Traitement audio | Howler.js |
| Visualisation | Power BI (à finaliser) |
| Déploiement backend | Render |
| Déploiement frontend | Firebase Hosting |

---

##  Fonctionnalités principales

- Importer une chanson (titre, artiste, genre, URL ou fichier local)  
- Lecture audio en ligne ou locale  
- Création et gestion de **playlists**  
- Ajout et suppression de **favoris**  
- Affichage filtré des favoris  
- Export CSV des chansons pour Power BI  
- Déploiement complet (frontend + backend)  
- Sauvegarde des données sur MongoDB  

---

##  Liens utiles

 Élément | Lien 
- Frontend déployé (Firebase) | [https://spotify-clone-e48de.web.app](https://spotify-clone-e48de.web.app) |
- Backend API (Render) | [https://spotify-backend-jgpk.onrender.com](https://spotify-backend-jgpk.onrender.com) |
- Export CSV | [https://spotify-backend-jgpk.onrender.com/api/export/songs](https://spotify-backend-jgpk.onrender.com/api/export/songs) |
- GitHub (Backend) | [https://github.com/Med-como269/spotify-backend](https://github.com/Med-como269/spotify-backend) |
- GitHub (Frontend) | [https://github.com/Med-como269/spotify-frontend](https://github.com/Med-como269/spotify-frontend) |
| 🛠️ Console Firebase | [console.firebase.google.com/project/spotify-clone-e48de](https://console.firebase.google.com/project/spotify-clone-e48de/overview) |

----

##  Structure du projet

spotify-clone/
├── backend/
│ ├── models/
│ ├── server.js
│ ├── .gitignore
│ ├── package.json
│ └── .env (non inclus)
├── frontend/
│ ├── src/
│ ├── angular.json
│ ├── firebase.json
│ └── package.json
└── README.md
