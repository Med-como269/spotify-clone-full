// src/app/services/playlist.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './song.service';

export interface Playlist {
  _id?: string;
  name: string;
  songs: Song[];
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = 'https://spotify-backend-jgpk.onrender.com/api/playlists';



  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl);
  }

  createPlaylist(name: string): Observable<Playlist> {
    return this.http.post<Playlist>(this.apiUrl, { name });
  }

  addSongToPlaylist(playlistId: string, songId: string): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.apiUrl}/${playlistId}/songs`, { songId });
  }
}
