export class Document {
  constructor ({
    id = null,
    projectId = null,
    createdBy = null,
    createdAt = null,
    translations = []
   }) {
    this._id = id
    this._projectId = projectId
    this._createdBy = createdBy
    this._createdAt = createdAt && new Date(createdAt)
    this._translations = translations
  }

  get id () { return this._id }

  set projectId (projectId) { this._projectId = projectId }
  get projectId () { return this._projectId }

  set createdBy (createdBy) { this._createdBy = createdBy }
  get createdBy () { return this._createdBy }

  set createdAt (createdAt) { this._createdAt = createdAt }
  get createdAt () { return this._createdAt }

  set translations (translations) { this._translations = translations }
  get translations () { return this._translations }
}
