const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
  get,
  insert,
  update,
  remove,
  getProjectTasks
};

function get(id) {
  let query = db("projects as p");

  if (id) {
    query.where("p.id", id).first();

    const promises = [query, this.getProjectTasks(id)];

    return Promise.all(promises).then(function(results) {
      let [project, tasks] = results;

      if (project) {
        project.tasks = tasks;

        return mappers.projectToBody(project);
      } else {
        return null;
      }
    });
  }

  return query.then(projects => {
    return projects.map(project => mappers.projectToBody(project));
  });
}

function insert(project) {
  return db("projects")
    .insert(project)
    .then(([id]) => this.get(id));
}

function update(id, changes) {
  return db("projects")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? this.get(id) : null));
}

function remove(id) {
  return db("projects")
    .where("id", id)
    .del();
}

function getProjectTasks(projectId) {
  return db("tasks as t")
    .select("p.name as Project Name", "p.description as Project Description", "t.description as task description", "t.notes", "t.completed")
    .join("projects as p", "t.project_id", "p.id")
    .where("project_id", projectId)
    .then(tasks => tasks.map(task => mappers.taskToBody(task)));
}
