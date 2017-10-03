export class Metatype {
  constructor ({
    key = null,
    type = null,
    createdAt = null,
    updatedAt = null
  }) {
    this._key = key
    this._type = type
    this._createdAt = createdAt && new Date(createdAt)
    this._updatedAt = updatedAt && new Date(updatedAt)
  }

  // Key
  set key (key) { this._key = key }
  get key () { return this._key }

  // Type
  set type (type) { this._type = type }
  get type () { return this._type }

  // createdAt
  get createdAt () { return this._createdAt }

  // updatedAt
  get updatedAt () { return this._updatedAt }
}
