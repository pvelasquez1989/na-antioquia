import { Component, Input, inject } from '@angular/core';
import { NA_ZONES, Zone } from '../../data/groups.data';
import { GroupCard } from '../group-card/group-card';
import { LanguageService } from '../../services/language.service';

const WEEKDAYS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

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

  private normalize(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  private matchesWeekday(scheduleDays: string, weekday: string): boolean {
    const normalizedDays = this.normalize(scheduleDays);
    if (normalizedDays.includes('todos los dias')) return true;

    const matches = [...normalizedDays.matchAll(/\b(lunes|martes|miercoles|jueves|viernes|sabado|domingo)s?\b/g)];
    if (matches.some((match) => match[1] === weekday)) return true;

    return matches.some((match, index) => {
      const next = matches[index + 1];
      if (!next || !/\ba\b/.test(normalizedDays.slice(match.index! + match[0].length, next.index))) return false;

      const start = WEEKDAYS.indexOf(match[1]);
      const end = WEEKDAYS.indexOf(next[1]);
      const requested = WEEKDAYS.indexOf(weekday);
      return start <= end && requested >= start && requested <= end;
    });
  }

  get filteredZones() {
    if (!this.searchTerm) return this.zones;

    const normalizedTerm = this.normalize(this.searchTerm);
    const weekday = WEEKDAYS.find((day) => normalizedTerm === day || normalizedTerm === `${day}s`);

    return this.zones.map((zone) => {
      const filteredGroups = zone.groups.filter((group) => {
        const searchableText = this.normalize([
          group.name,
          group.address ?? '',
          ...group.schedules.flatMap(({ days, hours }) => [days, hours]),
        ].join(' '));

        return searchableText.includes(normalizedTerm)
          || Boolean(weekday && group.schedules.some(({ days }) => this.matchesWeekday(days, weekday)));
      });

      return { ...zone, groups: filteredGroups };
    }).filter((zone) => zone.groups.length > 0);
  }
}
