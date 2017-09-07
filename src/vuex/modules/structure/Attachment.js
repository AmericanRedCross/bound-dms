// Spec: https://gist.github.com/rjbaker/8d9a4b6a7ca2bc0fe4fa9325cdf64702
export class Attachment {
  constructor (
    {
      id = null,
      title = null,
      url = null,
      mime = null,
      size = 120000,
      featured = true
    }
  ) {
    this._id = id
    this._title = title
    this._url = url
    this._mime = mime
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
  set url (url) { this._url = url }
  get url () { return this._url }

  // Mime
  set mime (mime) { this._mime = mime }
  get mime () { return this._mime }

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
      url: this.url,
      mime: this.mime,
      size: this.size,
      featured: this.featured
    }
    return attachmentObject
  }
}
