export class Join {
    constructor(
      public id: number, 
      public user_id: number,
      public user: string,
      public session_id: number,
      public player_num: number,
      public is_ai: number,
      public filename: string
    ) {}
  }
  