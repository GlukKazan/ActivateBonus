export class User {
    constructor(
      public id: number, 
      public realm: number,
      public is_admin: number,
      public name: string,
      public username: string,
      public password: string,
      public email: string,
      public created: Date,
      public deleted: Date,
      public last_actived: Date
    ) {}
  }
  