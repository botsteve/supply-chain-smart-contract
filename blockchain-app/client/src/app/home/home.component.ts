import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { imageName: '../assets/hyperledger_umbrella.png', title: 'Hyperledger Umbrella', cols: 5, rows: 2 },
          { imageName: '../assets/logo2.jpg', title: 'Blocks...', cols: 1, rows: 1 },
          { imageName: '../assets/logo2.png', title: 'Hyperledger logo', cols: 1, rows: 1 },
        ];
      }

      return [
        { imageName: '../assets/hyperledger_umbrella.png', title: 'Hyperledger Umbrella', cols: 5, rows: 2 },
        { imageName: '../assets/logo2.jpg', title: 'Blocks...', cols: 1, rows: 1 },
        { imageName: '../assets/logo2.png', title: 'Hyperledger logo', cols: 1, rows: 1 },
      ];
    })
  );
  
  log(card:any){
    console.log(card);
    
  }

  constructor(private breakpointObserver: BreakpointObserver) {}
}
