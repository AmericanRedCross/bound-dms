export class Translation {
  constructor ({
    id = null,
    documentId = null,
    content = null,
    createdAt = null,
    updatedAt = null,
    language = null,
    title = null,
    revision = 0
   }) {
    this._id = id
    this._documentId = documentId
    this._content = content
    this._createdAt = createdAt && new Date(createdAt)
    this._updatedAt = updatedAt && new Date(updatedAt)
    this._language = language
    this._title = title
    this._revision = 0
  }

  get id () { return this._id }

  get documentId () { return this._documentId }

  set content (content) { this._content = content }
  get content () { return this._content }

  get createdAt () { return this._createdAt }

  get updatedAt () { return this._updatedAt }

  get language () { return this._language }

  set title (title) { this._title = title }
  get title () { return this._title }

  set revision (revision) { this._revision = revision }
  get revision () { return this._revision }
}
