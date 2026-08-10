import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  readonly language = inject(LanguageService);

  probarAlert() {
    alert('El toque llegó al footer');
  }

  probarNavegacion() {
    window.open('https://www.nacolombia.org', '_blank');
  }
}
