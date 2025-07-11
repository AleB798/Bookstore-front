import { Component, Inject, inject } from '@angular/core';
 import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
 import {MatInputModule} from '@angular/material/input';
 import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-produit',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss'
})
export class EditProduitComponent {

  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  notification = inject(NotificationService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  formulaire = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(70)]],
    author: ['', [Validators.required]],
    publisher: ['', [Validators.required]],
    description: ['',  [Validators.required, Validators.maxLength(255)]],
  })

  produitEdite: any;

  ngOnInit() {
    //subscribe sert de fonction callback pour dire comment réagir
    this.activatedRoute.params.subscribe(
      parametres => {
        //est-on sur la page de modification ? vérifie s'il y a un paramètre id dans l'url
        if(parametres['id']) {
          //on récupère le produit via son id
          this.http
          .get('http://localhost:5000/book/' + parametres['id'])
          .subscribe((book) => {
            console.log(book);
            this.formulaire.patchValue(book);
            this.produitEdite = book;
          });
        }
      }
    )
  }

  onAjoutProduit() {
    if(this.formulaire.valid) {
      if(this.produitEdite) {

        //on modifie le produit
         this.http
         .put('http://localhost:5000/book/' + this.produitEdite.id,
          this.formulaire.value )
         .subscribe ({
            next : (reponse) => {
              this.notification.show('Le livre a bien été modifié', "valid")
              this.router.navigateByUrl('/accueil');
            },
            error : (erreur) => {
              if(erreur.status === 409) {
                this.notification.show('Un livre porte déjà ce nom', "error")
              }
            }
        });
      } else {
        //on ajoute le livre
        // if(token) {
        this.http
        .post("http://localhost:5000/book", //1er paramétre l'URL
          this.formulaire.value, //2eme : CORP
          // {headers: {Authorization : token }} //3eme les options de l'en-tête
        )
        .subscribe (
          {
            next : (reponse) => {
              this.notification.show('Le livre a bien été ajouté', "valid")
              //pour retourner sur la page d'accueil après avoir ajouté un produit
              this.router.navigateByUrl('/accueil');
            },
            error : (erreur) => {
              if(erreur.status === 409) {
                this.notification.show('Un livre porte déjà ce nom', "error")
              }
            }
          }
        );
      }
    }
  }
}
