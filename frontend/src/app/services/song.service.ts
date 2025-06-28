import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Song {
  _id?: string;
  title: string;
  artist: string;
  genre: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = 'https://spotify-backend-jgpk.onrender.com/api/songs';


  constructor(private http: HttpClient) {}

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrl);
  }


  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.apiUrl, song);
  }
}
