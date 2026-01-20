import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- 1. Importante para o ngModel funcionar
import { RouterModule, Router } from '@angular/router'; // Importei o Router para navegar
import { LucideAngularModule, Search, X, Heart, Clock, Check, BookOpen, GraduationCap, Code, Users, Star, ArrowLeft, Sparkles, Repeat, Eye, EyeOff, LogIn, User, Mail, Lock } from 'lucide-angular';

// Componentes
import { AnimeCardComponent } from './components/anime-card/anime-card.component';
import { ModalComponent } from './components/modal/modal.component';
import { RecModalComponent } from './components/rec-modal/rec-modal.component'; 
import { HeroCarouselComponent } from './components/hero-carousel/hero-carousel.component';

// Serviços
import { AnimeService } from './services/anime.service';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Adicionei FormsModule aqui na lista
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    LucideAngularModule, 
    ModalComponent, 
    RecModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  store = inject(StoreService);
  router = inject(Router); // Para redirecionar quando buscar
  
  icons = { Search, X, Heart, Clock, Check, BookOpen, GraduationCap, Code, Users, Star, ArrowLeft, Sparkles, Repeat, Eye, EyeOff, LogIn, User, Mail, Lock };

  isScrolled = false;
  
  // 3. AS VARIÁVEIS QUE FALTAVAM (Para a busca do Menu)
  query = '';

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > 50;
    });
  }

  // 4. AÇÃO DA BUSCA NO MENU
  handleSearch() {
    if (this.query.trim()) {
       // Se o usuário buscar pelo menu, vamos redirecionar para a Home?
       // Por enquanto, apenas limpamos para evitar erro, pois a Home tem sua própria busca.
       // Uma melhoria futura seria passar esse valor para a Home via QueryParams.
       this.router.navigate(['/home'], { queryParams: { q: this.query } }); 
       console.log('Busca via menu:', this.query);
       this.query = ''; // Limpa após buscar
    }
  }

  clearSearch() {
    this.query = '';
  }

  // Modais
  get selectedAnime() { return this.store.selectedAnime(); }
  closeModal() { this.store.selectedAnime.set(null); }
  
  toggleFav(anime: any) { this.store.toggleFav(anime); }
  toggleWatch(anime: any) { this.store.toggleWatch(anime); }
  addToDiary(entry: any) { this.store.addToDiary(entry); }
}