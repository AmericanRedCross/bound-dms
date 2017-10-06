import { Translation } from './Translation'
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
    this._rowVariant = '' // Helps with table row selection
    this._hidden = false
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

  set rowVariant (rowVariant) { this._rowVariant = rowVariant }
  get rowVariant () { return this._rowVariant }

  set hidden (hidden) { this._hidden = hidden }
  get hidden () { return this._hidden }

  getDocumentByLangCode (languageCode) {
    if (languageCode) {
      let translation = this.translations.find(translation => translation.language === languageCode)
      if (translation) {
        return translation
      }
    }
    return null
  }

  addDocument (data) {
    let doc = data.data
    if (doc.id && doc.language) {
      if (!this.getDocumentByLangCode(doc.language)) {
        this.translations.push(new Translation(doc))
        console.log(this.translations)
      }
    }
  }
}
