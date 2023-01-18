export class User {
  public constructor(public id: string, public email: string, private _token: string, private expiredIn: number) {
  }

  get token(): string {
    const now = new Date()

    if(now > this.expireDate)
    {
      return null
    }

    return this._token
  }

  get expireDate(): Date {
    const now = new Date()

    return new Date(now.getTime() + (this.expiredIn * 1000))
  }
}
