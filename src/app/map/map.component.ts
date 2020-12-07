import { Component, OnInit } from '@angular/core';
import { Game } from '../interface/game';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService]
})
export class MapComponent implements OnInit {

  games: Array<Game>;
  
  constructor(
    private serv: MapService
  ) { 
    this.games = new Array<Game>();
  }

  ngOnInit(): void {
    this.loadGames();
  }

  private loadGames() {
    this.serv.getGames().subscribe((data: Game[]) => {
      this.games = data;
    },
    (error: any) => {
      let status = error.status;
      alert("Error: " + status);
    });
  }
}
