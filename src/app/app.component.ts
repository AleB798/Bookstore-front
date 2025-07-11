import { HttpClient } from '@angular/common/http';
//Importe HttpClient, un service Angular qui permet de faire des requêtes HTTP (GET, POST, etc.).
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
// Component sert à déclarer que cette classe est un composant Angular.
// inject() est une nouvelle façon d’injecter des dépendances dans les composants (au lieu du constructor classique).
// RouterLink : permet d’utiliser routerLink dans le HTML.
// RouterLinkActive : applique une classe si le lien est actif.
// RouterOutlet : zone où s’affiche le contenu des routes enfants

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  // liste des modules Angular utilisés dans le template.
  templateUrl: './app.component.html',
  //lien vers le fichier HTML
  styleUrl: './app.component.scss'
  //lien vers le fichier CSS
})
export class AppComponent {

  authService = inject(AuthService)
  notification = inject(NotificationService)

  onClickDeconnexion() {
    this.authService.deconnexion();
    this.notification.show("Vous êtes déconnecté", 'valid');
  }
}

