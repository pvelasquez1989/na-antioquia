import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-fab',
  imports: [],
  templateUrl: './whatsapp-fab.html',
  styleUrl: './whatsapp-fab.css'
})
export class WhatsappFab {
  // Esta variable controla si las opciones están visibles
  isActive: boolean = false;

  // Esta función cambia el estado de falso a verdadero y viceversa
  toggleWhatsApp() {
    this.isActive = !this.isActive;
  }
}
