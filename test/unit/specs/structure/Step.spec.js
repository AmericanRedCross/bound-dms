import { Directory } from '../../../../src/vuex/modules/structure/Directory'
import { DirectoryTranslation } from '../../../../src/vuex/modules/structure/DirectoryTranslation'
import { File } from '../../../../src/vuex/modules/file/File'

describe('Directory Object Creation', () => {
  it('Create a new directory', () => {
    let newDirectory = new Directory({})
    expect(newDirectory).to.be.an('object')
  })

  it('Has the correct properties', () => {
    let newDirectory = new Directory({})
    expect(newDirectory).to.have.property('id')
    expect(newDirectory).to.have.property('order')
    expect(newDirectory).to.have.property('files')
    expect(newDirectory).to.have.property('directories')
    expect(newDirectory).to.have.property('translations')
  })

  it('Has the correct propery values', () => {
    let id = 1
    let order = 1
    let files = [new File({})]
    let directories = [new Directory({})]
    let translations = [new DirectoryTranslation({language: 'en', title: 'Here is a title'})]
    let newDirectory = new Directory({
      id,
      order,
      files,
      directories,
      translations
    })

    expect(newDirectory.id).to.equal(id)
    expect(newDirectory.order).to.equal(order)
    expect(newDirectory.files).to.equal(files)
    expect(newDirectory.directories).to.equal(directories)
    expect(newDirectory.translations).to.equal(translations)
  })
})

describe('Translations', () => {
  it('Can retrieve a translation title', () => {
    let id = 1
    let aTranslation = new DirectoryTranslation({language: 'en', title: 'Here is a title'})
    let translations = [aTranslation]
    let newDirectory = new Directory({
      id,
      translations
    })

    expect(newDirectory.id).to.equal(id)
    expect(newDirectory.translations).to.equal(translations)

    let englishTranslation = newDirectory.getTitleByLangCode('en')
    expect(englishTranslation).to.equal(aTranslation)
  })

  it('Can replace a translation title', () => {
    let id = 1
    let aTranslation = new DirectoryTranslation({language: 'en', title: 'Here is a title'})
    let replaceTranslation = new DirectoryTranslation({language: 'en', title: 'Here is a title another title'})
    let translations = [aTranslation]
    let newDirectory = new Directory({
      id,
      translations
    })

    expect(newDirectory.id).to.equal(id)
    expect(newDirectory.translations).to.equal(translations)

    newDirectory.updateTranslation(replaceTranslation)

    let englishTranslation = newDirectory.getTitleByLangCode('en')

    expect(englishTranslation.title).to.equal(replaceTranslation.title)
    expect(englishTranslation.language).to.equal(replaceTranslation.language)
  })
})
