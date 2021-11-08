const db = require('../models');
const sequelize = db.sequelize;
module.exports = {
  index: async (req, res) => {
    try {
      const value = await db.buyer.findAll()
      return res.json(value)
    } catch (e) {
      return res.status(500).json({ message: 'Cannot get data from database.' })
    }
  },
  store: async (req, res) => {
    const data = req.body
    if (data) {
      try {
        const oldName = await db.buyer.findOne({
          where: sequelize.where(
            sequelize.fn('lower', sequelize.col('name')),
            sequelize.fn('lower', data.name)
          )
        })
        if (oldName) {
          return res.status(200).json({ success: false, message: 'Name already exist. Pleasy try again' })
        }
        const value = await db.sequelize.transaction((t) => {
          return db.buyer.create(data, { transaction: t })
        })
        return res.status(201).json({ success: true, message: 'Buyer Created Successfully', value })
      } catch (e) {
        return res.status(500).json({ success: false, message: 'Cannot store data to database.' })
      }
    }
    return res.status(400).json({ message: 'Bad request.' })
  },
  update: async (req, res) => {
    const id = req.params.id
    const data = req.body
    if (id && data) {
      const result = await db.buyer.update(data, { where: { id: id } })
      return res.json({ success: true, message: 'Buyer Update Successfully ', result })
    }
    return res.status(400).json({ success: false, message: 'Bad request.' })
  },
  destroy: async (req, res) => {
    const id = req.params.id
    if (id) {
      try {
        await db.buyer.destroy({ where: { id } })
        return res.send({ success: true, message: 'Delete Buyer Successfully' });
      } catch (e) {
        return res.status(500).json({ success: false, message: 'Cannot remove data from database.' })
      }
    } else {
      return res.status(400).json({ success: false, message: 'Bad request.' })
    }
  }
}