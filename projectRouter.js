const express = require("express");

const Project = require("./data/helpers/projectModel");
const Task = require("./data/helpers/taskModel");
const Resource = require("./data/helpers/resourceModel");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    Project.get()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error retrieving the projects." });
      });
  });

  router.post("/", (req, res) => {
    if (
      !req.body.name ||
      req.body.name === "" 
    ) {
      res.status(400).json({ message: "missing project name." });
    } else {
      Project.insert(req.body)
        .then(newProject => {
          res.status(201).json(newProject);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Error adding the project." });
        });
    }
  });

  router.get("/resources", (req, res) => {
    Resource.get()
      .then(resources => {
        res.status(200).json(resources);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error retrieving the resources." });
      });
  });

  router.post("/resources", (req, res) => {
    if (
      !req.body.name ||
      req.body.name === ""
    ) {
      res.status(400).json({ message: "missing resource name." });
    } else {
      Resource.add(req.body)
        .then(newResource => {
          res.status(201).json(newResource);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Error adding the resource." });
        });
    }
  });

  router.get("/:id/tasks", (req, res) => {
    Project.getProjectTasks(req.params.id)
      .then(tasks => {
        res.status(200).json(tasks);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error retrieving the tasks." });
      });
  });

  router.post("/tasks", (req, res) => {
    if (
      !req.body.description ||
      req.body.description === ""
    ) {
      res.status(400).json({ message: "missing task description." });
    } else {
      Task.insert(req.body)
        .then(task => {
          res.status(201).json(task);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Error adding the task." });
        });
    }
  });

  module.exports = router;