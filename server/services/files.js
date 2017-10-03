const sharp = require('sharp')
const File = require('../models').File
const config = require('../config')
const path = require('path')
const User = require('../models').User
const Directory = require('../models').Directory

module.exports = () => {
  return {
    generateThumbnails: (source) => {
      const image = sharp(source)

      let filename = path.basename(source).replace(/\.[^/.]+$/, '')
      let extension = path.basename(source).match(/\.[^/.]+$/)

      return Promise.all(
        config.uploads.thumbnails.sizes.map((size, index) => {
          let thumbFilename = filename + '-' + size + extension

          return image
            .resize(size)
            .toFile(path.join(config.uploads.directory, thumbFilename))
            .then((thumb) => {
              return {
                filename: thumbFilename,
                isSystemThumbnail: (index === 0)
              }
            })
            .catch((err) => {
              console.log('thumbnail generation failed: ' + err)
              return false
            })
        })
      )
    },
    persist: (file) => {
      return File.create(file)
    },
    getForProjectId: (page, limit, projectId, filter) => {
      let offset = page - 1
      if (offset > 0) {
        offset = (limit * offset)
      }
      let whereClause = {
        projectId: projectId,
        parentId: null
      }
      if (filter) {
        whereClause.title = {
          $like: '%' + filter + '%'
        }
      }
      return File.findAndCount({
        where: whereClause,
        include: [
          {
            model: User,
            as: 'createdBy',
            attributes: User.safeAttributes()
          },
          {
            as: 'Children',
            model: File,
            required: false
          },
          {
            model: Directory,
            as: 'Directory',
            required: false
          }
        ],
        limit: limit,
        offset: offset,
        distinct: true,
        order: [
          ['createdAt', 'DESC']
        ]
      })
    },
    getById: (id) => {
      return File.findById(id)
    },
    update: (file, params) => {
      return file.update(params, {fields: File.massAssignable()})
    }
  }
}
