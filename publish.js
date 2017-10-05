const Publish = require('./server/models').Publish
const PublishTask = require('./server/services/publish/publishTask')
const BundleArchive = require('./server/services/publish/bundleArchive')
const path = require('path')
const config = require('./server/config')

const scheme = config.enableHttps ? 'https://' : 'http://'
const url = [scheme, config.systemHostname].join('')

const args = process.argv.slice(2)
const projectId = parseInt(args[0]) || 1
const language = args[1] || 'en'

// Configure bundle
const archive = new BundleArchive({
  host: url,
  publishDir: config.publish.directory
})

const task = new PublishTask(archive, {
  projectId: projectId,
  language: language
})

task.start().then((publishData) => {
  // Log the publish
  return Publish.create({
    projectId: projectId,
    language: language,
    type: 'bundleArchive',
    filePath: path.basename(publishData.filePath)
  }).then((pub) => {
    console.log(pub.toJSON())
    process.exit()
  })
}).catch(err => {
  console.error(err)
  process.exit()
})
