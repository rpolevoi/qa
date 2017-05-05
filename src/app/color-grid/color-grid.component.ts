import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

@Component({
  selector: 'color-grid',
  templateUrl: './color-grid.component.html',
  styleUrls: ['./color-grid.component.css']
})
export class ColorGridComponent implements OnInit {
  


  colors = [
    '#542905',  //'#070426',
    '#F7E6DC',//'#F7F4F3',
    '#FF8528',//'#FDE0CB',
    '#FF006A'//'#BA013C'
  ];
  
  tiles = [
    {text: '', cols: 1, rows: 1, color: this.colors[0]},
    {text: '', cols: 1, rows: 1, color: this.colors[1]},
    {text: '', cols: 1, rows: 1, color: this.colors[2]},
    {text: '', cols: 1, rows: 1, color: this.colors[3]},
  ];
  

  
  timer:Observable<number>;
  @Output() flip: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
    this.timer = Observable
                    .interval(100)
                    .take(15);
                    
    this.timer.subscribe(
      int => { 
               let lastColor = this.colors.pop();
               this.colors.unshift(lastColor);
               this.tiles = [
                {text: '', cols: 1, rows: 1, color: this.colors[0]},
                {text: '', cols: 1, rows: 1, color: this.colors[1]},
                {text: '', cols: 1, rows: 1, color: this.colors[2]},
                {text: '', cols: 1, rows: 1, color: this.colors[3]},
                ];
                if (int == 14) { this.flip.emit(null); }
               } 
            );               
    
    
  }

}
