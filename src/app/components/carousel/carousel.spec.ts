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

  it('schedules the current event images for their configured dates', () => {
    expect(component.images.find(({ src }) => src === 'Eventos/VideoPadrinazgo.mp4')).toMatchObject({
      startDate: '2026-11-20',
      endDate: '2026-12-05',
      mediaType: 'video',
    });
    expect(component.images.find(({ src }) => src === 'Eventos/AniversarioGrupoLaFortaleza.jpeg')).toMatchObject({
      startDate: '2026-11-20',
      endDate: '2026-11-28',
    });
  });

  it('keeps PDF previews visible until the user advances the carousel', () => {
    component.activeImages = [{ src: 'guide.pdf', mediaType: 'pdf' }];

    component.resetCarouselInterval();

    expect(component.currentMediaIsPdf).toBe(true);
    expect(component.carouselInterval).toBeUndefined();
  });

  it('keeps the video visible until playback ends', () => {
    component.activeImages = [
      { src: 'clip.mp4', mediaType: 'video' },
      { src: 'event.jpeg' },
    ];

    component.resetCarouselInterval();

    expect(component.currentMediaIsVideo).toBe(true);
    expect(component.carouselInterval).toBeUndefined();

    component.onVideoEnded();

    expect(component.currentImage).toBe(component.activeImages[1]);
    component.clearTimer();
  });
});
