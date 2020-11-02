export class Session {
    constructor(
      public id: number, 
      public status: number,
      public game_id: number,
      public game: string,
      public var_num: number,
      public variant_id: number,
      public filename: string,
      public created: Date,
      public creator: string,
      public changed: Date,
      public closed: Date,
      public players_total: number,
      public winner: number,
      public loser: number,
      public score: number,
      public last_setup: string,
      public player_num: number,
      public player_name: string,
      public selector_value: number,
      public uid: number,
      public last_turn: number,
      public style: number
    ) {}
  }
  