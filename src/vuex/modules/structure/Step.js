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
      steps = [],
      critical = false
    }
  ) {
    this._id = id
    this._title = title
    this._hierarchy = hierarchy
    this._content = content // Maybe its own object?
    this._attachments = attachments // Loop through and declare each object
    this._steps = steps // loop through and declare each object
    this._critical = critical
  }

  // Getters and Setters
  // ID
  get id () { return this._id }

  // Title
  set title (title) { this._title = title }
  get title () { return this._title }

  // Hierarchy
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

  // critical
  set critical (critical) { this._critical = critical }
  get critical () { return this._critical }

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
      if (step.hierarchy === null) {
        // Get next hierachy
        step.hierarchy = this.getHighestChildhierarchy()
      }
      if (index > this._steps.length) {
        this.addStep(step)
      } else {
        this._steps.splice(index, 0, step)
      }
      // Sort
      this.sortSteps()
    }
  }

  sortSteps () {
    this._steps.sort((a, b) => {
      if (a.hierarchy < b.hierarchy) {
        return -1
      } else if (a.hierarchy > b.hierarchy) {
        return 1
      }

      return 0
    })
  }

  /**
   * [getHighestChildhierarchy description]
   * @return {[type]} [description]
   */
  getHighestChildhierarchy () {
    let hierarchy = 1
    this._steps.forEach((step) => {
      if (step.hierarchy >= hierarchy) {
        hierarchy = step.hierarchy + 1
      }
    })
    return hierarchy
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

Step.updateHierarchy = (updatedIndex, oldIndex, steps) => {
  // Are we going up or down?
  let goingUp = updatedIndex > oldIndex
  // Swap the hierarchy with the one next to it.
  if (goingUp) {
    // Swap with the one behind it, if it exists
    if (steps[updatedIndex - 1]) {
      steps[updatedIndex].hierarchy = steps[updatedIndex - 1].hierarchy
    }
  } else {
    // Swap with the one in front of it, if it exists
    if (steps[updatedIndex + 1]) {
      steps[updatedIndex].hierarchy = steps[updatedIndex + 1].hierarchy
    }
  }

  // Between the updated index and the old index update the hierarchies
  if (goingUp) {
    for (let i = oldIndex; i < updatedIndex; i++) {
      steps[i].hierarchy -= 1
    }
  } else {
    for (let i = oldIndex; i > updatedIndex; i--) {
      steps[i].hierarchy += 1
    }
  }
}
