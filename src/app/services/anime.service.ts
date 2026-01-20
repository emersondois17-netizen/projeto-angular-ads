import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private http = inject(HttpClient);
  
  // ⚠️ Cole sua chave API aqui entre as aspas
  private API_KEY_GEMINI = "AIzaSyDnH5HLnBCRT2O8BaWfyDSjDBqQUQ3koFY"; 
  private JIKAN_API_URL = "https://api.jikan.moe/v4";

  // Delay para evitar bloqueio da API (Rate Limit)
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Busca animes por texto
  async searchAnimes(query: string) {
    await this.delay(600);
    // O firstValueFrom converte o Observable do Angular para Promise (igual ao fetch do React)
    return firstValueFrom(this.http.get<any>(`${this.JIKAN_API_URL}/anime?q=${query}&sfw&limit=24`));
  }

  // Busca Tops e Populares
  async getTopAnimes(filter: string) {
    await this.delay(300);
    return firstValueFrom(this.http.get<any>(`${this.JIKAN_API_URL}/top/anime?filter=${filter}&limit=20`));
  }

  // Conexão com a IA Gemini
  async askGemini(prompt: string) {
    if (!this.API_KEY_GEMINI) {
      console.warn("API Key do Gemini não configurada");
      return null;
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${this.API_KEY_GEMINI}`;
    
    try {
      const response: any = await firstValueFrom(this.http.post(url, { contents: [{ parts: [{ text: prompt }] }] }));
      return response.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (e) {
      console.error("Erro na IA:", e);
      return null;
    }
  }
}