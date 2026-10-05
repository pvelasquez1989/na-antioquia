import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carousel } from './carousel';

describe('Carousel', () => {
  let component: Carousel;
  let fixture: ComponentFixture<Carousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carousel],
    }).compileComponents();

    fixture = TestBed.createComponent(Carousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the price flyers, PDF previews, and convention video in order', () => {
    expect(component.images.slice(0, 5).map(({ src }) => src)).toEqual([
      'Eventos/Flayer mercaderia.jpeg',
      'Eventos/Flayer precio y tallas.jpeg',
      'Mercaderia/Guia_hoteles_Envigado_Narcoticos_Anonimos (1).pdf',
      'Mercaderia/Guia_restaurantes_Envigado_fondo_azul.pdf',
      'Mercaderia/VideoInvitacionConvencion.mp4',
    ]);
  });

  it('keeps PDF previews visible until the user advances the carousel', () => {
    component.activeImages = [component.images[2]];

    component.resetCarouselInterval();

    expect(component.currentMediaIsPdf).toBe(true);
    expect(component.carouselInterval).toBeUndefined();
  });

  it('keeps the video visible until playback ends', () => {
    component.activeImages = [component.images[4], component.images[5]];

    component.resetCarouselInterval();

    expect(component.currentMediaIsVideo).toBe(true);
    expect(component.carouselInterval).toBeUndefined();

    component.onVideoEnded();

    expect(component.currentImage).toBe(component.images[5]);
    component.clearTimer();
  });
});
