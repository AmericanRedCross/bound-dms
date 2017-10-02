const BundleArchive = require('./server/services/publish/bundleArchive')
const Directory = require('./server/models').Directory
const DirectoryTrans = require('./server/models').DirectoryTranslation
const Metatype = require('./server/models').Metatype
const File = require('./server/models').File
const Document = require('./server/models').Document
const DocumentTrans = require('./server/models').DocumentTranslations
const Publish = require('./server/models').Publish
const path = require('path')
const args = process.argv.slice(2)

const projectId = parseInt(args[0]) || 1
const language = args[1] || 'en'

const archive = new BundleArchive({
  publishDir: path.join(__dirname, '/static/publishes')
})

Directory.findAll({
  where: {
    projectId: projectId
  },
  include: [{
    model: DirectoryTrans,
    as: 'translations',
    attributes: ['title', 'language']
  }, {
    model: Metatype,
    as: 'metatypes'
  }, {
    model: File,
    as: 'files'
  }, {
    model: Document,
    as: 'documents',
    attributes: ['id'],
    include: [{
      model: DocumentTrans,
      as: 'translations',
      where: {language: language}
    }]
  }]
}).then((data) => {
  const flatData = data.map(dir => dir.toJSON())
  archive.setData(flatData)
  archive.buildStructure(archive.buildDirectoryJson(language))
  const archivePath = archive.createBundleFile(language)

  if (archivePath) {
    Publish.create({
      projectId: projectId,
      language: language,
      type: 'bundleArchive',
      filePath: path.basename(archivePath)
    }).then((pub) => {
      console.log(pub.toJSON())
      process.exit()
    })
  } else {
    console.error('Bundle archive failed')
    process.exit()
  }
}).catch(err => {
  console.error(err)
  process.exit()
})
