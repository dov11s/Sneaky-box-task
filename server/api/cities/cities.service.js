const pool = require("../../config/database.js");

module.exports = {
  creatCity: (data, callBack) => {
    pool.query(
      `INSERT INTO data(code, name, description) VALUES(?, ?, ?)`,
      [data.code, data.name, data.description],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getCities: (callBack) => {
    pool.query(`SELECT * from data`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }

      return callBack(null, results);
    });
  },
  getCitysByID: (id, callBack) => {
    pool.query(
      `SELECT * from data WHERE code = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteCity: (id, callBack) => {
    pool.query(
      `DELETE FROM data WHERE code = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
