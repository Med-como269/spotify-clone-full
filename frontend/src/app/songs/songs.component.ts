import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SongService, Song } from '../services/song.service';
import { AudioService } from '../services/audio.service';
import { PlaylistService, Playlist } from '../services/playlist.service';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  songs: Song[] = [];
  playlists: Playlist[] = [];

  newSong: Song = {
    title: '',
    artist: '',
    genre: '',
    url: ''
  };

  newPlaylistName = '';
  favoriteSongs: string[] = [];
  showOnlyFavorites = false;

  constructor(
    private songService: SongService,
    public audioService: AudioService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.songService.getSongs().subscribe(data => {
      this.songs = data;
    });

    this.playlistService.getPlaylists().subscribe(data => {
      this.playlists = data;
    });

    if (typeof window !== 'undefined' && window.localStorage) {
      const savedFavorites = localStorage.getItem('favoriteSongs');
      this.favoriteSongs = savedFavorites ? JSON.parse(savedFavorites) : [];
    }
  }

  addSong(): void {
    if (!this.newSong.url || !this.newSong.title.trim()) {
      alert("Veuillez remplir le titre et importer un fichier audio.");
      return;
    }
  
    this.songService.addSong(this.newSong).subscribe((added: Song) => {
      this.songs.push(added);
      this.newSong = { title: '', artist: '', genre: '', url: '' };
    });
  }
  

  // Méthode pour gérer l'import de fichiers audio locaux
  handleFileUpload(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = () => {
      const audioUrl = reader.result as string;
      console.log('🎵 Audio encodé base64 :', audioUrl.slice(0, 50), '...');
      this.newSong.url = audioUrl;
    };
    reader.readAsDataURL(file);
  }
  

  play(url: string): void {
    this.audioService.playSound(url);
  }

  pause(): void {
    this.audioService.pause();
  }

  toggleFavorite(song: Song): void {
    const index = this.favoriteSongs.indexOf(song.title);
    if (index !== -1) {
      this.favoriteSongs.splice(index, 1);
    } else {
      this.favoriteSongs.push(song.title);
    }
    localStorage.setItem('favoriteSongs', JSON.stringify(this.favoriteSongs));
  }

  isFavorite(song: Song): boolean {
    return this.favoriteSongs.includes(song.title);
  }

  filteredSongs(): Song[] {
    return this.showOnlyFavorites
      ? this.songs.filter(song => this.isFavorite(song))
      : this.songs;
  }

  createPlaylist(): void {
    if (!this.newPlaylistName.trim()) return;

    this.playlistService.createPlaylist(this.newPlaylistName).subscribe((playlist) => {
      this.playlists.push(playlist);
      this.newPlaylistName = '';
    });
  }

  addToPlaylist(playlistId: string, songId: string): void {
    this.playlistService.addSongToPlaylist(playlistId, songId).subscribe(updated => {
      const index = this.playlists.findIndex(p => p._id === updated._id);
      if (index !== -1) {
        this.playlists[index] = updated;
      }
    });
  }

  onPlaylistSelect(event: Event, song: Song): void {
    const selectElement = event.target as HTMLSelectElement;
    const playlistId = selectElement.value;

    if (playlistId && song._id) {
      this.addToPlaylist(playlistId, song._id);
    }
  }
}
