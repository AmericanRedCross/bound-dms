import { File } from '../file/File'
import { Document } from '../document/Document'
import { DirectoryTranslation } from './DirectoryTranslation'

// Spec: https://gist.github.com/rjbaker/8d9a4b6a7ca2bc0fe4fa9325cdf64702
export class Directory {
  constructor (
    {
      id = null,
      title = null,
      order = null,
      files = [],
      documents = [],
      directories = [],
      metadata = [],
      translations = [],
      parentId = null
    }
  ) {
    this._id = id
    this._title = title
    this._order = order
    this._files = files
    this._documents = documents
    this._directories = directories
    this._parentId = parentId
    this._metadata = metadata
    this._translations = translations
    this._needsSaving = false
  }

  // Getters and Setters
  // ID
  get id () { return this._id }

  // Order
  set order (order) { this._order = order }
  get order () { return this._order }

  // Content
  set content (content) { this._content = content }
  get content () { return this._content }

  // files
  set files (files) { this._files = files }
  get files () { return this._files }

  // files
  set documents (documents) { this._documents = documents }
  get documents () { return this._documents }

  // directories
  set directories (directories) { this._directories = directories }
  get directories () { return this._directories }

  // Translations
  get translations () { return this._translations }

  // parentId
  set parentId (parentId) { this._parentId = parentId }
  get parentId () { return this._parentId }

  // metadata
  set metadata (metadata) { this._metadata = metadata }
  get metadata () { return this._metadata }

  // Needs Saving
  set needsSaving (needsSaving) { this._needsSaving = needsSaving }
  get needsSaving () { return this._needsSaving }

  /**
   * [addFile Add an file to the files array]
   * @param {File} [file=new File()] A new file object
   */
  addFile (file = new File()) {
    if (file && this._files.findIndex(aFile => (aFile.id === file.id && file.id !== null)) === -1) {
      this._files.push(file)
    }
  }

  /**
   * [addFile Add a docuemnt to the documents array]
   * @param {Document} [file=new Document()] A new Document object
   */
  addDocument (doc = new Document()) {
    if (doc && this._documents.findIndex(aDoc => (aDoc.id === doc.id && doc.id !== null)) === -1) {
      this._documents.push(doc)
    }
  }

  /**
   * [removeFileById Remove an File from the files array by ID]
   * @param  {Number} id ID to remove
   * @return {File} Returns the removed file
   */
  removeFileById (id) {
    if (id) {
      let index = this._files.findIndex((file) => {
        return file.id === id
      })

      if (index > -1) {
        return this._files.splice(index, 1)
      }
    }
  }

  /**
   * [addDirectory add a directory]
   * @param {Directory} [directory=new Directory()] A new directory object
   */
  addDirectory (directory = new Directory({})) {
    if (directory) {
      directory.parentId = this.id
      this._directories.push(directory)
    }
  }

  /**
   * [addDirectoryAtIndex add a directory at index]
   * @param {Directory}   [directory=new Directory({})] A new directory to add
   */
  addDirectoryAtIndex ({directory = new Directory({}), index}) {
    directory.parentId = this.id
    directory.needsSaving = true
    if (directory && index >= 0) {
      if (directory.order === null) {
        // Get next hierachy
        directory.order = this.getHighestChildorder()
      }
      if (index > this._directories.length) {
        this.addDirectory(directory)
      } else {
        this._directories.splice(index, 0, directory)
      }
      // Sort
      this.sortDirectories()
    }
  }

  /**
   * [sortDirectories Sort the directories by order]
   */
  sortDirectories () {
    this._directories.sort((a, b) => {
      if (a.order < b.order) {
        return -1
      } else if (a.order > b.order) {
        return 1
      }

      return 0
    })
  }

  /**
   * [getHighestChildorder Get the highest up child order]
   * @return {Number} Order
   */
  getHighestChildorder () {
    let order = 0
    this._directories.forEach((directory) => {
      if (directory.order >= order) {
        order = directory.order + 1
      }
    })
    return order
  }

  /**
   * [removeDirectoryById Remove a directory by ID]
   * @param  {Number} id
   * @return {Directory} Removed Directory
   */
  removeDirectoryById (id) {
    if (id) {
      let index = this._directories.findIndex((directory) => {
        return directory.id === id
      })

      if (index > -1) {
        return this._directories.splice(index, 1)
      }
    }
  }

  /**
   * [getTitleByLangCode Get a directory's title by language code]
   * @param  {[type]} languageCode en, fr etc..
   * @return {[type]}              Translation
   */
  getTitleByLangCode (languageCode) {
    if (languageCode) {
      let translation = this.translations.find(translation => translation.language === languageCode)
      if (translation) {
        return translation
      }
    }
    return new DirectoryTranslation({language: languageCode})
  }

  updateTranslation (translation) {
    if (translation) {
      let foundTranslation = this.translations.find(aTranslation => aTranslation.language === translation.language)
      if (foundTranslation) {
        foundTranslation.title = translation.title
      } else {
        this._translations.push(translation)
      }
    }
  }

  /**
   * [flatten Get backend friendly Directory object]
   * @return {Object} The directory object (without the nesting)
   */
  flatten () {
    let directoryObject = {
      id: this.id,
      files: this.files.map(file => {
        file.flatten()
      }),
      content: this.content,
      order: this.order,
      parentId: this.parentId,
      needsSaving: this.needsSaving
    }
    return directoryObject
  }
}

/**
 * [updateOrder Update an array of directories orders if the array has been moved about]
 * @param  {Array} directories The directories
 */
Directory.updateOrder = (directories) => {
  for (let i = 0; i < directories.length; i++) {
    if (directories[i].order !== i) {
      directories[i].order = i
      directories[i].needsSaving = true
    }
  }
}
