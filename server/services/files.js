const sharp = require('sharp')
const File = require('../models').File
const config = require('../config')
const path = require('path')
const User = require('../models').User
const Directory = require('../models').Directory
const archiver = require('archiver')
const db = require('../models/index')

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
            as: 'children',
            model: File,
            required: false
          },
          {
            model: Directory,
            as: 'directory',
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
    },
    getForProjectWithLanguage (projectId, language) {
      return File.findAll({
        where: {
          projectId: projectId,
          parentId: null,
          $or: [
            {
              code: null
            },
            {
              code: language
            }
          ]
        }
      })
    },
    getForProjectWithLanguageAndDirectoryMeta (projectId, language, metaKey, metaValue) {
      return db.sequelize.query(`SELECT Files.id, Files.title, Files.filename FROM Files
        JOIN Directories ON Files.directoryId = Directories.id
        JOIN MetaValues ON Directories.id = MetaValues.entityId AND MetaValues.entity = 'directory'
        JOIN Metatypes ON MetaValues.metaTypeId = Metatypes.id AND Metatypes.key = ? AND MetaValues.value = ?
        WHERE Files.projectId = ? AND Files.parentId IS NULL AND Files.code IS NULL OR Files.code = ?`,
        {
          replacements: [metaKey, metaValue, projectId, language],
          type: db.sequelize.QueryTypes.SELECT
        })
    },
    streamZipArchive (files, res) {
      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      })

      archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
          console.error('Missing archive file' + err)
        } else {
          throw err
        }
      })

      archive.pipe(res)

      files.forEach((file) => {
        const filePath = path.join(config.uploads.directory, file.filename)
        const name = file.title.split(' ').join('_') + path.extname(filePath)
        archive.file(filePath, { name: name })
      })

      archive.finalize()
      return
    }
  }
}
