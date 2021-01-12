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
      public bots: string,
      public variant_id: number,
      public preview: string,
      public rules: string,
      public copyright: string,
      public waiting: number,
      public all: number,
      public external_ai: number,
      public no_ai: string
    ) {}
  }
  