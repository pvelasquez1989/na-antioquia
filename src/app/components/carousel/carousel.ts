import { Component, OnDestroy, HostListener, ChangeDetectorRef, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

interface CarouselImage {
  src: string;
  startDate?: string;
  endDate?: string;
  link?: string;
  title?: string;
  mediaType?: 'image' | 'video';
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [], 
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css']
})
export class Carousel implements OnDestroy {
  readonly language = inject(LanguageService);
  
  constructor(private cdr: ChangeDetectorRef) {}

  images: CarouselImage[] = [
    { src: 'Eventos/EncuentroServidores.jpeg', startDate: '2026-08-09', endDate: '2026-09-13' },
    { src: 'Eventos/VideoEncuentroServidores.mp4', mediaType: 'video', startDate: '2026-08-09', endDate: '2026-09-13' },
    { src: 'Eventos/InscripcionConvencion.jpeg', startDate: '2026-06-23', endDate: '2026-11-16' },
    { src: 'Eventos/Clana2027.jpeg', startDate: '2026-07-17', endDate: '2026-12-31' },
    { src: 'Eventos/OtraOportunidad.jpeg', startDate: '2026-08-04', endDate: '2026-08-09' },
    { src: 'Eventos/Comuna13.jpeg', startDate: '2026-07-26', endDate: '2026-08-15' },
    { src: 'Eventos/VisionDeEsperanzaConvocatoria.jpeg', startDate: '2026-07-26', endDate: '2026-07-31' },
    { src: 'Eventos/QRUltimaEdicion.jpeg', startDate: '2026-07-26', endDate: '2027-07-31' },
    { src: 'Eventos/AniversariogrupoElCamino.jpeg', startDate: '2026-07-07', endDate: '2026-09-05' },
    { src: 'Eventos/MaratonicaLosLazos.jpeg', startDate: '2026-07-07', endDate: '2026-12-31' },
    { src: 'Eventos/MaratonicaGrupoVida.jpeg', startDate: '2026-07-08', endDate: '2026-12-31' },
    { src: 'Eventos/LaUnidadExperimental.jpeg', startDate: '2026-06-17', endDate: '2026-08-28' }
  ];

  activeImages: CarouselImage[] = [];
  currentImageIndex = 0;
  carouselInterval: any;
  isPaused = false;
  isVisible = false; 

  get currentImage() { return this.activeImages[this.currentImageIndex]; }
  get currentMediaIsVideo() { return this.currentImage?.mediaType === 'video'; }
  get currentCursor() { return this.isPaused ? 'grab' : (this.currentImage?.link ? 'pointer' : 'default'); }

  onImageLoad() {
    console.log('✅ Imagen cargada');
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    console.error('❌ Error:', img.src);
  }

  onVideoPlay(event: Event) {
    const video = event.target as HTMLVideoElement;
    this.prepareVideoAudio(event);
    this.pauseCarousel();
  }

  prepareVideoAudio(event: Event) {
    const video = event.target as HTMLVideoElement;
    video.muted = false;
    video.defaultMuted = false;
    video.removeAttribute('muted');
    video.volume = 1;
  }

  ngOnDestroy() { this.clearTimer(); }

  @HostListener('document:keydown.escape')
  onKeydownHandler() { this.stopCarousel(); }

  startCarousel() {
    console.log(new Date().toString());
    this.activeImages = this.images.filter(image => this.isScheduledForToday(image));

    if (this.activeImages.length > 0) {
      this.currentImageIndex = 0;

      setTimeout(() => {
        this.isVisible = true;
        this.cdr.detectChanges(); 
        console.log('isVisible después:', this.isVisible);
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
    this.clearTimer();
    this.isVisible = false; 
  }

  clearTimer() { if (this.carouselInterval) clearInterval(this.carouselInterval); }

  resetCarouselInterval() {
    this.clearTimer();
    if (this.activeImages.length > 1 && !this.isPaused) {
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
    // 2. AÑADIDO: Forzamos a Angular a refrescar la vista cuando el temporizador cambia de imagen automáticamente
    this.cdr.detectChanges(); 
  }

  onNextClick() {
    this.showNextImage();
    this.resetCarouselInterval();
  }

  onPrevClick() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.activeImages.length) % this.activeImages.length;
    // 3. AÑADIDO: Forzamos el refresco también al usar la flecha de atrás manualmente
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
