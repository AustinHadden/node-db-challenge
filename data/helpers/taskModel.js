const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
  get: function(id) {
    let query = db("tasks");

    if (id) {
      return query
        .where("id", id)
        .first()
        .then(task => {
          if (task) {
            return mappers.taskToBody(task);
          } else {
            return task;
          }
        });
    }

    return query.then(tasks => {
      return tasks.map(task => mappers.taskToBody(task));
    });
  },
  insert: function(task) {
    return db("tasks")
      .insert(task)
      .then(([id]) => this.get(id));
  },
  update: function(id, changes) {
    return db("tasks")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  },
  remove: function(id) {
    return db("tasks")
      .where("id", id)
      .del();
  }
};
