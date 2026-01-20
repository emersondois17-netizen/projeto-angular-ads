import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, Sparkles, ArrowLeft } from 'lucide-angular';
import { AnimeCardComponent } from '../anime-card/anime-card.component'; // Reaproveitando seu card

@Component({
  selector: 'app-rec-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AnimeCardComponent],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200" (click)="onClose.emit()">
      <div class="bg-[#1a1625] w-full max-w-4xl rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl relative flex flex-col max-h-[85vh]" (click)="$event.stopPropagation()">
        
        <div class="p-6 border-b border-white/10 flex justify-between items-center bg-purple-900/20">
          <h3 class="text-2xl font-bold text-white flex items-center gap-2">
             <lucide-icon [img]="icons.Sparkles" class="text-yellow-400"></lucide-icon> Oráculo Zenkai
          </h3>
          <button (click)="onClose.emit()" class="text-white/70 hover:text-white">
             <lucide-icon [img]="icons.X" [size]="24"></lucide-icon>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto custom-scrollbar bg-[#0f0c14]/50">
          <div class="flex flex-col gap-6">
            @for (item of recommendations; track $index) {
              <div class="flex flex-col md:flex-row gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                
                <div class="shrink-0 mx-auto md:mx-0">
                  @if (item.animeData) {
                    <app-anime-card 
                      [anime]="item.animeData"
                      [isFav]="isFav(item.animeData.mal_id)"
                      [isWatch]="isWatch(item.animeData.mal_id)"
                      [isWatched]="isWatched(item.animeData.mal_id)"
                      (onClick)="onSelectAnime.emit($event)"
                      [minimalist]="true">
                    </app-anime-card>
                  } @else {
                    <div class="w-[120px] aspect-[2/3] bg-white/10 rounded-lg animate-pulse flex items-center justify-center text-xs text-gray-500">
                      Carregando...
                    </div>
                  }
                </div>

                <div class="flex-1 flex flex-col justify-center">
                  <h4 class="text-lg font-bold text-white mb-2">{{ item.title }}</h4>
                  <div class="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                    <p class="text-purple-200 text-sm italic leading-relaxed">
                      <span class="text-yellow-400 mr-2">✨ Oráculo:</span>
                      "{{ item.reason }}"
                    </p>
                  </div>
                  @if (item.animeData) {
                    <button 
                      (click)="onSelectAnime.emit(item.animeData)"
                      class="mt-3 self-start text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                      Ver Detalhes Completos <lucide-icon [img]="icons.ArrowLeft" class="rotate-180" [size]="14"></lucide-icon>
                    </button>
                  }
                </div>

              </div>
            }
          </div>
        </div>

        <div class="p-4 border-t border-white/10 bg-black/20 flex justify-end">
          <button (click)="onClose.emit()" class="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition-colors">Fechar</button>
        </div>
      </div>
    </div>
  `
})
export class RecModalComponent {
  @Input() recommendations: any[] = [];
  
  // Funções para checar status (recebidas do pai ou passadas como Input se preferir, aqui simplifiquei usando Input Functions)
  @Input() isFav!: (id: number) => boolean;
  @Input() isWatch!: (id: number) => boolean;
  @Input() isWatched!: (id: number) => boolean;

  @Output() onClose = new EventEmitter();
  @Output() onSelectAnime = new EventEmitter<any>();

  readonly icons = { X, Sparkles, ArrowLeft };
}