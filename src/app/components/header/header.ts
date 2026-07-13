import { Component } from '@angular/core';
import { Search } from "../search/search";
import { ZoneList } from "../zone-list/zone-list";
import { WhatsappFab } from "../whatsapp-fab/whatsapp-fab";
import { Carousel } from "../carousel/carousel";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-header',
  imports: [Search, ZoneList, WhatsappFab, Carousel, Footer],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
