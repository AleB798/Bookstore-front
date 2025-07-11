import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-signin',
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})

export class SigninComponent {

  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  notification = inject(NotificationService);
  router = inject(Router);

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['',  [Validators.required]],
  });

  onInscription() {
    if(this.formulaire.valid) {
      this.http.post("http://localhost:5000/signin", this.formulaire.value)
      .subscribe({
        //se déclenche quand le code < 300
        next : res => {
          this.notification.show('Vous vous êtes bien inscrit', 'valid');
          this.router.navigateByUrl("/login");
        }, 
        //se déclenche quand le code > 300
        error : err => {
          if(err.status === 409) {
            this.notification.show('Cet email est déjà utilisé', 'error')
          }
        }, 
      });
    }
  };
}
