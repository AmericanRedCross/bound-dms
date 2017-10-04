export class History {
  constructor ({
                 id = null,
                 action = null,
                 entity = null,
                 entityId = null,
                 user = null,
                 changes = null,
                 createdAt = null
               }) {
    this._id = id
    this._action = action
    this._entity = entity
    this._entityId = entityId
    this._user = user
    this._changes = changes
    this._date = createdAt && new Date(createdAt)
  }

  // Getters and Setters
  get id () { return this._id }
  get action () { return this._action }
  get entity () { return this._entity }
  get entityId () { return this._entityId }
  get user () { return this._user }
  get changes () { return this._changes }
  get date () { return this._date }
}
