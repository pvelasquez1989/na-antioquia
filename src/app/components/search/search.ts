import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  // EventEmitter permite enviar información "hacia afuera" del componente
  @Output() searchChanged = new EventEmitter<string>();

  // Se ejecuta cada vez que el usuario teclea
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChanged.emit(value);
  }

  // Limpia la barra y emite un texto vacío
  clearSearch(inputElement: HTMLInputElement) {
    inputElement.value = '';
    this.searchChanged.emit('');
  }
}
