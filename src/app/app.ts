import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Search } from './components/search/search';
import { ZoneList } from './components/zone-list/zone-list';
import { WhatsappFab } from './components/whatsapp-fab/whatsapp-fab';
import { Carousel } from './components/carousel/carousel';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Search,
    ZoneList,
    WhatsappFab,
    Carousel,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Aquí guardamos lo que el usuario escriba
  currentSearchTerm: string = '';

  // Esta función actualizará la variable
  updateSearch(term: string) {
    this.currentSearchTerm = term;
  }
}
