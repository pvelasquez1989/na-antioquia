import { Injectable } from '@angular/core';

type TranslationKey = keyof typeof translations.es;

const translations = {
  es: {
    directoryTitle: 'ÁREA DE MEDELLÍN Y SUR DE ANTIOQUIA - Directorio de Grupos',
    publicInfo: 'Información al Público',
    hospitals: 'Hospitales e Instituciones',
    events: 'Eventos',
    helpNow: '¿Necesitas ayuda ahora?',
    recoveryPossible: '¡La recuperación es posible!',
    findGroup: 'Encuentra tu grupo y da el primer paso.',
    searchPlaceholder: 'Buscar grupo, barrio, dirección...',
    clearSearch: 'Limpiar búsqueda',
    directions: 'Cómo llegar',
    comingSoon: 'Próximamente',
    institutionsNotice: 'Próximamente publicaremos aquí la información sobre los paneles que realizamos en Narcóticos Anónimos.',
    close: 'Cerrar',
    previous: 'Anterior',
    next: 'Siguiente',
    eventOf: 'evento',
    eventsOf: 'eventos',
    audioOf: 'Audio',
    tapCard: 'Toca la tarjeta para cambiar',
    play: 'Reproducir',
    pause: 'Pausar',
    rewind: 'Retroceder 10 segundos',
    forward: 'Adelantar 10 segundos',
    publicInfoTitle: 'Información al Público',
    publicInfoDescription: 'Escucha el mensaje informativo en Emisoras Radiales.',
    naSpotTitle: 'Cuña Antioquia',
    naSpotDescription: 'Escucha nuestra cuña informativa de Narcóticos Anónimos Antioquia.',
    footerArea: 'Narcóticos Anónimos Área Medellín y Sur de Antioquia',
    footerQuote: '“No importa quién eres, ni de dónde vienes… la recuperación es posible.”',
    socialNetworks: 'Redes Sociales NA Antioquia',
    whatsapp: 'Contactar por WhatsApp',
    eventAlt: 'Evento de Narcóticos Anónimos',
  },
  en: {
    directoryTitle: 'MEDELLÍN AND SOUTH ANTIOQUIA AREA - Group Directory',
    publicInfo: 'Public Information',
    hospitals: 'Hospitals and Institutions',
    events: 'Events',
    helpNow: 'Do you need help now?',
    recoveryPossible: 'Recovery is possible!',
    findGroup: 'Find your group and take the first step.',
    searchPlaceholder: 'Search group, neighborhood, address...',
    clearSearch: 'Clear search',
    directions: 'Directions',
    comingSoon: 'Coming soon',
    institutionsNotice: 'Information about the panels we conduct in Narcotics Anonymous will be published here soon.',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    eventOf: 'event',
    eventsOf: 'events',
    audioOf: 'Audio',
    tapCard: 'Tap the card to change',
    play: 'Play',
    pause: 'Pause',
    rewind: 'Rewind 10 seconds',
    forward: 'Forward 10 seconds',
    publicInfoTitle: 'Public Information',
    publicInfoDescription: 'Listen to the informational message on radio stations.',
    naSpotTitle: 'Antioquia Announcement',
    naSpotDescription: 'Listen to our Narcotics Anonymous Antioquia informational announcement.',
    footerArea: 'Narcotics Anonymous Medellín and South Antioquia Area',
    footerQuote: '“No matter who you are or where you come from… recovery is possible.”',
    socialNetworks: 'NA Antioquia Social Media',
    whatsapp: 'Contact via WhatsApp',
    eventAlt: 'Narcotics Anonymous event',
  },
} as const;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es';

  t(key: TranslationKey): string {
    return translations[this.language][key];
  }

  schedule(value: string): string {
    if (this.language !== 'en') return value;

    return value
      .replaceAll('Reunión Cerrada', 'Closed Meeting')
      .replaceAll('Lunes', 'Monday')
      .replaceAll('Martes', 'Tuesday')
      .replaceAll('Miércoles', 'Wednesday')
      .replaceAll('Jueves', 'Thursday')
      .replaceAll('Viernes', 'Friday')
      .replaceAll('Sábado', 'Saturday')
      .replaceAll('Domingo', 'Sunday')
      .replaceAll(' a ', ' to ')
      .replaceAll(' y ', ' and ');
  }
}
