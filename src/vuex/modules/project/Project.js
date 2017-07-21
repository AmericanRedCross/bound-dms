export class Project {
  constructor (id, name = '', description = '', languages = []) {
    this._id = id
    this._name = name
    this._description = description
    this._languages = languages
  }

  // Getters and Setters
  // ID
  set id (id = null) { this._id = id }
  get id () { return this._id }

  // Name
  set name (name = null) { this._name = name }
  get name () { return this._name }

  // Description
  set description (description = '') { this._description = description }
  get description () { return this._description }

  // Languages
  set languages (languages = []) { this._languages = languages }
  get languages () { return this._languages }
}
