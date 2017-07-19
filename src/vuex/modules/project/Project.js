export class Project {
  constructor (id, name = '', languages = []) {
    this._id = id
    this._name = name
    this._languages = languages
  }

  // Getters and Setters
  // ID
  set id (id = '') { this._id = id }
  get id () { return this._id }

  // First Name
  set name (name = '') { this._name = name }
  get name () { return this._name }

  // Last name
  set languages (languages = []) { this._languages = languages }
  get languages () { return this._languages }
}
