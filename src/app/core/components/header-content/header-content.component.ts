import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss'],
})
export class HeaderContentComponent  {
@Input() title: string;
  constructor() { }

}
