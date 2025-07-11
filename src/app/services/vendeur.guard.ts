import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { NotificationService } from './notification.service';

export const vendeurGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const notification = inject(NotificationService);
  
  if(authService.user?.role == 'admin') {
    return true;
  }
  notification.show('Accès réservé à l\'administrateur', 'error')
  return router.parseUrl('/connexion');
  
};
