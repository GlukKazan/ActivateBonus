export class Game {
    constructor(
      public id: number, 
      public name: string, 
      public filename: string,
      public players_total: number,
      public created: Date,
      public main_time: number,
      public additional_time: number,
      public realm_id: number,
      public max_selector: number,
      public bots: string
    ) {}
  }
  