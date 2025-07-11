import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { Page404Component } from './pages/page404/page404.component';
import { EditProduitComponent } from './pages/edit-produit/edit-produit.component';
import { vendeurGuard } from './services/vendeur.guard';
import { ReservationComponent } from './pages/reservation/reservation.component';

export const routes: Routes = [
    
       {path: "accueil", component: AccueilComponent},
       {path: "login", component : LoginComponent},
       {path: "signin", component : SigninComponent},
       {path: "add-book", component : EditProduitComponent, canActivate: [vendeurGuard]},
       {path: "update-book/:id", component : EditProduitComponent, canActivate: [vendeurGuard]},
       {path: "mes-reservations", component : ReservationComponent},
       {path: "", redirectTo: "accueil", pathMatch: 'full'},

       {path: "**", component: Page404Component} //toujours en dernier

];
