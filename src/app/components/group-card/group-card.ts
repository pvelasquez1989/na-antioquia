import { Component, Input } from '@angular/core';
import { Group } from '../../data/groups.data';

@Component({
  selector: 'app-group-card',
  imports: [],
  templateUrl: './group-card.html',
  styleUrl: './group-card.css'
})
export class GroupCard {
  // @Input() le dice a Angular que este componente recibirá datos desde afuera
  @Input() group!: Group;
}
