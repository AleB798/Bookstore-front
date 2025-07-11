import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

//angular material
// Importe les modules Angular Material nécessaires aux composants <mat-card> et <button mat-button>.
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-accueil',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {

  http = inject(HttpClient);
  router = inject(Router);

  //On crée une variable books qui contiendra la liste des livres.
  books: any = [];

  notification = inject(NotificationService)
  authService = inject(AuthService)
  // router: any;

  ngOnInit() {
    this.refreshBook()
  }
  // ngOnInit() est une méthode Angular appelée automatiquement après la création du composant.
  
  // On fait un GET vers l’API Express pour récupérer la liste des livres.
  refreshBook() {
    this.http.get("http://localhost:5000/book/liste") 
    .subscribe(books=>(this.books = books));
    // On fait une requête HTTP au backend.
    // Quand la réponse arrive, on la stocke dans this.produits, ce qui permet de l’utiliser dans le HTML
  }

  onClickSuppressionLivre(item : any) {
    if(confirm('Voulez-vous vraiment supprimer ce livre ?')) {
      this.http
        .delete('http://localhost:5000/book/' + item.id)
        .subscribe(reponse =>  {
          //refresh la page en appelant la fonction
          this.refreshBook() 
          //notifie la suppression
          this.notification.show('Le livre a bien été supprimé', 'valid')
        });
    }
  }

  // ==============> PARTIE RESERVATION DE LIVRE <============== //

  reserveBook(item: any) {
  //on récupère l'id de l'user que l'on stocke dans une variable userId
  const userId = this.authService.user?.id;

  if (!userId) {
    this.notification.show('Utilisateur non connecté', 'error');
    return;
  }

  if (confirm('Voulez-vous vraiment réserver ce livre ?')) {
    this.http.post('http://localhost:5000/reservation/', {bookId: item.id, userId: userId })
      .subscribe({
        next: () => {
          this.notification.show('Le livre a bien été réservé', 'valid');
          this.router.navigateByUrl('/mes-reservations');        
        },
        error: (error) => {
          console.error('Erreur réservation', error);
          this.notification.show('Une erreur est survenue', 'error');
        }
      });
    }
  }
}


