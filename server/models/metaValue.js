module.exports = (sequelize, DataTypes) => {
  const MetaValue = sequelize.define('MetaValue', {
    metaTypeId: {
      type: DataTypes.INTEGER,
      unique: 'metaTypeId_entity_entityId'
    },
    entity: {
      type: DataTypes.STRING,
      unique: 'metaTypeId_entity_entityId'
    },
    entityId: {
      type: DataTypes.INTEGER,
      unique: 'metaTypeId_entity_entityId',
      references: null
    },
    value: {
      type: DataTypes.STRING
    }
  })

  return MetaValue
}
