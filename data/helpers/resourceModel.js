const db = require("../dbConfig.js");

module.exports = {
  get,
  getById,
  add,
  update,
  remove
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

function update(id, changes) {
    return db("resources")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  }
  
  function remove(id) {
    return db("resources")
      .where("id", id)
      .del();
  }