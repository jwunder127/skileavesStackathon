'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Mountain = db.define('mountains', {
  name: Sequelize.STRING,
  lift_count: Sequelize.INTEGER,
  run_count: Sequelize.INTEGER,
  opening_year: Sequelize.INTEGER,
  hourly_lift_capacity: Sequelize.INTEGER,
  official_website: Sequelize.STRING,
  owner: Sequelize.STRING,
  longest_run: Sequelize.INTEGER,
  skiable_acreage: Sequelize.INTEGER,
  annual_snowfall: Sequelize.INTEGER,
  terrain_park: Sequelize.STRING,
  operating_status: Sequelize.STRING,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT,
  top_elevation: Sequelize.INTEGER,
  bottom_elevation: Sequelize.INTEGER

})

module.exports = Mountain
