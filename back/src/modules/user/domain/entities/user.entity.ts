export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public name: string,
    public readonly createdAt: Date,
  ) {}

  getName() {
    return this.name;
  }

  changeName(newName: string) {
    if (!newName || newName.length < 2) {
      throw new Error('이름은 2자 이상이어야 합니다.');
    }
    this.name = newName;
  }
}
