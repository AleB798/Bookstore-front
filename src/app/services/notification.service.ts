import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  //pour faire une petite pop-up
  notification = inject(MatSnackBar);

  show(message: string, type: "info" | "valid" | "error" | "warning") {
    this.notification.open(message, "", {verticalPosition: 'top', duration: 5000, panelClass: type,});
  }
}
