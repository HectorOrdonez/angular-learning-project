export class User {
  public constructor(public id: string, public email: string, private _token: string, private expirationDate: Date) {
  }

  get token(): string {
    const now = new Date()

    if(now > this.expirationDate)
    {
      return null
    }

    return this._token
  }
}
