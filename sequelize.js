const { Sequelize, DataTypes } = require('sequelize');

// Konfigurasi koneksi Sequelize dengan SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database_sequelize.sqlite', // Sesuaikan dengan lokasi file SQLite Anda
});

// Definisikan model menggunakan Sequelize
const SequelizeModel = sequelize.define('SequelizeModel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

SequelizeModel.sync({ force: false }) // Buat tabel jika belum ada

// Method untuk operasi CRUD dengan Sequelize
const create = async (name) => {
  return await SequelizeModel.create({ name });
};

const read = async (id) => {
  return await SequelizeModel.findOne({ where: { id } });
};

const update = async (id, newName) => {
  return await SequelizeModel.update({ name: newName }, { where: { id } });
};

const destroy = async (id) => {
  return await SequelizeModel.destroy({ where: { id } });
};


module.exports = {
  create,
  read,
  update,
  destroy,
}
