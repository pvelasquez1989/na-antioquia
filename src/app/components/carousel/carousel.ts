import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

interface CarouselImage {
  src: string;
  startDate?: string;
  endDate?: string;
  link?: string;
}

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css'
})
export class Carousel implements OnInit, OnDestroy {
  images: CarouselImage[] = [
    { src: 'Eventos/InscripcionConvencion.jpeg', startDate: '2026-06-23', endDate: '2026-11-16' }, 
    { src: 'Eventos/PostulacionOradoresConvencion.jpeg', startDate: '2026-06-23', endDate: '2026-11-16', link: 'https://forms.gle/z9padbCjDxyEWMrC8' },
    { src: 'Eventos/AniversarioTransformacion.jpeg', startDate: '2026-06-23', endDate: '2026-07-19' },
    { src: 'Eventos/TorneoTransformacionFutbol.jpeg', startDate: '2026-06-23', endDate: '2026-07-19' },
    { src: 'Eventos/GrupoLaunidad.jpeg', startDate: '2026-06-17', endDate: '2026-07-18' },
    { src: 'Eventos/AniversariogrupoElCamino.jpeg', startDate: '2026-07-07', endDate: '2026-09-05' },
    { src: 'Eventos/MaratonicaLosLazos.jpeg', startDate: '2026-07-07', endDate: '2026-12-31' },
    { src: 'Eventos/MaratonicaGrupoVida.jpeg', startDate: '2026-07-08', endDate: '2026-12-31' },
    { src: 'Eventos/LaUnidadExperimental.jpeg', startDate: '2026-06-17', endDate: '2026-08-28' }
  ];

  activeImages: CarouselImage[] = [];
  currentImageIndex = 0;
  display = 'none';
  opacity = 0;
  carouselInterval: any;
  isPaused = false; // NUEVO: Estado de pausa

  get currentImage() {
    return this.activeImages[this.currentImageIndex];
  }

  // NUEVO: Getter dinámico para el cursor
  get currentCursor() {
    if (this.isPaused) return 'grab';
    return this.currentImage?.link ? 'pointer' : 'default';
  }

  ngOnInit() {
    setTimeout(() => { this.startCarousel(); }, 15000);
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    this.stopCarousel();
  }

  startCarousel() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const scheduledImages = this.images.filter(image => {
      const startDate = image.startDate ? new Date(image.startDate + 'T00:00:00') : null;
      const endDate = image.endDate ? new Date(image.endDate + 'T00:00:00') : null;

      if (!startDate && !endDate) return false;
      if (startDate && endDate) return today >= startDate && today <= endDate;
      if (startDate) return today >= startDate;
      if (endDate) return today <= endDate;
      return false;
    });

    this.activeImages = scheduledImages.length > 0 ? scheduledImages : this.images.filter(img => !img.startDate && !img.endDate);

    if (this.activeImages.length > 0) {
      this.display = 'flex';
      setTimeout(() => { this.opacity = 1; }, 10);
      this.resetCarouselInterval();
    }
  }

  stopCarousel() {
    this.clearTimer();
    this.opacity = 0;
    setTimeout(() => { this.display = 'none'; }, 200);
  }

  clearTimer() {
    if (this.carouselInterval) clearInterval(this.carouselInterval);
  }

  resetCarouselInterval() {
    this.clearTimer();
    // MODIFICADO: A 6 segundos y respeta la pausa
    if (this.activeImages.length > 1 && !this.isPaused) {
      this.carouselInterval = setInterval(() => this.showNextImage(), 6000);
    }
  }

  // NUEVO: Funciones para pausar y reanudar
  pauseCarousel(event?: MouseEvent) {
    if (event && event.button !== 0) return; // Solo clic izquierdo
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
    // Si llegamos a la última imagen, regresamos a la primera (índice 0)
    if (this.currentImageIndex >= this.activeImages.length - 1) {
      this.currentImageIndex = 0; 
    } else {
      // Si no, simplemente pasamos a la siguiente
      this.currentImageIndex++;
    }
  }

  onNextClick() {
    this.showNextImage();
    this.resetCarouselInterval();
  }

  onPrevClick() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.activeImages.length) % this.activeImages.length;
    this.resetCarouselInterval();
  }

  onImageClick(event: Event) {
    event.stopPropagation();
    if (this.currentImage?.link) {
      window.open(this.currentImage.link, '_blank');
    }
  }

  onOverlayClick(event: Event) {
    if ((event.target as HTMLElement).className.includes('modal')) {
      this.stopCarousel();
    }
  }
}
