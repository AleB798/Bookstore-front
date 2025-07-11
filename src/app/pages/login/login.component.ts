import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-connection',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  notification = inject(NotificationService);
  router = inject(Router);
  http = inject(HttpClient);
  authService = inject(AuthService)

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
  });

  onConnection() {
    this.http
    .post('http://localhost:5000/login', this.formulaire.value, {
      responseType: 'text', //on type pour qu'il prenne en compte du texte et non comme par défaut du JSON, sinon il y aura une erreur
    })
    .subscribe((jwt) => {
      this.authService.decodeJwt(jwt)
      this.notification.show('Vous êtes bien connecté !', 'valid')
      this.router.navigateByUrl('/accueil'); 
    });
  }
}
