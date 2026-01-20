import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Obrigatório para validação
import { Router } from '@angular/router';
import { LucideAngularModule, User, Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  router = inject(Router);
  icons = { User, Mail, Lock, LogIn, Eye, EyeOff };

  // Estados
  isLoginMode = true;
  showPassword = false;
  authLoading = false;
  
  // Variáveis do Formulário (Onde os dados ficam guardados)
  username = '';
  email = '';
  password = '';

  handleAuth() {
    // 1. Validação: Campos Vazios
    if (!this.email || !this.password) {
      alert("Por favor, preencha o e-mail e a senha.");
      return; // Para a função aqui
    }

    // 2. Validação: Nome de usuário (Só no cadastro)
    if (!this.isLoginMode && !this.username) {
      alert("Por favor, escolha um nome de usuário.");
      return;
    }

    // 3. Validação: Formato de E-mail (Básico)
    if (!this.email.includes('@') || !this.email.includes('.')) {
      alert("Esse e-mail parece inválido.");
      return;
    }

    // 4. Validação: Senha Curta
    if (this.password.length < 6) {
      alert("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    // --- Se chegou aqui, está tudo válido! ---
    this.authLoading = true;
    
    // Simula chamada ao Banco de Dados
    setTimeout(() => {
       this.authLoading = false;
       const msg = this.isLoginMode 
         ? `Bem-vindo de volta!` 
         : `Conta criada com sucesso!`;
       
       alert(msg);
       this.router.navigate(['/home']); // Redireciona para Home
    }, 1500);
  }
}