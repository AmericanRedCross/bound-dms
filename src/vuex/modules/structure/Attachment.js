// Spec: https://gist.github.com/rjbaker/8d9a4b6a7ca2bc0fe4fa9325cdf64702
export class Attachment {
  constructor (
    {
      id = null,
      title = null,
      filename = null,
      mimeType = null,
      size = 120000,
      featured = true
    }
  ) {
    this._id = id
    this._title = title
    this._filename = filename
    this._mimeType = mimeType
    this._size = size
    this._featured = featured
  }

  // Getters and Setters
  // ID
  get id () { return this._id }

  // Title
  set title (title) { this._title = title }
  get title () { return this._title }

  // URL
  set filename (filename) { this._filename = filename }
  get filename () { return this._filename }

  // mimeType
  set mimeType (mimeType) { this._mimeType = mimeType }
  get mimeType () { return this._mimeType }

  // Size
  set size (size) { this._size = size }
  get size () { return this._size }

  // Featured
  set featured (featured) { this._featured = featured }
  get featured () { return this._featured }

  /**
   * [flatten Get backend friendly Attachment object]
   * @return {Object} The attachment object (without the nesting)
   */
  flatten () {
    let attachmentObject = {
      id: this.id,
      title: this.title,
      filename: this.filename,
      mimeType: this.mimeType,
      size: this.size,
      featured: this.featured
    }
    return attachmentObject
  }
}
