import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { PdfPreview } from '../pdf-preview/pdf-preview';

interface CarouselImage {
  src: string;
  startDate?: string;
  endDate?: string;
  link?: string;
  title?: string;
  mediaType?: 'image' | 'video' | 'pdf';
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [PdfPreview],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css']
})
export class Carousel implements OnInit, OnDestroy {
  readonly language = inject(LanguageService);

  constructor(private cdr: ChangeDetectorRef) {}

  images: CarouselImage[] = [
    { src: 'Eventos/TallerDePasosElCamino.jpeg', startDate: '2026-11-23', endDate: '2026-11-24', link: 'https://meet.google.com/bzt-jmky-udh' },
    { src: 'Eventos/FestivaldePasos.jpeg', startDate: '2026-11-20', endDate: '2026-11-21' },
    { src: 'Eventos/MaratonicaOlas.jpeg', startDate: '2026-11-06', endDate: '2026-11-14' },
    { src: 'Eventos/AniversarioGrupoLaFortaleza.jpeg', startDate: '2026-11-20', endDate: '2026-11-28' },
    { src: 'Eventos/VideoPadrinazgo.mp4', startDate: '2026-11-20', endDate: '2026-12-05', title: 'Video de padrinazgo', mediaType: 'video' },
    { src: 'Eventos/Padrinazgo.jpeg', startDate: '2026-11-06', endDate: '2026-12-05' },
    { src: 'Eventos/SeptimaEdicion.jpeg', startDate: '2026-11-12', endDate: '2026-12-08' },
    { src: 'Eventos/Clana2027.jpeg', startDate: '2026-07-17', endDate: '2026-12-31' },
    { src: 'Eventos/QRUltimaEdicion.jpeg', startDate: '2026-07-26', endDate: '2027-07-31' },
    { src: 'Eventos/MaratonicaLosLazos.jpeg', startDate: '2026-07-07', endDate: '2026-12-31' },
    { src: 'Eventos/MaratonicaGrupoVida.jpeg', startDate: '2026-07-08', endDate: '2026-12-31' },
  ];

  activeImages: CarouselImage[] = [];
  currentImageIndex = 0;
  carouselInterval: any;
  private initialCarouselTimeout?: ReturnType<typeof setTimeout>;
  isPaused = false;
  isVisible = false;

  get currentImage() { return this.activeImages[this.currentImageIndex]; }
  get currentMediaIsVideo() { return this.currentImage?.mediaType === 'video'; }
  get currentMediaIsPdf() { return this.currentImage?.mediaType === 'pdf'; }
  get currentCursor() { return this.isPaused ? 'grab' : (this.currentImage?.link ? 'pointer' : 'default'); }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    console.error('❌ Error:', img.src);
  }

  onVideoPlay(event: Event) {
    this.prepareVideoAudio(event);
    this.pauseCarousel();
  }

  onVideoEnded() {
    this.isPaused = false;
    this.showNextImage();
  }

  prepareVideoAudio(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.muted = false;
    video.defaultMuted = false;
    video.removeAttribute('muted');
    video.volume = 1;
  }

  ngOnInit() {
    this.initialCarouselTimeout = setTimeout(() => {
      this.initialCarouselTimeout = undefined;
      this.startCarousel();
    }, 15000);
  }

  ngOnDestroy() {
    this.clearTimer();
    if (this.initialCarouselTimeout) clearTimeout(this.initialCarouselTimeout);
  }

  @HostListener('document:keydown.escape')
  onKeydownHandler() { this.stopCarousel(); }

  startCarousel() {
    if (this.initialCarouselTimeout) {
      clearTimeout(this.initialCarouselTimeout);
      this.initialCarouselTimeout = undefined;
    }

    this.activeImages = this.images.filter(image => this.isScheduledForToday(image));

    if (this.activeImages.length > 0) {
      this.currentImageIndex = 0;
      this.isPaused = false;

      setTimeout(() => {
        this.isVisible = true;
        this.cdr.detectChanges(); 
      }, 0);

      this.resetCarouselInterval();
    }
  }

  private isScheduledForToday(image: CarouselImage): boolean {
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return (!image.startDate || image.startDate <= todayKey) && (!image.endDate || image.endDate >= todayKey);
  }

  stopCarousel() {
    if (this.initialCarouselTimeout) {
      clearTimeout(this.initialCarouselTimeout);
      this.initialCarouselTimeout = undefined;
    }
    this.clearTimer();
    this.isVisible = false;
  }

  clearTimer() { if (this.carouselInterval) clearInterval(this.carouselInterval); }

  resetCarouselInterval() {
    this.clearTimer();
    if (this.activeImages.length > 1 && !this.isPaused && !this.currentMediaIsPdf && !this.currentMediaIsVideo) {
      this.carouselInterval = setInterval(() => this.showNextImage(), 6000);
    }
  }

  pauseCarousel(event?: MouseEvent) {
    if (event && event.button !== 0) return; 
    this.isPaused = true;
    this.clearTimer();
  }

  resumeCarousel() {
    if (this.isPaused) {
      this.isPaused = false;
      this.resetCarouselInterval();
    }
  }

  showNextImage() {
    if (this.currentImageIndex >= this.activeImages.length - 1) {
      this.currentImageIndex = 0; 
    } else {
      this.currentImageIndex++;
    }
    this.resetCarouselInterval();
    // Update the view after the timer changes the active image.
    this.cdr.detectChanges(); 
  }

  onNextClick() {
    this.showNextImage();
  }

  onPrevClick() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.activeImages.length) % this.activeImages.length;
    this.cdr.detectChanges(); 
    this.resetCarouselInterval();
  }

  onImageClick(event: Event) {
    event.stopPropagation();
    if (this.currentImage?.link) { window.open(this.currentImage.link, '_blank'); }
  }

  onOverlayClick(event: Event) {
    if ((event.target as HTMLElement).className.includes('modal')) {
      this.stopCarousel();
    }
  }
}
