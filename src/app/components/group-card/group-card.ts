import { Component, Input, inject } from '@angular/core';
import { Group } from '../../data/groups.data';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-group-card',
  imports: [],
  templateUrl: './group-card.html',
  styleUrl: './group-card.css'
})
export class GroupCard {
  readonly language = inject(LanguageService);
  // @Input() le dice a Angular que este componente recibirá datos desde afuera
  @Input() group!: Group;
}
