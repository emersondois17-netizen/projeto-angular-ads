import { Component, inject, OnInit } from '@angular/core'; // Removi 'effect'
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // <--- Importante: ActivatedRoute
import { LucideAngularModule, Search, ArrowLeft } from 'lucide-angular';

import { AnimeService } from '../../services/anime.service';
import { StoreService } from '../../services/store.service';
import { AnimeCardComponent } from '../../components/anime-card/anime-card.component';
import { HeroCarouselComponent } from '../../components/hero-carousel/hero-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AnimeCardComponent, HeroCarouselComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  animeService = inject(AnimeService);
  store = inject(StoreService);
  route = inject(ActivatedRoute); // <--- Injetamos a Rota
  router = inject(Router);
  
  icons = { Search, ArrowLeft };

  topAnimes: any[] = [];
  popularAnimes: any[] = [];
  searchResults: any[] = [];
  
  loading = false;
  lastSearch = '';

  ngOnInit() {
    // 1. OUVINTE DA URL (A mágica acontece aqui)
    this.route.queryParams.subscribe(params => {
      const termo = params['q'];
      
      if (termo) {
        // Se tem ?q=algo na URL, faz a busca
        this.querySearch(termo);
      } else {
        // Se não tem, carrega a Home normal (se já não estiver carregada)
        this.searchResults = []; // Limpa resultados anteriores
        if (this.topAnimes.length === 0) {
           this.loadInitialData();
        }
      }
    });
  }

  async loadInitialData() {
    this.loading = true;
    try {
      const top = await this.animeService.getTopAnimes('airing');
      this.topAnimes = top.data || [];
      await new Promise(r => setTimeout(r, 1000)); // Delay anti-bloqueio
      const pop = await this.animeService.getTopAnimes('bypopularity');
      this.popularAnimes = pop.data || [];
    } catch (e) { console.error(e); } 
    finally { this.loading = false; }
  }

  async querySearch(query: string) {
    this.loading = true;
    this.lastSearch = query;
    try {
      const res = await this.animeService.searchAnimes(query);
      this.searchResults = res.data || [];
    } catch (e) { console.error(e); } 
    finally { this.loading = false; }
  }

  clearSearch() {
    // Para limpar, basta navegar para a rota sem parâmetros
    this.router.navigate(['/home']);
  }

  openModal(anime: any) {
    this.store.selectedAnime.set(anime);
  }
}