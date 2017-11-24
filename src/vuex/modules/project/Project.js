export class Project {
  constructor ({
    id = null,
    name = null,
    description = null,
    languages = [],
    createdAt = null,
    createdBy = null,
    updatedAt = null,
    baseLanguage = null,
    stats = []
  }) {
    this._id = id
    this._name = name
    this._description = description
    this._languages = languages
    this._createdAt = createdAt && new Date(createdAt)
    this._createdBy = createdBy
    this._updatedAt = updatedAt && new Date(updatedAt)
    this._baseLanguage = baseLanguage
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

  set baseLanguage (baseLanguage) { this._baseLanguage = baseLanguage }
  get baseLanguage () { return this._baseLanguage }

  // createdAt
  get createdAt () { return this._createdAt }

  // createdAt
  get createdBy () { return this._createdBy }

  // updatedAt
  get updatedAt () { return this._updatedAt }

  set stats (stats = []) { this._stats = stats }
  get stats () { return this._stats }
}
