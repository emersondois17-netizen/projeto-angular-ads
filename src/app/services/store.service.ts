import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // Estados 
  favorites = signal<any[]>(this.load('favs'));
  watchlist = signal<any[]>(this.load('watch'));
  diary = signal<any[]>(this.load('diary'));
  
  // Controle de Interface
  selectedAnime = signal<any>(null); // Qual anime está no modal
  searchQuery = signal<string>('');  // O que foi digitado na busca (CORREÇÃO AQUI)

  constructor() {
    // Salva automaticamente no LocalStorage sempre que mudar
    effect(() => this.save('favs', this.favorites()));
    effect(() => this.save('watch', this.watchlist()));
    effect(() => this.save('diary', this.diary()));
  }

  private load(key: string) {
    const data = localStorage.getItem(`zenkai_${key}`);
    return data ? JSON.parse(data) : [];
  }

  private save(key: string, data: any[]) {
    localStorage.setItem(`zenkai_${key}`, JSON.stringify(data));
  }

  // Ações
  toggleFav(anime: any) {
    const list = this.favorites();
    const exists = list.find(i => i.mal_id === anime.mal_id);
    if (exists) {
      this.favorites.set(list.filter(i => i.mal_id !== anime.mal_id));
    } else {
      this.favorites.set([anime, ...list]);
    }
  }

  toggleWatch(anime: any) {
    const list = this.watchlist();
    const exists = list.find(i => i.mal_id === anime.mal_id);
    if (exists) {
      this.watchlist.set(list.filter(i => i.mal_id !== anime.mal_id));
    } else {
      this.watchlist.set([anime, ...list]);
    }
  }

  addToDiary(entry: any) {
    const currentDiary = this.diary();
    const isRewatch = currentDiary.some(e => e.anime.mal_id === entry.anime.mal_id);
    const newEntry = { ...entry, rewatched: isRewatch };
    
    this.diary.set([newEntry, ...currentDiary]);

    // Remove da watchlist se já assistiu
    const inWatch = this.watchlist().find(a => a.mal_id === entry.anime.mal_id);
    if (inWatch) this.toggleWatch(inWatch);
  }

  // Helpers visuais
  isFav(id: number) { return this.favorites().some(a => a.mal_id === id); }
  isWatch(id: number) { return this.watchlist().some(a => a.mal_id === id); }
  isWatched(id: number) { return this.diary().some(a => a.anime.mal_id === id); }
  
  get averageScore() {
    const d = this.diary();
    return d.length > 0
      ? (d.reduce((acc, curr) => acc + curr.rating, 0) / d.length).toFixed(1)
      : '0.0';
  }
}