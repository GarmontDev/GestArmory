export class Client{
  constructor(
      public _id: string,
      public dni: string,
      public name: string,
      public address: string,
      public city: string,
      public province: string,
      public guide: string,
      public guideexpeditiondate: Date
  ){}
}
