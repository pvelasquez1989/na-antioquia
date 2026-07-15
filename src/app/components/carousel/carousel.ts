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
  imports: [], // Corregido: un componente standalone no debe importarse a sí mismo
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css']
})
export class Carousel implements OnInit, OnDestroy {
  
  // Inyectamos el detector de cambios en el constructor
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.startCarousel();
    }, 1000);
  }
  
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

    console.log(this.activeImages);
    console.log('activeImages:', this.activeImages.length);
    console.log('currentImage:', this.currentImage);
    console.log('isVisible antes:', this.isVisible);

    if (this.activeImages.length > 0) {
      this.currentImageIndex = 0;

      // Usamos setTimeout para desfasar la ejecución y forzamos el ciclo de renderizado
      setTimeout(() => {
        this.isVisible = true;
        this.cdr.detectChanges(); // OBLIGA a Angular a pintar el modal durante el refresh
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
    if (this.currentImage?.link) { window.open(this.currentImage.link, '_blank'); }
  }

  onOverlayClick(event: Event) {
    if ((event.target as HTMLElement).className.includes('modal')) {
      this.stopCarousel();
    }
  }
}