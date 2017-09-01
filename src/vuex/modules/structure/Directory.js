import { Attachment } from './Attachment'

// Spec: https://gist.github.com/rjbaker/8d9a4b6a7ca2bc0fe4fa9325cdf64702
export class Directory {
  constructor (
    {
      id = null,
      title = null,
      order = null,
      content = '# Markdown Content',
      attachments = [],
      directories = []
    }
  ) {
    this._id = id
    this._title = title
    this._order = order
    this._content = content // Maybe its own object?
    this._attachments = attachments // Loop through and declare each object
    this._directories = directories // loop through and declare each object
  }

  // Getters and Setters
  // ID
  get id () { return this._id }

  // Title
  set title (title) { this._title = title }
  get title () { return this._title }

  // Hierarchy
  set order (order) { this._order = order }
  get order () { return this._order }

  // Content
  set content (content) { this._content = content }
  get content () { return this._content }

  // attachments
  set attachments (attachments) { this._attachments = attachments }
  get attachments () { return this._attachments }

  // directories
  set directories (directories) { this._directories = directories }
  get directories () { return this._directories }

  /**
   * [addAttachment Add an Attachment to the attachments array]
   * @param {Attachment} [attachment=new Attachment()] [description]
   */
  addAttachment (attachment = new Attachment()) {
    if (attachment) {
      this._attachements.push(attachment)
    }
  }

  /**
   * [removeAttachmentById Remove an Attachment from the attachments array by ID]
   * @param  {Number} id [ID to remove]
   * @return {[type]}    [description]
   */
  removeAttachmentById (id) {
    if (id) {
      let index = this._attachements.findIndex((attachment) => {
        return attachment.id === id
      })

      if (index > -1) {
        this._attachements.splice(index, 1)
      }
    }
  }

  /**
   * [addDirectory description]
   * @param {Directory} [directory=new Directory()] [description]
   */
  addDirectory (directory = new Directory({})) {
    if (directory) {
      this._directories.push(directory)
    }
  }

  /**
   * [addDirectoryAtIndex description]
   * @param {Directory}   [directory=new Directory({})]     [description]
   * @param {[type]} index     [description]
   */
  addDirectoryAtIndex ({directory = new Directory({}), index}) {
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
   * [getHighestChildorder description]
   * @return {[type]} [description]
   */
  getHighestChildorder () {
    let order = 1
    this._directories.forEach((directory) => {
      if (directory.order >= order) {
        order = directory.order + 1
      }
    })
    return order
  }

  /**
   * [removeDirectoryById description]
   * @param  {Number} id [description]
   * @return {[type]}    [description]
   */
  removeDirectoryById (id) {
    if (id) {
      let index = this._directories.findIndex((directory) => {
        return directory.id === id
      })

      if (index > -1) {
        this._directories.splice(index, 1)
      }
    }
  }
}

Directory.updateOrder = (updatedIndex, oldIndex, directories) => {
  // Are we going up or down?
  let goingUp = updatedIndex > oldIndex
  // Swap the order with the one next to it.
  if (goingUp) {
    // Swap with the one behind it, if it exists
    if (directories[updatedIndex - 1]) {
      directories[updatedIndex].order = directories[updatedIndex - 1].order
    }
  } else {
    // Swap with the one in front of it, if it exists
    if (directories[updatedIndex + 1]) {
      directories[updatedIndex].order = directories[updatedIndex + 1].order
    }
  }

  // Between the updated index and the old index update the hierarchies
  if (goingUp) {
    for (let i = oldIndex; i < updatedIndex; i++) {
      directories[i].order -= 1
    }
  } else {
    for (let i = oldIndex; i > updatedIndex; i--) {
      directories[i].order += 1
    }
  }
}
