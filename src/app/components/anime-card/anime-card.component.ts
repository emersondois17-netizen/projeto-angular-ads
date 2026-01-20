import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Heart, Clock, Check, Star } from 'lucide-angular';

@Component({
  selector: 'app-anime-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule], // Importando módulos necessários
  templateUrl: './anime-card.component.html',   // Aponta para o HTML que vamos criar abaixo
})
export class AnimeCardComponent {
  // Recebe dados do pai (Input)
  @Input() anime: any;
  @Input() isFav = false;
  @Input() isWatch = false;
  @Input() isWatched = false;
  @Input() minimalist = false;

  // Envia eventos para o pai (Output)
  @Output() onClick = new EventEmitter<any>();

  // Ícones que serão usados no HTML
  readonly icons = { Heart, Clock, Check, Star };
}