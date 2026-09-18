import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fun-kviz',
  imports: [RouterLink, FormsModule],
  templateUrl: './fun-kviz.component.html',
  styleUrl: './fun-kviz.component.scss'
})
export class FunKvizComponent {
  p1 = '';
  p2 = '';
  p3 = '';
  rezultat = '';

  provjeri(): void {
    let bodovi = 0;
    if (this.p1 === 'a') bodovi++;
    if (this.p2 === 'b') bodovi++;
    if (this.p3 === 'b') bodovi++;
    this.rezultat = 'Tvoj rezultat: ' + bodovi + ' / 3';
  }
}
