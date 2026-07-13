// 1. Definimos la estructura de la información
export interface Schedule {
  days: string;
  hours: string;
}

export interface VirtualLink {
  text: string;
  url: string;
}

export interface Group {
  name: string;
  mapLink?: string;
  address?: string;
  schedules: Schedule[];
  internalNote?: string;
  virtualLinks?: VirtualLink[];
}

export interface Zone {
  zoneName: string;
  groups: Group[];
}

// 2. Aquí guardamos absolutamente todos los grupos
export const NA_ZONES: Zone[] = [
  {
    zoneName: 'ZONA OCCIDENTAL',
    groups: [
      {
        name: 'Comuna 13',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+43+%23100-03+Medellin',
        address: 'Cl 43 #100-03 (402) P1. Al lado Iglesia San Javier, Comuna 13.',
        schedules: [
          { days: 'Martes:', hours: '7:00 P.M.' },
          { days: 'Sábado:', hours: '7:00 P.M.' }
        ]
      },
      {
        name: 'Solo por Hoy',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+80+%2344-65+Medellin',
        address: 'Cra 80 #44-65 Barrio La América',
        schedules: [
          { days: 'Lunes a Sábado:', hours: '7:00A.M. / 12:15P.M. / 4:00P.M. / 7:15P.M.' },
          { days: 'Domingo:', hours: '7:00A.M. / 5:00P.M.' }
        ],
        internalNote: '*Reunión Maratónica Segundo Sábado de Cada Mes'
      },
      {
        name: 'El Camino',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+49+%2381-44+Medellin',
        address: 'Cl 49 #81-44 Junta de Acción Comunal Calasanz',
        schedules: [
          { days: 'Lunes:', hours: '7:00P.M. (Híbrida)' },
          { days: 'Martes:', hours: '8:00P.M. Estudio de Pasos(Virtual)' },
          { days: 'Jueves:', hours: '7:00P.M. (Híbrida)' },
          { days: 'Sábado:', hours: '7:00P.M. (Híbrida)' }
        ],
        virtualLinks: [{ text: 'meet.google.com/ohu-gjmt-srj', url: 'https://meet.google.com/ohu-gjmt-srj' }]
      },
      {
        name: 'Vivir Limpios',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Transversal+78A+%2388-06+Medellin',
        address: 'Tv 78A #88-06 Robledo Bello Horiz. Salón Social villa de la Candelaria.',
        schedules: [
          { days: 'Miércoles:', hours: '7:15 P.M.' },
          { days: 'Viernes:', hours: '7:15 P.M.' }
        ]
      },
      {
        name: 'Sendas Espirituales',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+107+%2343-46+Medellin',
        address: 'Cra 107 #43-46 J.A.C. Antonio Nariño',
        schedules: [
          { days: 'Lunes, Miércoles, Jueves, Viernes:', hours: '7:15 P.M.' }
        ]
      },
      {
        name: 'La Esperanza',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Avenida+33+%2381-40+Medellin',
        address: 'Av 33 #81-40 S.P.I. Iglesia Santa Gema, Simon Bolivar.',
        schedules: [
          { days: 'Domingo:', hours: '12:30 A.M.' }
        ]
      },
      {
        name: 'Camino a la Libertad',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+62+%23131-80+Medellin',
        address: 'Cl 62 #131-80 P2 Corregimiento San Cristóbal, Medellín (Biblioteca Fernando Botero, Salón Artes 3).',
        schedules: [
          { days: 'Martes:', hours: '5:00 P.M. A 6:30 P.M.' }
        ]
      },
      {
        name: 'Volver a Vivir',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+8B+Sopetran',
        address: 'Calle 8B Salón Parroquial ingreso Cl 8B, Sopetrán',
        schedules: [
          { days: 'Miércoles:', hours: '6:00 P.M.' }
        ]
      }
    ]
  },
  {
    zoneName: 'ZONA NORTE',
    groups: [
      {
        name: 'Grupo Vida',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+50+%2345D-71+Bello',
        address: 'Cra 50 #45D-71 P2 Bello (Frente Cootrafa)',
        schedules: [
          { days: 'Lunes a Domingo:', hours: '7:00A.M. y 7:00P.M.' }
        ],
        internalNote: '*1er Sábado de cada Mes Reunión Maratónica'
      },
      {
        name: 'Los Lazos que nos Unen',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Diagonal+55+%2333-47+Bello',
        address: 'Diag 55 #33-47 Niquía Bello (P. Amigo Jesús)',
        schedules: [
          { days: 'Lunes a Viernes:', hours: '7:00P.M.' }
        ],
        internalNote: '*Reunión Maratónica Primer viernes de Cada Mes'
      },
      {
        name: 'Punto de Libertad',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+123+%2351A-29+Medellin',
        address: 'Cl 123 #51A-29 El Playón',
        schedules: [
          { days: 'Martes:', hours: '7:15 P.M.' },
          { days: 'Viernes:', hours: '7:15 P.M.' },
          { days: 'Domingo:', hours: '6:00 P.M.' }
        ]
      },
      {
        name: 'El Milagro',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+108+%2381-06+Medellin',
        address: 'Cl 108 #81-06 J.A.C. Barrio F. Gómez',
        schedules: [
          { days: 'Miércoles:', hours: '7:00 P.M.' }
        ]
      },
      {
        name: 'Nunca Más Solos',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+78A+%2395-55+Medellin',
        address: 'Cra 78A #95-55 J.A.C. San Martín de Porres',
        schedules: [
          { days: 'Martes:', hours: '7:30 P.M.' },
          { days: 'Miércoles:', hours: '8:00 P.M.' }
        ]
      },
      {
        name: 'El Cambio es Hoy',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+52+%2341-16+Copacabana',
        address: 'Cl 52 #41-16 Placa Dep. El Recreo Copacabana',
        schedules: [
          { days: 'Lunes, Viernes, Sábado:', hours: '7:00 P.M.' },
          { days: 'Miércoles:', hours: '(Reunión Cerrada) 7:00 P.M.' },
          { days: 'Domingo:', hours: '5:00 P.M.' }
        ]
      },
      {
        name: 'La Unidad',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+24A+%2358A-80+Bello',
        address: 'Cl 24A #58A-80 J.A.C. Barrio Nuevo',
        schedules: [
          { days: 'Lunes:', hours: '(Reunión Cerrada) 7:15 P.M.' },
          { days: 'Jueves:', hours: '7:15 P.M.' }
        ]
      },
      {
        name: 'Olas de Cambio',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+68+%2392F-00+Medellin',
        address: 'Cra 68 #92F-00 Diag. Hospital La María Castilla',
        schedules: [
          { days: 'Miércoles, Viernes, Sábado:', hours: '7:15 P.M.' },
          { days: 'Domingo:', hours: '9:00 A.M.' }
        ]
      },
      {
        name: 'Otra Oportunidad',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+7+%2313-10+Girardota',
        address: 'Cl 7 #13-10 Int 201 Girardota',
        schedules: [
          { days: 'Sábado:', hours: '3:00 P.M.' },
          { days: 'Domingo y Festivos:', hours: '10:00 A.M.' }
        ]
      }
    ]
  },
  {
    zoneName: 'ZONA NORORIENTAL',
    groups: [
      {
        name: 'La Fortaleza',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+44A+%2385-191+Medellin',
        address: 'Cra 44A #85-191 Piso 2, Aranjuez.',
        schedules: [
          { days: 'Martes:', hours: '7:15 P.M.' },
          { days: 'Sábado:', hours: '7:15 P.M.' }
        ]
      },
      {
        name: 'El Mensaje',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+48A+%2377-43+Medellin',
        address: 'Cra 48A #77-43 S.P. Iglesia El Calvario Campo Valdés.',
        schedules: [
          { days: 'Lunes, Jueves, Viernes:', hours: '7:15 P.M.' },
          { days: 'Miércoles:', hours: '(Reunión Cerrada) 7:15 P.M.' },
          { days: 'Domingo:', hours: '5:00 P.M. y 6:30 P.M.' }
        ]
      },
      {
        name: 'La Segunda Oportunidad',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+40+%2395A-20+Medellin',
        address: 'Cra 40 #95A-20 Iglesia Ntra. Sra. Guadalupe, Comuna 1 (Popular).',
        schedules: [
          { days: 'Viernes:', hours: '7:00 P.M. y 8:15 P.M.' }
        ]
      },
      {
        name: 'Algo Más Será Revelado',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+108+%2343-32+Medellin',
        address: 'Cl 108 #43-32 B. (La Divina Providencia) Comuna 1 (Popular).',
        schedules: [
          { days: 'Jueves:', hours: '7:00 P.M.' }
        ]
      }
    ]
  },
  {
    zoneName: 'ZONA CENTRO / CENTRO ORIENTAL',
    groups: [
      {
        name: 'Despertar Espiritual',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+52+%2361-96+Medellin',
        address: 'Cra 52 #61-96 Piso 3 Centro.',
        schedules: [
          { days: 'Lunes a Domingo:', hours: '7:00 A.M.' }
        ]
      },
      {
        name: 'Libertad',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+52+%2361-96+Medellin',
        address: 'Cra 52 #61-96 Piso 3 Centro.',
        schedules: [
          { days: 'Lunes a Domingo:', hours: '12:15 P.M.' }
        ]
      },
      {
        name: 'Limpio y Sereno',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+57A+%2345D-34+Medellin',
        address: 'Cl 57A #45D-34 Centro.',
        schedules: [
          { days: 'Lunes a Domingo:', hours: '7:00 A.M.' },
          { days: 'Lunes, Martes,Miércoles, Jueves, Viernes, Domingo:', hours: '7:15 P.M.' },
          { days: 'Sábado:', hours: '7:00 A.M, 5:00 P.M. y 7:00 P.M.' }
        ]
      },
      {
        name: 'La Confianza',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+40+%23260-125+Medellin',
        address: 'Cl 40 #26 C-125 Barrio La Milagrosa',
        schedules: [
          { days: 'Lunes a Sábado:', hours: '7:00 A.M.' },
          { days: 'Lunes, Miércoles, Viernes:', hours: '(Reunión Cerrada) 7:00 P.M.' },
          { days: 'Martes, Jueves, Sábado, Domingo:', hours: '7:00 P.M.' },
          { days: 'Miércoles y Viernes:', hours: '12:00M.' },
          { days: 'Domingo y Festivos:', hours: '10:00A.M.' }
        ],
        internalNote: '*Ultimo Sábado de cada mes - Reunión Maratónica. *1er Sábado de cada mes - DISCUSIÓN ABIERTA 8:45 P.M.'
      }
    ]
  },
  {
    zoneName: 'BELEN / GUAYABAL / ENVIGADO',
    groups: [
      {
        name: 'Transformación',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+65+%2332B-70+Medellin',
        address: 'Cra 65 #32B-70 S.P. Belén Fátima',
        schedules: [
          { days: 'Lunes, Miércoles, Viernes:', hours: '7:00 P.M.' },
          { days: 'Sábado:', hours: 'Reunión de Propósitos Especiales (Mujeres) 4:00 P.M.' },
          { days: 'Domingo:', hours: '8:00 P.M.' },
          { days: 'Domingo:', hours: '(Virtual) 10:00 A.M.' }
        ],
        virtualLinks: [{ text: 'https://us02web.zoom.us/j/81302857503', url: 'https://us02web.zoom.us/j/81302857503' }],
        internalNote: '*Reunión Maratónica último viernes de Cada Mes'
      },
      {
        name: 'Buena Voluntad',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+2A+Sur+%2353-34+Medellin',
        address: 'Cl 2A Sur #53-34 Cristo Rey Guayabal',
        schedules: [
          { days: 'Martes, Jueves, Miércoles (Cerrada):', hours: '7:15 P.M.' },
          { days: 'Viernes, Sábado, Domingo (Reunión Abierta):', hours: '7:15 P.M.' }
        ]
      },
      {
        name: 'La Humildad',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+40+Sur+%2329A-25+Envigado',
        address: 'Cl 40 Sur #29A-25 S.P. San José Envigado.',
        schedules: [
          { days: 'Miércoles, Jueves, Sábado:', hours: '7:00 P.M.' }
        ]
      },
      {
        name: 'Enséñame a Vivir',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+40H+Sur+%2341-37+Envigado',
        address: 'Cl 40H Sur #41-37 J.A.C. El Dorado P2 Envigado.',
        schedules: [
          { days: 'Martes, Viernes:', hours: '7:15 P.M.' }
        ]
      },
      {
        name: 'Luz de Vida',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+42B+%2326+Sur-05+Envigado',
        address: 'Cra 42B #26 Sur-05 J.A.C. Las Orquídeas Envigado.',
        schedules: [
          { days: 'Viernes:', hours: '5:00 P.M.' },
          { days: 'Domingo:', hours: '4:00 P.M.' }
        ]
      },
      {
        name: 'Creciendo Juntos',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Transversal+32D+%2331-16+Envigado',
        address: 'Transv 32D #31-16 J.A.C. Las Flores Envigado.',
        schedules: [
          { days: 'Jueves:', hours: '7:00 P.M.' }
        ]
      },
      {
        name: 'Dando Motivos',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+68+Sur+%2346A-57+Sabaneta',
        address: 'Cl 68 Sur #46A-57 Av. Las Vegas (Sabaneta)',
        schedules: [
          { days: 'Lunes, Miércoles, Viernes:', hours: '8:15 P.M.' }
        ]
      }
    ]
  },
  {
    zoneName: 'ITAGÜÍ / MUNICIPIOS / ORIENTE',
    groups: [
      {
        name: 'El Deseo',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+70+%2334-42+Itagui',
        address: 'Cra 70 #34-42 P3 B. San Gabriel (Itagüí)',
        schedules: [
          { days: 'Martes, Jueves:', hours: '7:00 P.M.' }
        ]
      },
      {
        name: 'Llegamos a Creer',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Diagonal+45+%2334A-03+Itagui',
        address: 'Diag. 45 #34A-03 San Pío (Itagüí)',
        schedules: [
          { days: 'Lunes a Viernes:', hours: '12:30 P.M.' },
          { days: 'Lunes, Martes, Viernes, Domingo:', hours: '7:00 P.M.' },
          { days: 'Miércoles, Jueves:', hours: '8:00 P.M.' },
          { days: 'Sábado:', hours: '12:30 P.M., 7:00 P.M. y 9:30 P.M.' }
        ]
      },
      {
        name: 'Somos un Milagro',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+48+%2366-00+Itagui',
        address: 'Cra 48 #66-00 Simón Bolívar Itagüí',
        schedules: [
          { days: 'Martes, Viernes:', hours: '8:30 P.M.' }
        ]
      },
      {
        name: 'La Amistad',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+41+Sur+%2380-71+San+Antonio+de+Prado',
        address: 'Cl 41 Sur #80-71 P3 S. Antonio de Prado',
        schedules: [
          { days: 'Domingo:', hours: '5:30 P.M.' }
        ]
      },
      {
        name: 'Cambio de Vida',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+95Sur+%2355-15+La+Estrella',
        address: 'Cl 95Sur #55-15 J.A.C. Pueblo Viejo Estrella',
        schedules: [
          { days: 'Martes, Viernes:', hours: '7:00 P.M.' },
          { days: 'Domingo:', hours: '12:00 M.' }
        ]
      },
      {
        name: 'Renacer',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+83A+Sur+%2360-45+La+Estrella',
        address: 'Cl 83A Sur #60-45 Casa de la Cultura Estrella',
        schedules: [
          { days: 'Lunes:', hours: '7:15 P.M.' }
        ]
      },
      {
        name: 'Esperanza de Vivir',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+50+%23139+Sur-06+Caldas',
        address: 'Cra 50 #139 Sur-06 Caldas',
        schedules: [
          { days: 'Jueves, Viernes:', hours: '7:00 P.M.' },
          { days: 'Sábado (Reunión Cerrada):', hours: '7:00 P.M.' },
          { days: 'Domingo:', hours: '8:00 A.M.' }
        ]
      },
      {
        name: 'Hazlo Simple',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+54+%2347-48+Rionegro',
        address: 'Cl 54 #47-48 Rionegro',
        schedules: [
          { days: 'Lunes, Martes, Miércoles y Viernes:', hours: '7:00 P.M.' },
          { days: 'Jueves (Estudio Tradiciones):', hours: '7:00 P.M.' },
          { days: 'Sábado y Domingo:', hours: '5:00 P.M.' }
        ]
      },
      {
        name: 'Aprendiendo a Vivir',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Pasaje+Los+Chivos+Marinilla',
        address: 'Pasaje Los Chivos, Parque Principal Marinilla',
        schedules: [
          { days: 'Lunes, Miércoles, Viernes, Sábado:', hours: '7:00 P.M.' }
        ]
      },
      {
        name: 'No Más Solos',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Calle+37+%23520-63+Guarne',
        address: 'Cl 37 #520-63 B. San Antonio Guarne',
        schedules: [
          { days: 'Lunes:', hours: '7:00 P.M.' },
          { days: 'Domingo:', hours: '4:00 P.M.' }
        ]
      },
      {
        name: 'Si Nos Recuperamos',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Barrio+El+Plan+El+Retiro',
        address: 'J.A.C. Barrio El Plan (El Retiro)',
        schedules: [
          { days: 'Martes:', hours: '7:30 P.M.' }
        ]
      },
      {
        name: 'La Gran Oportunidad',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Carrera+25+%2316-13+La+Ceja',
        address: 'Cra 25 #16-13 (2do. Piso) La Ceja Salon de Asocomunal',
        schedules: [
          { days: 'Lunes, Martes, Miércoles:', hours: '7:00 P.M.' }
        ]
      }
    ]
  },
  {
    zoneName: 'GRUPOS VIRTUALES',
    groups: [
      {
        name: 'Oriente Antioqueño',
        schedules: [{ days: 'Todos los días:', hours: '7:30 P.M.' }],
        virtualLinks: [{ text: 'Zoom Link (Clave 123)', url: 'https://us02web.zoom.us/j/82855197351' }]
      },
      {
        name: 'Nos Recuperamos',
        schedules: [{ days: 'Todos los días:', hours: '7:30A.M. y 9:00P.M.' }],
        virtualLinks: [
          { text: 'Zoom ID: 742 361 4458 (Clave 123)', url: 'https://zoom.us/j/7423614458' },
          { text: 'Unirse al grupo de WhatsApp 💬', url: 'https://chat.whatsapp.com/ElZ2qBJYAS62HR0vmEUKmM' }
        ]
      },
      {
        name: 'Tómalo con Calma',
        schedules: [{ days: 'Todos los días:', hours: '9:00 P.M.' }],
        virtualLinks: [{ text: 'Zoom ID: 645 8073 362', url: 'https://zoom.us/j/6458073362' }]
      },
      {
        name: 'La Serenidad',
        schedules: [{ days: 'Lunes a Viernes:', hours: '7:00 P.M.' }],
        virtualLinks: [{ text: 'https://meet.google.com/wpq-ioor-odi', url: 'https://meet.google.com/wpq-ioor-odi' }]
      },
      {
        name: '24 Horas Recuperación',
        schedules: [{ days: 'Todo el día:', hours: 'Chat de WhatsApp' }],
        virtualLinks: [{ text: 'Unirse al grupo de WhatsApp', url: 'https://chat.whatsapp.com/DlI27kJwNTP2dVTuyAsU9S' }]
      },
      {
        name: 'Los Lazos que nos Unen',
        schedules: [{ days: 'Lunes a Sábado:', hours: '10:00 A.M.' }],
        virtualLinks: [{ text: 'Zoom ID: 289 661 7641 (Contraseña: 222)', url: 'https://us05web.zoom.us/j/2896617641?pwd=6s4xpxOF8VULNgac62aNOC5HKzko2f.1' }]
      },
      {
        name: 'Argentina',
        schedules: [{ days: 'Todos los días:', hours: 'Conectarse 2 horas antes 7*24' }],
        virtualLinks: [{ text: 'Maratónica de Argentina', url: 'https://us06web.zoom.us/j/4905109784?pwd=NXk1ZU90bHRiNHZxcGRVTWtRTkRJdz09' }]
      }
    ]
  },
  {
    zoneName: 'REDES SOCIALES / INSTAGRAM / FACEBOOK',
    groups: [
      {
        name: 'Redes Sociales',
        schedules: [],
        virtualLinks: [{ text: 'Instagram / Facebook', url: 'https://linktr.ee/narcoticosanonimosant' }]
      }
    ]
  }
];