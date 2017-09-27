const sharp = require('sharp')
const File = require('../models').File
const config = require('../config')
const path = require('path')
const User = require('../models').User

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
            .toFile('/uploads/' + thumbFilename)
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
    getAll: (page, limit) => {

      let offset = 0
      if (page > 1) {
        offset = limit * page
      }

      return File.findAndCount({
        where: {
          parentId: null
        },
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
          }
        ],
        limit: limit,
        offset: offset,
        distinct: true,
        order: [
          ['createdAt', 'DESC']
        ]
      })
    }
  }
}
