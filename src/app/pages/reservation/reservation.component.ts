import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

//angular material
// Importe les modules Angular Material nécessaires aux composants <mat-card> et <button mat-button>.
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-reservation',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {

  http = inject(HttpClient);

  //On crée une variable qui contiendra la liste des livres réservés.
  reservedBooks: any = [];

  notification = inject(NotificationService)
  authService = inject(AuthService)
  activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
  const token = localStorage.getItem('token');

  this.http.get('http://localhost:5000/mes-reservations', {
    headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
  })
    .subscribe({
      next: (books) => {
        this.reservedBooks = books;
        console.log(this.reservedBooks);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réservations', err);
      }
    });
  }
}
