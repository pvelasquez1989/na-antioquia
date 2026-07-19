import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {

  probarAlert() {
    alert('El toque llegó al footer');
  }

  probarNavegacion() {
    window.open('https://www.nacolombia.org', '_blank');
  }
}