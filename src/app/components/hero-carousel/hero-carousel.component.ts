import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Play, Info, Star, ChevronLeft, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group">
      
      @for (anime of animes; track anime.mal_id; let i = $index) {
        <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
             [class.opacity-100]="i === currentIndex()"
             [class.opacity-0]="i !== currentIndex()"
             [class.z-10]="i === currentIndex()">
          
          <div class="absolute inset-0">
            <img [src]="anime.images.jpg.large_image_url" class="w-full h-full object-cover opacity-60 blur-sm scale-105" alt="Background">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0f0c14] via-[#0f0c14]/60 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-[#0f0c14] via-[#0f0c14]/40 to-transparent"></div>
          </div>

          <div class="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
            <div class="grid md:grid-cols-2 gap-8 items-center w-full">
              
              <div class="space-y-6 animate-in slide-in-from-left-10 duration-700 fade-in">
                <span class="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-purple-500/30">
                  Destaque #{{ i + 1 }}
                </span>
                
                <h1 class="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
                  {{ anime.title }}
                </h1>
                
                <div class="flex items-center gap-4 text-sm text-gray-300 font-medium">
                  <span class="text-green-400 font-bold">{{ anime.status }}</span>
                  <span>•</span>
                  <span>{{ anime.year || '2025' }}</span>
                  <span>•</span>
                  <span class="flex items-center gap-1 text-yellow-400">
                    <lucide-icon name="star" [size]="14" class="fill-current"></lucide-icon> {{ anime.score }}
                  </span>
                </div>

                <p class="text-gray-300 text-sm md:text-lg line-clamp-3 md:line-clamp-4 max-w-xl leading-relaxed drop-shadow-md">
                  {{ anime.synopsis }}
                </p>

                <div class="flex gap-4 pt-4">
                  <button (click)="onWatch.emit(anime)" class="bg-white text-black px-8 py-3.5 rounded-full font-bold flex items-center gap-2 hover:bg-purple-50 hover:scale-105 transition-all shadow-xl shadow-white/10">
                    <lucide-icon name="play" [size]="20" class="fill-black"></lucide-icon> Assistir Agora
                  </button>
                  <button (click)="onDetails.emit(anime)" class="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 hover:bg-white/20 transition-all">
                    <lucide-icon name="info" [size]="20"></lucide-icon> Detalhes
                  </button>
                </div>
              </div>

              <div class="hidden md:block relative justify-self-center animate-in slide-in-from-right-10 duration-1000 fade-in">
                 <img [src]="anime.images.jpg.large_image_url" class="w-[300px] rounded-xl shadow-2xl shadow-purple-900/50 border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer object-cover" (click)="onDetails.emit(anime)">
              </div>

            </div>
          </div>
        </div>
      }

      <button (click)="prev()" class="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/20 hover:bg-black/50 text-white/50 hover:text-white rounded-full backdrop-blur-sm border border-white/5 transition-all opacity-0 group-hover:opacity-100">
        <lucide-icon name="chevron-left" [size]="32"></lucide-icon>
      </button>
      <button (click)="next()" class="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/20 hover:bg-black/50 text-white/50 hover:text-white rounded-full backdrop-blur-sm border border-white/5 transition-all opacity-0 group-hover:opacity-100">
        <lucide-icon name="chevron-right" [size]="32"></lucide-icon>
      </button>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        @for (anime of animes; track anime.mal_id; let i = $index) {
          <button (click)="setIndex(i)" 
            class="h-1.5 rounded-full transition-all duration-500" 
            [class.w-8]="i === currentIndex()" 
            [class.bg-purple-500]="i === currentIndex()"
            [class.w-2]="i !== currentIndex()"
            [class.bg-white/30]="i !== currentIndex()">
          </button>
        }
      </div>
    </div>
  `
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  @Input() animes: any[] = [];
  @Output() onWatch = new EventEmitter<any>();
  @Output() onDetails = new EventEmitter<any>();

  currentIndex = signal(0);
  intervalId: any;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 6000); // Muda a cada 6 segundos
  }

  stopAutoPlay() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  next() {
    this.currentIndex.update(i => (i + 1) % this.animes.length);
  }

  prev() {
    this.currentIndex.update(i => (i - 1 + this.animes.length) % this.animes.length);
  }

  setIndex(i: number) {
    this.stopAutoPlay(); // Pausa se o usuário clicar manualmente
    this.currentIndex.set(i);
    this.startAutoPlay(); // Retoma
  }
}