import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @ViewChild('publicInfoAudio') publicInfoAudio?: ElementRef<HTMLAudioElement>;
  @Output() eventsRequested = new EventEmitter<void>();

  readonly audioClips = [
    {
      title: 'Información al Público',
      description: 'Escucha el mensaje informativo en Emisoras Radiales.',
      src: 'audios/informacion-publica-03-agosto-2026.mp3',
    },
    {
      title: 'Cuña Antioquia',
      description: 'Escucha nuestra cuña informativa de Narcóticos Anónimos Antioquia.',
      src: 'audios/CUÑA-ANTIOQUIA.mp3',
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

  isPublicInfoOpen = false;
  isInstitutionsOpen = false;
  isEventsOpen = false;
  isAudioPlaying = false;
  currentAudioIndex = 0;
  currentEventIndex = 0;

  get currentAudio() {
    return this.audioClips[this.currentAudioIndex];
  }

  get currentEvent() {
    return this.eventImages[this.currentEventIndex];
  }

  openPublicInfo(event: Event) {
    event.preventDefault();
    this.isPublicInfoOpen = true;
  }

  closePublicInfo() {
    this.publicInfoAudio?.nativeElement.pause();
    this.isPublicInfoOpen = false;
  }

  openInstitutions(event: Event) {
    event.preventDefault();
    this.isInstitutionsOpen = true;
  }

  closeInstitutions() {
    this.isInstitutionsOpen = false;
  }

  openEvents(event: Event) {
    event.preventDefault();
    this.eventsRequested.emit();
  }

  closeEvents() {
    this.isEventsOpen = false;
  }

  previousEvent(event: Event) {
    event.stopPropagation();
    this.currentEventIndex = (this.currentEventIndex - 1 + this.eventImages.length) % this.eventImages.length;
  }

  nextEvent(event: Event) {
    event.stopPropagation();
    this.currentEventIndex = (this.currentEventIndex + 1) % this.eventImages.length;
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
    this.currentAudioIndex = (this.currentAudioIndex + 1) % this.audioClips.length;
    const audio = this.publicInfoAudio?.nativeElement;
    if (!audio) {
      return;
    }

    audio.src = this.currentAudio.src;
    audio.load();
    this.playAudio();
  }

  setAudioPlaying(isPlaying: boolean) {
    this.isAudioPlaying = isPlaying;
  }

  private playAudio() {
    void this.publicInfoAudio?.nativeElement.play().catch(() => {
      this.isAudioPlaying = false;
    });
  }
}
