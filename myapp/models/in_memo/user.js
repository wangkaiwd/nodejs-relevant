class User {
  constructor (firstName, lastName, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = 20
  }

  getName () {
    console.log(`${this.firstName} ${this.lastName}`)
  }
}

module.exports = User