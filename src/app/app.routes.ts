import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { DiaryComponent } from './pages/diary/diary.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  // Se o caminho for vazio, redireciona para 'home'
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  
  // Rotas normais
  { path: 'home', component: HomeComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'diary', component: DiaryComponent },
  { path: 'login', component: LoginComponent },
  
  // Rota Coringa: Se digitar qualquer coisa errada vai pra home
  { path: '**', redirectTo: 'home' } 
];