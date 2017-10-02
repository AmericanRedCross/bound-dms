const BundleArchive = require('./server/services/publish/bundleArchive')
const Directory = require('./server/models').Directory
const DirectoryTrans = require('./server/models').DirectoryTranslation
const Document = require('./server/models').Document
const DocumentTrans = require('./server/models').DocumentTranslations
const args = process.argv.slice(2)

const projectId = parseInt(args[0]) || 1
const language = args[1] || 'en'

const archive = new BundleArchive()

Directory.findAll({
  where: {
    projectId: projectId
  },
  include: [{
    model: DirectoryTrans,
    as: 'translations',
    attributes: ['title', 'language']
  },
  {
    model: Document,
    as: 'documents',
    attributes: ['id'],
    include: [{
      model: DocumentTrans,
      as: 'translations',
      attributes: {exclude: ['content']},
      where: {language: language}
    }]
  }]
}).then((data) => {
  const flatData = data.map(dir => dir.toJSON())
  console.log(archive.buildStructure(archive.buildDirectoryJson(flatData, language)))
  //archive.setDirectoryData(flatData)
  //console.log(archive.buildStructure(flatData)[0].documents)

  //console.log(archive._directoryData)
  process.exit()
}).catch(err => {
  console.error(err)
  process.exit()
})
