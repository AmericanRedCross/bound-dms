export class DirectoryTranslation {
  constructor (
    {
      language = null,
      title = null
    }
  ) {
    this._language = language
    this._title = title
  }

  // Getters and Setters
  // ID
  get language () { return this._language }

  // Order
  set title (title) { this._title = title }
  get title () { return this._title }
}
