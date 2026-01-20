import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sparkles, Star, Heart } from 'lucide-angular';
import { StoreService } from '../../services/store.service';
import { AnimeService } from '../../services/anime.service';
import { AnimeCardComponent } from '../../components/anime-card/anime-card.component';
import { RecModalComponent } from '../../components/rec-modal/rec-modal.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AnimeCardComponent, RecModalComponent],
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
  store = inject(StoreService);
  animeService = inject(AnimeService);
  icons = { Sparkles, Star, Heart };

  recResult: any = null;
  recLoading = false;

  get favorites() { return this.store.favorites(); }
  
  get favoriteHeroImage() {
     const favs = this.store.favorites();
     return favs.length > 0 ? favs[0].images.jpg.large_image_url : null;
  }

  // Helpers para o RecModal
  checkFav = (id: number) => this.store.isFav(id);
  checkWatch = (id: number) => this.store.isWatch(id);
  checkWatched = (id: number) => this.store.isWatched(id);

  openModal(anime: any) { this.store.selectedAnime.set(anime); }

  async getRecommendations() {
    if (this.favorites.length === 0) return;
    this.recLoading = true;
    this.recResult = null;

    const favNames = this.favorites.map(a => a.title).join(', ');
    const prompt = `Atue como um sábio otaku. Com base na minha lista de favoritos: ${favNames}, recomende 3 animes que eu PRECISO assistir. Retorne APENAS um JSON válido array [{"title": "Nome", "reason": "Motivo"}]`;
    
    try {
      const res = await this.animeService.askGemini(prompt);
      if (res) {
         const match = res.match(/\[[\s\S]*\]/);
         if (match) {
            const recs = JSON.parse(match[0]);
            const enriched = await Promise.all(recs.map(async (r: any) => {
               try {
                  const api = await this.animeService.searchAnimes(r.title);
                  return { ...r, animeData: api.data?.[0] || null };
               } catch { return { ...r, animeData: null }; }
            }));
            this.recResult = enriched;
         }
      }
    } catch (e) { console.error(e); }
    this.recLoading = false;
  }
}