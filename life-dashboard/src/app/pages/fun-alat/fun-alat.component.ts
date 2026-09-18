import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-fun-alat',
  imports: [RouterLink],
  templateUrl: './fun-alat.component.html',
  styleUrl: './fun-alat.component.scss'
})
export class FunAlatComponent implements OnInit {
  naslov = '';
  url: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const alat = this.route.snapshot.paramMap.get('alat') || '';

    if (alat === 'whiteboard') {
      this.naslov = 'Interaktivni Whiteboard';
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('/whiteboard/index.html');
    } else if (alat === 'kanban') {
      this.naslov = 'Kanban Board';
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('/kanbanboard/index1.html');
    } else if (alat === 'vision') {
      this.naslov = 'Vision Board';
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('/visionboard/index.html');
    }
  }
}
