import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private currentHowl: Howl | null = null;
  private currentUrl: string | null = null;

  playSound(url: string): void {
    // Si le même son est déjà en cours → toggle pause
    if (this.currentUrl === url) {
      if (this.currentHowl?.playing()) {
        this.currentHowl.pause();
      } else {
        this.currentHowl?.play();
      }
      return;
    }

    // Sinon : stop le précédent
    if (this.currentHowl) {
      this.currentHowl.stop();
    }

    // Lecture du nouveau son
    const sound = new Howl({
      src: [url],
      html5: true
    });

    sound.play();
    this.currentHowl = sound;
    this.currentUrl = url;
  }

  pause(): void {
    if (this.currentHowl && this.currentHowl.playing()) {
      this.currentHowl.pause();
    }
  }

  stop(): void {
    if (this.currentHowl) {
      this.currentHowl.stop();
      this.currentHowl = null;
      this.currentUrl = null;
    }
  }

  isPlaying(url: string): boolean {
    return !!this.currentHowl && this.currentHowl.playing() && this.currentUrl === url;
  }
  
}
