import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-whatsapp-fab',
  imports: [],
  templateUrl: './whatsapp-fab.html',
  styleUrl: './whatsapp-fab.css'
})
export class WhatsappFab {
  readonly language = inject(LanguageService);
  // Esta variable controla si las opciones están visibles
  isActive: boolean = false;

  // Esta función cambia el estado de falso a verdadero y viceversa
  toggleWhatsApp() {
    this.isActive = !this.isActive;
  }
}
