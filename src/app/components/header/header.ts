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
      titleKey: 'publicInfoTitle' as const,
      descriptionKey: 'publicInfoDescription' as const,
      src: 'IP/NARCOTICOS 19 DE OCTUBRE DE 2026.mp3',
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
    { title: 'Otra Oportunidad', src: 'Eventos/OtraOportunidad.jpeg' },
    { title: 'Maratónica Los Lazos', src: 'Eventos/MaratonicaLosLazos.jpeg' },
    { title: 'Maratónica Grupo Vida', src: 'Eventos/MaratonicaGrupoVida.jpeg' },
    { title: 'La Unidad Experimental', src: 'Eventos/LaUnidadExperimental.jpeg' },
    { title: 'Comuna 13', src: 'Eventos/Comuna13.jpeg' },
    { title: 'CLANA 2027', src: 'Eventos/Clana2027.jpeg' },
    { title: 'Aniversario Grupo El Camino', src: 'Eventos/AniversariogrupoElCamino.jpeg' },
  ];

  isPublicInfoOpen = false;
  isInstitutionsOpen = false;
  isEventsOpen = false;
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

  closeEvents() {
    this.isEventsOpen = false;
    void this.router.navigateByUrl('/');
  }

  private syncWithRoute(url: string, notifyEvents: boolean) {
    const path = url.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
    const wasPublicInfoOpen = this.isPublicInfoOpen;

    this.isPublicInfoOpen = path === '/informacion-publica';
    this.isInstitutionsOpen = path === '/instituciones';
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
