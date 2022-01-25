import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  @Input() public activeScroll: boolean;
  @Input() public message: string;
  @Output() public response = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    if (!this.activeScroll) {
      this.infiniteScroll.disabled = true;
    } else {
      this.infiniteScroll.disabled = false;
    }
  }


  loadData() {
    if (this.activeScroll) {
      this.response.emit();
      this.infiniteScroll.disabled = false;
    } else {
      this.infiniteScroll.disabled = true;
    }
    setTimeout(() => {
      this.infiniteScroll.complete();
    }, 1000);
  }
}
