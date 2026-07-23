import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';

interface CarouselImage {
  src: string;
  startDate?: string;
  endDate?: string;
  link?: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [], 
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css']
})
export class Carousel implements OnInit, OnDestroy {
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // 1. CAMBIADO: De 1000ms (1 segundo) a 15000ms (15 segundos) para la apertura del modal
    setTimeout(() => {
      this.startCarousel();
    }, 15000); 
  }
  
  images: CarouselImage[] = [
    { src: 'Eventos/InscripcionConvencion.jpeg', startDate: '2026-06-23', endDate: '2026-11-16' }, 
    { src: 'Eventos/PostulacionOradoresConvencion.jpeg', startDate: '2026-06-23', endDate: '2026-11-16', link: 'https://forms.gle/z9padbCjDxyEWMrC8' },
    { src: 'Eventos/Clana2027.jpeg', startDate: '2026-07-17', endDate: '2026-12-31' },
    { src: 'Eventos/AniversarioCopacabana.jpeg', startDate: '2026-07-23', endDate: '2026-08-02' },
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
  get currentCursor() { return this.isPaused ? 'grab' : (this.currentImage?.link ? 'pointer' : 'default'); }

  onImageLoad() {
    console.log('✅ Imagen cargada');
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    console.error('❌ Error:', img.src);
  }

  ngOnDestroy() { this.clearTimer(); }

  @HostListener('document:keydown.escape')
  onKeydownHandler() { this.stopCarousel(); }

  startCarousel() {
    console.log(new Date().toString());
    const today = new Date().toISOString().slice(0,10);

    this.activeImages = this.images.filter(img => {
      if (img.startDate && today < img.startDate) return false;
      if (img.endDate && today > img.endDate) return false;
      return true;
    });

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