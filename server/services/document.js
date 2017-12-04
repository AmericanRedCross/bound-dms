const mammoth = require('mammoth')
const db = require('../models/index')

module.exports = {
  convertDocxToMarkdown (fileBuffer) {
    return new Promise((resolve, reject) => {
      mammoth.convertToMarkdown({
        buffer: fileBuffer
      }, {
        ignoreEmptyParagraphs: false
      }).then((result) => {
        if (!result) {
          console.error('failed to convert docx document')
          reject()
        }
        resolve(result.value)
      }).done()
    })
  },
  getProjectTranslationPercentage (project) {
    return db.sequelize.query(`
      SELECT pl.code AS language, FLOOR((COALESCE(trans.count, 0) / (
        SELECT COUNT(*)
        FROM DocumentTranslations dt
        JOIN Documents d ON d.id = dt.documentId
        WHERE language = ? AND d.projectId = ?)) * 100) AS percentage
      FROM ProjectLanguages pl
      LEFT JOIN (
        SELECT dt.language AS lang, COUNT(*) AS count
        FROM DocumentTranslations dt
        JOIN Documents d on d.id = dt.documentId
        JOIN Projects p ON p.id = d.projectId
        WHERE d.projectId = ? AND dt.language <> ?
        GROUP BY dt.language
      ) AS trans ON pl.code = trans.lang
      WHERE pl.projectId = ? AND pl.code <> ?`, {
        replacements: [
          project.baseLanguage,
          project.id,
          project.id,
          project.baseLanguage,
          project.id,
          project.baseLanguage
        ],
        type: db.sequelize.QueryTypes.SELECT
      }).then((result) => {
        return result.map((item) => {
          return {
            language: item.language,
            percentage: parseFloat(item.percentage)
          }
        })
      })
  },
  countUntranslatedDocs (project) {
    return db.sequelize.query(`
      SELECT language, COUNT(*) AS translations FROM
      DocumentTranslations dt
      JOIN Documents d ON d.id = dt.documentId
      WHERE d.projectId = ?
      GROUP BY dt.language
      HAVING translations < (
        SELECT COUNT(*)
        FROM DocumentTranslations
        WHERE language = ?
      )`, {
        replacements: [project.id, project.baseLanguage],
        type: db.sequelize.QueryTypes.SELECT
      }).then((result) => {
        return result
      })
  },
  countOldRevisions (project) {
    return db.sequelize.query(`
      SELECT DISTINCT dt.language, COUNT(*) as translations
      FROM DocumentTranslations dt
      JOIN (
        SELECT documentId, revision FROM DocumentTranslations WHERE language = 'en'
      ) sub
      ON dt.documentId = sub.documentId AND dt.revision < sub.revision
      GROUP BY dt.language
    `).then((result) => {
      return result[0]
    })
  }
}
