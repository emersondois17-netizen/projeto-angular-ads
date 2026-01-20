import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Heart, Clock, PenTool, Sparkles, Star, Zap } from 'lucide-angular';

// CORREÇÃO: Usar ../../ para voltar duas pastas e achar o serviço
import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './modal.component.html', 
})
export class ModalComponent implements OnInit {
  @Input() anime: any;
  @Input() isFav = false;
  @Input() isWatch = false;
  
  @Output() onClose = new EventEmitter();
  @Output() onToggleFav = new EventEmitter();
  @Output() onToggleWatch = new EventEmitter();
  @Output() onSaveDiary = new EventEmitter<any>();

  private animeService = inject(AnimeService);

  // Ícones
  readonly icons = { X, Heart, Clock, PenTool, Sparkles, Star, Zap };

  // Estado local
  loggingMode = false;
  logData = { date: new Date().toISOString().split('T')[0], rating: 0, review: '' };
  
  aiResponse: any = null;
  loadingAI = false;
  translatedSynopsis: string | null = null;

  async ngOnInit() {
    // Tenta traduzir a sinopse automaticamente ao abrir
    if (this.anime.synopsis) {
      const prompt = `Traduza a seguinte sinopse de anime para o Português do Brasil. Mantenha o tom original e seja fiel ao conteúdo. Sinopse original: "${this.anime.synopsis}"`;
      this.translatedSynopsis = await this.animeService.askGemini(prompt);
    }
  }

  async handleAskAI() {
    this.loadingAI = true;
    const prompt = `Analise o anime "${this.anime.title}".
    Atue como um crítico de anime sarcástico e divertido.
    Retorne APENAS um JSON válido (sem markdown) com esta estrutura:
    {
      "intro": "Uma frase de impacto.",
      "reasons": ["Motivo 1", "Motivo 2", "Motivo 3"]
    }`;
    
    const res = await this.animeService.askGemini(prompt);
    
    try {
      if (res) {
        const jsonMatch = res.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          this.aiResponse = JSON.parse(jsonMatch[0]);
        }
      }
    } catch (e) {
      console.error("Erro ao ler JSON da IA", e);
    }
    this.loadingAI = false;
  }

  saveLog() {
    this.onSaveDiary.emit({ id: Date.now(), anime: this.anime, ...this.logData });
    this.onClose.emit();
  }
}