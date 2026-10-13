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
    const contentSources = component.images.map(({ src }) => src);

    expect(contentSources.indexOf('Eventos/Flayer mercaderia.jpeg')).toBeLessThan(contentSources.indexOf('Eventos/Flayer precio y tallas.jpeg'));
    expect(contentSources.indexOf('Eventos/Flayer precio y tallas.jpeg')).toBeLessThan(contentSources.indexOf('Mercaderia/Guia_hoteles_Envigado_Narcoticos_Anonimos (1).pdf'));
    expect(contentSources.indexOf('Mercaderia/Guia_hoteles_Envigado_Narcoticos_Anonimos (1).pdf')).toBeLessThan(contentSources.indexOf('Mercaderia/Guia_restaurantes_Envigado_fondo_azul.pdf'));
    expect(contentSources.indexOf('Mercaderia/Guia_restaurantes_Envigado_fondo_azul.pdf')).toBeLessThan(contentSources.indexOf('Mercaderia/VideoInvitacionConvencion.mp4'));
  });

  it('schedules the new event flyers from today through their final event dates', () => {
    expect(component.images.find(({ src }) => src === 'Eventos/VivirLimpios.jpeg')).toMatchObject({
      startDate: '2026-10-13',
      endDate: '2026-10-16',
    });
    expect(component.images.find(({ src }) => src === 'Eventos/LaGranOportunidad.jpeg')).toMatchObject({
      startDate: '2026-10-13',
      endDate: '2026-10-14',
    });
  });

  it('schedules the merchandise table flyer from today through November 16', () => {
    expect(component.images.find(({ src }) => src === 'Mercaderia/MesaMercaderia.jpeg')).toMatchObject({
      startDate: '2026-10-13',
      endDate: '2026-11-16',
    });
  });

  it('schedules the recent arrivals flyer from today through November 16', () => {
    expect(component.images.find(({ src }) => src === 'Eventos/RecienLlegados.jpeg')).toMatchObject({
      startDate: '2026-10-13',
      endDate: '2026-11-16',
    });
  });

  it('keeps PDF previews visible until the user advances the carousel', () => {
    component.activeImages = component.images.filter(({ mediaType }) => mediaType === 'pdf').slice(0, 1);

    component.resetCarouselInterval();

    expect(component.currentMediaIsPdf).toBe(true);
    expect(component.carouselInterval).toBeUndefined();
  });

  it('keeps the video visible until playback ends', () => {
    component.activeImages = [
      ...component.images.filter(({ mediaType }) => mediaType === 'video'),
      ...component.images.filter(({ mediaType }) => mediaType !== 'video').slice(0, 1),
    ];

    component.resetCarouselInterval();

    expect(component.currentMediaIsVideo).toBe(true);
    expect(component.carouselInterval).toBeUndefined();

    component.onVideoEnded();

    expect(component.currentImage).toBe(component.activeImages[1]);
    component.clearTimer();
  });
});
