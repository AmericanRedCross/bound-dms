export class ApiKey {
  constructor ({
    id = null,
    name = null,
    key = null,
    createdAt = null,
    updatedAt = null
  }) {
    this._id = id
    this._name = name
    this._key = key
    this._createdAt = createdAt && new Date(createdAt)
    this._updatedAt = updatedAt && new Date(updatedAt)
  }

  // Getters and Setters
  // ID
  set id (id) { this._id = id }
  get id () { return this._id }

  // Name
  set name (name) { this._name = name }
  get name () { return this._name }

  // Key
  set key (key) { this._key = key }
  get key () { return this._key }

  // createdAt
  get createdAt () { return this._createdAt }

  // updatedAt
  get updatedAt () { return this._updatedAt }
}
