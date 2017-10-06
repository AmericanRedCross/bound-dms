const EventEmitter = require('events').EventEmitter
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()
const History = require('../models').History

const actions = {
  created: 'created',
  updated: 'updated',
  deleted: 'deleted'
}

const entities = {
  apikey: 'apikey',
  directory: 'directory',
  directoryTranslation: 'directoryTranslation',
  document: 'document',
  documentTranslation: 'documentTranslation',
  file: 'file',
  language: 'language',
  metatype: 'metatype',
  project: 'project',
  publish: 'publish',
  user: 'user'
}

// ApiKeys

myEmitter.on('event:apiKeyCreated', (id, userId) => {
  History.create({
    action: actions.created,
    userId: userId,
    entity: entities.apikey,
    entityId: id
  })
})

myEmitter.on('event:directoryUpdated', (id, userId, changes) => {
  History.create({
    action: actions.updated,
    userId: userId,
    entity: entities.apikey,
    entityId: id,
    changes: changes
  })
})

myEmitter.on('event:apiKeyDeleted', (id, userId) => {
  History.create({
    action: actions.deleted,
    userId: userId,
    entity: entities.apikey,
    entityId: id
  })
})

// Directory

myEmitter.on('event:directoryCreated', (id, userId) => {
  History.create({
    action: actions.created,
    userId: userId,
    entity: entities.directory,
    entityId: id
  })
})

myEmitter.on('event:directoryUpdated', (id, userId, changes) => {
  History.create({
    action: actions.updated,
    userId: userId,
    entity: entities.directory,
    entityId: id,
    changes: changes
  })
})

myEmitter.on('event:directoryDeleted', (id, userId) => {
  History.create({
    action: actions.deleted,
    userId: userId,
    entity: entities.directory,
    entityId: id
  })
})

myEmitter.on('event:directoryTranslationCreated', (id, userId) => {
  History.create({
    action: actions.created,
    userId: userId,
    entity: entities.directoryTranslation,
    entityId: id
  })
})

myEmitter.on('event:directoryTranslationUpdated', (id, userId, changes) => {
  History.create({
    action: actions.updated,
    userId: userId,
    entity: entities.directoryTranslation,
    entityId: id,
    changes: changes
  })
})

// Document

myEmitter.on('event:documentCreated', (id, userId) => {
  History.create({
    action: actions.created,
    userId: userId,
    entity: entities.document,
    entityId: id,
  })
})

myEmitter.on('event:documentUpdated', (id, userId, changes) => {
  History.create({
    action: actions.updated,
    userId: userId,
    entity: entities.document,
    entityId: id,
    changes: changes
  })
})

myEmitter.on('event:documentDeleted', (id, userId) => {
  History.create({
    action: actions.deleted,
    userId: userId,
    entity: entities.document,
    entityId: id
  })
})

myEmitter.on('event:documentTranslationCreated', (id, userId) => {
  History.create({
    action: actions.created,
    userId: userId,
    entity: entities.documentTranslation,
    entityId: id
  })
})

myEmitter.on('event:documentTranslationUpdated', (id, userId, changes) => {
  History.create({
    action: actions.updated,
    userId: userId,
    entity: entities.documentTranslation,
    entityId: id,
    changes: changes
  })
})

myEmitter.on('event:documentTranslationDeleted', (id, userId) => {
  History.create({
    action: actions.deleted,
    userId: userId,
    entity: entities.documentTranslation,
    entityId: id
  })
})

// Files

myEmitter.on('event:fileCreated', (fileId, userId) => {
  History.create({
    action: actions.created,
    userId: userId,
    entity: entities.file,
    entityId: fileId
  })
})

myEmitter.on('event:fileUpdated', (fileId, userId, changes) => {
  History.create({
    action: actions.updated,
    userId: userId,
    entity: entities.file,
    entityId: fileId,
    changes: changes
  })
})

// Languages

myEmitter.on('event:languageCreated', (id, userId) => {
  History.create({
    action: actions.created,
    userId: userId,
    entity: entities.language,
    entityId: id
  })
})

myEmitter.on('event:languageDeleted', (id, userId) => {
  History.create({
    action: actions.deleted,
    userId: userId,
    entity: entities.language,
    entityId: id
  })
})

// Metatypes

myEmitter.on('event:metatypeCreated', (id, userId) => {
  History.create({
    action: actions.created,
    userId: userId,
    entity: entities.metatype,
    entityId: id
  })
})

// Project

myEmitter.on('event:projectCreated', (id, userId) => {
  History.create({
    action: actions.created,
    userId: userId,
    entity: entities.project,
    entityId: id
  })
})

myEmitter.on('event:projectUpdated', (id, userId, changes) => {
  History.create({
    action: actions.updated,
    userId: userId,
    entity: entities.project,
    entityId: id,
    changes: changes
  })
})

myEmitter.on('event:projectDeleted', (id, userId) => {
  History.create({
    action: actions.deleted,
    userId: userId,
    entity: entities.project,
    entityId: id
  })
})

// Publish

myEmitter.on('event:publishCreated', (id, userId) => {
  History.create({
    action: actions.updated,
    userId: userId,
    entity: entities.publish,
    entityId: id
  })
})

// Users

myEmitter.on('event:userCreated', (id, userId) => {
  History.create({
    action: actions.created,
    userId: userId,
    entity: entities.user,
    entityId: id
  })
})

myEmitter.on('event:userUpdated', (id, userId, changes) => {
  History.create({
    action: actions.updated,
    userId: userId,
    entity: entities.user,
    entityId: id,
    changes: changes
  })
})

myEmitter.on('event:userPasswordChange', (id, userId) => {
  History.create({
    action: actions.updated,
    userId: userId,
    entity: entities.user,
    entityId: id
  })
})

myEmitter.on('event:userDeleted', (id, userId) => {
  History.create({
    action: actions.deleted,
    userId: userId,
    entity: entities.user,
    entityId: id
  })
})

module.exports = myEmitter
