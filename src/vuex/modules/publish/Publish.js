export class Publish {
  constructor ({
     id = null,
     projectId = null,
     language = null,
     type = null,
     filePath = null,
     createdAt = null,
     updatedAt = null
   }) {
    this._id = id
    this._projectId = projectId
    this._language = language
    this._type = type
    this._filePath = filePath
    this._createdAt = createdAt && new Date(createdAt)
    this._updatedAt = updatedAt && new Date(updatedAt)
  }

  get id () { return this._id }

  set projectId (projectId) { this._projectId = projectId }
  get projectId () { return this._projectId }

  set language (language) { this._language = language }
  get language () { return this._language }

  set type (type) { this._type = type }
  get type () { return this._type }

  set filePath (filePath) { this._filePath = filePath }
  get filePath () { return this._filePath }

  get createdAt () { return this._createdAt }

  get updatedAt () { return this._updatedAt }

  toJSON () {
    return {
      id: this._id,
      projectId: this._projectId,
      language: this._language,
      type: this._type,
      filePath: this._filePath,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    }
  }
}
