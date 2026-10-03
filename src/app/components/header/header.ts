import { Component, DestroyRef, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { LanguageService } from '../../services/language.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly language = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  @ViewChild('publicInfoAudio') publicInfoAudio?: ElementRef<HTMLAudioElement>;
  @Output() eventsRequested = new EventEmitter<void>();

  readonly publicInfoItems = [
    {
      type: 'image' as const,
      titleKey: 'serveInIpTitle' as const,
      descriptionKey: 'serveInIpDescription' as const,
      src: 'IP/InvitacionServirenIP.jpeg',
    },
    {
      type: 'image' as const,
      titleKey: 'publicInfoFlyerOne' as const,
      descriptionKey: 'publicInfoDescription' as const,
      src: 'IP/InfoIP1.jpeg',
    },
    {
      type: 'image' as const,
      titleKey: 'publicInfoFlyerTwo' as const,
      descriptionKey: 'publicInfoDescription' as const,
      src: 'IP/InfoIP2.jpeg',
    },
    {
      type: 'audio' as const,
      displayTitleKey: 'radioProgramTitle' as const,
      titleKey: 'publicInfoTitle' as const,
      descriptionKey: 'publicInfoDescription' as const,
      src: 'IP/Programa de Radio 7 de Septiembre.mp3',
    },
    {
      type: 'audio' as const,
      titleKey: 'naSpotTitle' as const,
      descriptionKey: 'naSpotDescription' as const,
      src: 'IP/CUÑA-ANTIOQUIA.mp3',
    },
  ];

  readonly eventImages = [
    { title: 'Visión de Esperanza - Convocatoria', src: 'Eventos/VisionDeEsperanzaConvocatoria.jpeg' },
    { title: 'Última Edición', src: 'Eventos/QRUltimaEdicion.jpeg' },
    { title: 'Postulación de Oradores - Convención', src: 'Eventos/PostulacionOradoresConvencion.jpeg' },
    { title: 'Otra Oportunidad', src: 'Eventos/OtraOportunidad.jpeg' },
    { title: 'Maratónica Los Lazos', src: 'Eventos/MaratonicaLosLazos.jpeg' },
    { title: 'Maratónica Grupo Vida', src: 'Eventos/MaratonicaGrupoVida.jpeg' },
    { title: 'La Unidad Experimental', src: 'Eventos/LaUnidadExperimental.jpeg' },
    { title: 'Inscripción Convención', src: 'Eventos/InscripcionConvencion.jpeg' },
    { title: 'Comuna 13', src: 'Eventos/Comuna13.jpeg' },
    { title: 'CLANA 2027', src: 'Eventos/Clana2027.jpeg' },
    { title: 'Aniversario Grupo El Camino', src: 'Eventos/AniversariogrupoElCamino.jpeg' },
  ];

  readonly merchandiseItems = [
    {
      titleKey: 'personalizedTitle' as const,
      src: 'Mercaderia/Personalizada.jpeg',
      price: '$53.000 COP',
    },
    {
      titleKey: 'otherColorsTitle' as const,
      src: 'Mercaderia/Otros colores.jpeg',
      price: '$48.000 COP',
    },
    {
      titleKey: 'hoodieTitle' as const,
      src: 'Mercaderia/Green Hoodie Product Showcase.png',
      price: '$70.000 COP',
    },
    {
      titleKey: 'whiteTshirtTitle' as const,
      src: 'Mercaderia/White T-Shirt Convention Product Mockup.png',
      price: '$48.000 COP',
    },
    {
      titleKey: 'lilacTshirtTitle' as const,
      src: 'Mercaderia/Lilac T-Shirt Convention Showcase.png',
      price: '$48.000 COP',
    },
    {
      titleKey: 'blueTshirtTitle' as const,
      src: 'Mercaderia/Camiseta azul de convención Antioquia.png',
      price: '$48.000 COP',
    },
    {
      titleKey: 'capTitle' as const,
      src: 'Mercaderia/Gorra azul con emblema de Antioquia.png',
      price: '$25.000 COP',
    },
    {
      titleKey: 'redTshirtAndCapTitle' as const,
      src: 'Mercaderia/Camiseta Roja y gorra.jpeg',
      price: 'Camiseta: $48.000 COP · Gorra: $25.000 COP',
    },
    {
      titleKey: 'mugTitle' as const,
      src: 'Mercaderia/Mug Convención de Antioquia.png',
      price: '$25.000 COP',
    },
  ];
  selectedMerchandiseItem?: (typeof this.merchandiseItems)[number];

  isPublicInfoOpen = false;
  isInstitutionsOpen = false;
  isEventsOpen = false;
  isMerchandiseOpen = false;
  isAudioPlaying = false;
  currentAudioIndex = 0;
  currentEventIndex = 0;
  private audioTimeoutId: any;

  constructor() {
    this.syncWithRoute(this.router.url, false);
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => this.syncWithRoute(event.urlAfterRedirects, true));
  }

  get currentPublicInfoItem() {
    return this.publicInfoItems[this.currentAudioIndex];
  }

  get currentPublicInfoTitle() {
    const item = this.currentPublicInfoItem;

    if (item.type !== 'audio') {
      return this.language.t(item.titleKey);
    }

    if ('displayTitleKey' in item && item.displayTitleKey) {
      return this.language.t(item.displayTitleKey);
    }

    return item.src.split('/').pop()?.replace(/\.[^/.]+$/, '') ?? '';
  }

  get currentEvent() {
    return this.eventImages[this.currentEventIndex];
  }

  openPublicInfo() {
    if (this.isPublicInfoOpen) {
      this.currentAudioIndex = 0;
    }
  }

  openEvents() {
    const path = this.router.url.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
    if (path === '/eventos') {
      this.eventsRequested.emit();
    }
  }

  closePublicInfo() {
    if (this.audioTimeoutId) {
      clearTimeout(this.audioTimeoutId);
    }
    this.publicInfoAudio?.nativeElement.pause();
    void this.router.navigateByUrl('/');
  }

  closeInstitutions() {
    void this.router.navigateByUrl('/');
  }

  closeMerchandise() {
    void this.router.navigateByUrl('/');
    this.selectedMerchandiseItem = undefined;
  }

  openProduct(item: (typeof this.merchandiseItems)[number]) {
    this.selectedMerchandiseItem = item;
  }

  closeProduct() {
    this.selectedMerchandiseItem = undefined;
  }

  onMerchandiseImageError(event: Event) {
    const image = event.target as HTMLImageElement;
    image.hidden = true;
    image.nextElementSibling?.removeAttribute('hidden');
  }

  closeEvents() {
    this.isEventsOpen = false;
    void this.router.navigateByUrl('/');
  }

  private syncWithRoute(url: string, notifyEvents: boolean) {
    const path = url.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
    const wasPublicInfoOpen = this.isPublicInfoOpen;

    this.isPublicInfoOpen = path === '/informacion-publica';
    this.isInstitutionsOpen = path === '/instituciones';
    this.isMerchandiseOpen = path === '/mercaderia';
    this.isEventsOpen = false;

    if (this.isPublicInfoOpen && !wasPublicInfoOpen) {
      this.currentAudioIndex = 0;
    } else if (wasPublicInfoOpen && !this.isPublicInfoOpen) {
      if (this.audioTimeoutId) {
        clearTimeout(this.audioTimeoutId);
      }
      this.publicInfoAudio?.nativeElement.pause();
    }

    if (notifyEvents && path === '/eventos') {
      this.eventsRequested.emit();
    }
  }

  previousEvent(event: Event) {
    event.stopPropagation();
    this.currentEventIndex = (this.currentEventIndex - 1 + this.eventImages.length) % this.eventImages.length;
  }

  nextEvent(event: Event) {
    event.stopPropagation();
    this.currentEventIndex = (this.currentEventIndex + 1) % this.eventImages.length;
  }

  handlePublicInfoClick(event: Event) {
    event.stopPropagation();
    this.nextAudio();
  }

  toggleAudio() {
    if (this.publicInfoAudio?.nativeElement.paused) {
      this.playAudio();
      return;
    }
    this.publicInfoAudio?.nativeElement.pause();
  }

  seekAudio(seconds: number) {
    const audio = this.publicInfoAudio?.nativeElement;
    if (!audio) {
      return;
    }

    const duration = Number.isFinite(audio.duration) ? audio.duration : Number.MAX_VALUE;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  }

  nextAudio(event?: Event) {
    event?.stopPropagation();
    this.changePublicInfoItem(1);
  }

  previousAudio(event?: Event) {
    event?.stopPropagation();
    this.changePublicInfoItem(-1);
  }

  private changePublicInfoItem(direction: number) {
    if (this.audioTimeoutId) {
      clearTimeout(this.audioTimeoutId);
    }
    this.publicInfoAudio?.nativeElement.pause();
    this.currentAudioIndex = (this.currentAudioIndex + direction + this.publicInfoItems.length) % this.publicInfoItems.length;

    if (this.currentPublicInfoItem.type !== 'audio') {
      return;
    }

    // Aplazar para permitir que la vista se actualice y el elemento <audio> esté disponible.
    this.audioTimeoutId = setTimeout(() => {
      const audio = this.publicInfoAudio?.nativeElement;
      if (audio) {
        audio.src = this.currentPublicInfoItem.src;
        audio.load();
        this.playAudio();
      }
    });
  }

  setAudioPlaying(isPlaying: boolean) {
    this.isAudioPlaying = isPlaying;
  }

  private playAudio() {
    const audio = this.publicInfoAudio?.nativeElement;
    if (!audio) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Error al reproducir el audio:', { error, src: audio.currentSrc });
        this.isAudioPlaying = false;
      });
    }
  }
}
