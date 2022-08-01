export class Movement{
  constructor(
      public _id: string,
      public seatNumber: number,
      public date: Date,
      public product: string,
      public guide: string,
      public client: string,
      public stock: number
  ){}
}
