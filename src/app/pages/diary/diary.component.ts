import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Check, Clock, Star, BookOpen, Repeat } from 'lucide-angular';
import { StoreService } from '../../services/store.service';
import { AnimeCardComponent } from '../../components/anime-card/anime-card.component';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AnimeCardComponent],
  templateUrl: './diary.component.html'
})
export class DiaryComponent {
  store = inject(StoreService);
  icons = { Check, Clock, Star, BookOpen, Repeat };
  
  // Controle interno de abas (Diário vs Watchlist)
  activeTab: 'timeline' | 'watchlist' = 'timeline';

  get diary() { return this.store.diary(); }
  get watchlist() { return this.store.watchlist(); }
  
  get heroImage() {
     const d = this.store.diary();
     return d.length > 0 ? d[0].anime.images.jpg.large_image_url : null;
  }

  openModal(anime: any) { this.store.selectedAnime.set(anime); }
}