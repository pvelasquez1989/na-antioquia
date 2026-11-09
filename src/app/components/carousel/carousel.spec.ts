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

  it('keeps convention content separate from general events', () => {
    const eventSources = component.images.map(({ src }) => src);
    const conventionSources = component.conventionImages.map(({ src }) => src);

    expect(conventionSources).toContain('Eventos/InscripcionConvencion.jpeg');
    expect(conventionSources).toContain('Eventos/Flayer mercaderia.jpeg');
    expect(conventionSources).toContain('Eventos/Flayer precio y tallas.jpeg');
    expect(conventionSources).toContain('Eventos/CaminataEcologicaFlyer.jpeg');
    expect(conventionSources).toContain('Eventos/CaminataEcologicaVideo.mp4');
    expect(conventionSources.indexOf('Mercaderia/Guia_hoteles_Envigado_Narcoticos_Anonimos (1).pdf')).toBeLessThan(conventionSources.indexOf('Mercaderia/Guia_restaurantes_Envigado_fondo_azul.pdf'));
    expect(conventionSources.indexOf('Mercaderia/Guia_restaurantes_Envigado_fondo_azul.pdf')).toBeLessThan(conventionSources.indexOf('Mercaderia/VideoInvitacionConvencion.mp4'));
    expect(eventSources).not.toContain('Eventos/InscripcionConvencion.jpeg');
    expect(eventSources).not.toContain('Eventos/Flayer mercaderia.jpeg');
    expect(eventSources).not.toContain('Eventos/Flayer precio y tallas.jpeg');
    expect(eventSources).not.toContain('Eventos/CaminataEcologicaFlyer.jpeg');
    expect(eventSources).not.toContain('Eventos/CaminataEcologicaVideo.mp4');
  });

  it('schedules the ecological walk flyer and video from November 1 through November 12', () => {
    expect(component.conventionImages.find(({ src }) => src === 'Eventos/CaminataEcologicaFlyer.jpeg')).toMatchObject({
      startDate: '2026-11-01',
      endDate: '2026-11-12',
    });
    expect(component.conventionImages.find(({ src }) => src === 'Eventos/CaminataEcologicaVideo.mp4')).toMatchObject({
      startDate: '2026-11-01',
      endDate: '2026-11-12',
      mediaType: 'video',
    });
  });

  it('opens the dedicated convention gallery with its logo context', () => {
    component.startCarousel('convention');

    expect(component.isConventionView).toBe(true);
    expect(component.activeImages).toEqual(component.conventionImages);
    component.clearTimer();
  });

  it('keeps PDF previews visible until the user advances the carousel', () => {
    component.activeImages = component.conventionImages.filter(({ mediaType }) => mediaType === 'pdf').slice(0, 1);

    component.resetCarouselInterval();

    expect(component.currentMediaIsPdf).toBe(true);
    expect(component.carouselInterval).toBeUndefined();
  });

  it('keeps the video visible until playback ends', () => {
    component.activeImages = [
      ...component.conventionImages.filter(({ mediaType }) => mediaType === 'video'),
      ...component.conventionImages.filter(({ mediaType }) => mediaType !== 'video').slice(0, 1),
    ];

    component.resetCarouselInterval();

    expect(component.currentMediaIsVideo).toBe(true);
    expect(component.carouselInterval).toBeUndefined();

    component.onVideoEnded();

    expect(component.currentImage).toBe(component.activeImages[1]);
    component.clearTimer();
  });
});
