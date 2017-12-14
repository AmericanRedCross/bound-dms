export class DirectoryTranslation {
  constructor (
    {
      language = '',
      title = '',
      revision = 0
    }
  ) {
    this._language = language
    this._title = title
    this._revision = revision
  }

  // Getters and Setters
  // ID
  get language () { return this._language }

  // Order
  set title (title) { this._title = title }
  get title () { return this._title }

  get revision () { return this._revision }
  set revision (revision) { this._revision = revision }

}
