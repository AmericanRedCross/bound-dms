module.exports = {
  transform: (directory) => {

    let metadata = {}
    directory.metatypes.forEach((metatype, index) => {

      let value = metatype.MetaValue.value
      if (metatype.type === 'boolean') {
        value = (value === '1')
      } else if (metatype.type === 'integer') {
        value = parseInt(value)
      }
      metadata[metatype.key] = value
    })

    return {
      id: directory.id,
      projectId: directory.projectId,
      parentId: directory.parentId,
      order: directory.order,
      createdAt: directory.createdAt,
      updatedAt: directory.updatedAt,
      createdBy: directory.createdBy,
      directories: directory.directories,
      translations: directory.translations,
      metadata: metadata
    }
  }
}
