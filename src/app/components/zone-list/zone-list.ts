import { Component, Input, inject } from '@angular/core';
import { NA_ZONES, Zone } from '../../data/groups.data';
import { GroupCard } from '../group-card/group-card';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-zone-list',
  imports: [GroupCard],
  templateUrl: './zone-list.html',
  styleUrl: './zone-list.css'
})
export class ZoneList {
  readonly language = inject(LanguageService);
  zones: Zone[] = NA_ZONES;
  
  @Input() searchTerm: string = '';

  // NUEVO: Función auxiliar para quitar tildes/acentos
  removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  get filteredZones() {
    if (!this.searchTerm) return this.zones; 
    
    // Aplicamos minúsculas y quitamos tildes al texto buscado
    const lowerTerm = this.removeAccents(this.searchTerm.toLowerCase());
    
    return this.zones.map(zone => {
      const filteredGroups = zone.groups.filter(group => {
        // Aplicamos minúsculas y quitamos tildes al texto de la tarjeta
        const textToSearch = this.removeAccents(`${group.name} ${group.address || ''}`.toLowerCase());
        return textToSearch.includes(lowerTerm);
      });
      return { ...zone, groups: filteredGroups };
    }).filter(zone => zone.groups.length > 0); 
  }
}
