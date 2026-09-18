import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fun-bingo',
  imports: [RouterLink],
  templateUrl: './fun-bingo.component.html',
  styleUrl: './fun-bingo.component.scss'
})
export class FunBingoComponent implements OnInit {
  prikaz = '?';
  info = 'Brojevi se ne ponavljaju dok se ne resetuje igra.';
  preostali: number[] = [];

  ngOnInit(): void {
    this.napuni();
  }

  napuni(): void {
    this.preostali = [];
    for (let i = 1; i <= 75; i++) {
      this.preostali.push(i);
    }
  }

  izvuci(): void {
    if (this.preostali.length === 0) {
      this.info = 'Svi brojevi su izvuceni. Resetuj igru.';
      return;
    }
    const index = Math.floor(Math.random() * this.preostali.length);
    const broj = this.preostali[index];
    this.preostali.splice(index, 1);
    this.prikaz = String(broj);
    this.info = 'Preostalo brojeva: ' + this.preostali.length;
  }

  reset(): void {
    this.napuni();
    this.prikaz = '?';
    this.info = 'Brojevi se ne ponavljaju dok se ne resetuje igra.';
  }
}
