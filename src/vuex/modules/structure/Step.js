import { Attachment } from './Attachment'

// Spec: https://gist.github.com/rjbaker/8d9a4b6a7ca2bc0fe4fa9325cdf64702
export class Step {
  constructor (
    {
      id = null,
      title = null,
      hierarchy = null,
      content = '# Markdown Content',
      attachments = [],
      steps = []
    }
  ) {
    this._id = id
    this._title = title
    this._hierarchy = hierarchy
    this._content = content // Maybe its own object?
    this._attachments = attachments // Loop through and declare each object
    this._steps = steps // loop through and declare each object
  }

  // Getters and Setters
  // ID
  get id () { return this._id }

  // Title
  set title (title) { this._title = title }
  get title () { return this._title }

  // Heirarchy
  set hierarchy (hierarchy) { this._hierarchy = hierarchy }
  get hierarchy () { return this._hierarchy }

  // Content
  set content (content) { this._content = content }
  get content () { return this._content }

  // attachments
  set attachments (attachments) { this._attachments = attachments }
  get attachments () { return this._attachments }

  // steps
  set steps (steps) { this._steps = steps }
  get steps () { return this._steps }

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
   * [addStep description]
   * @param {Step} [step=new Step()] [description]
   */
  addStep (step = new Step({})) {
    if (step) {
      this._steps.push(step)
    }
  }

  /**
   * [addStepAtIndex description]
   * @param {Step}   [step=new Step({})]     [description]
   * @param {[type]} index     [description]
   */
  addStepAtIndex ({step = new Step({}), index}) {
    if (step && index >= 0) {
      if (index > this._steps.length) {
        this.addStep(step)
      } else {
        this._steps.splice(index, 0, step)
      }
    }
  }

  /**
   * [removeStepById description]
   * @param  {Number} id [description]
   * @return {[type]}    [description]
   */
  removeStepById (id) {
    if (id) {
      let index = this._steps.findIndex((step) => {
        return step.id === id
      })

      if (index > -1) {
        this._steps.splice(index, 1)
      }
    }
  }
}
