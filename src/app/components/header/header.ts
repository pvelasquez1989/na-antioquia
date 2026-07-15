import { Component } from '@angular/core';
import { Carousel } from "../carousel/carousel";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Carousel],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  
}
