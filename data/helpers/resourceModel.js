const db = require("../dbConfig.js");

module.exports = {
  get,
  getById,
  add
};

function get() {
  return db("resources");
}

function getById(id) {
  return db("resources")
    .where({ id })
    .first();
}

async function add(hub) {
  const [id] = await db("resources").insert(hub);

  return getById(id);
}
