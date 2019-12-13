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
  if (!req.body.name || req.body.name === "") {
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
  if (!req.body.name || req.body.name === "") {
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
  if (!req.body.description || req.body.description === "") {
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

router.delete("/:id", (req, res) => {
  Project.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The project has been nuked" });
      } else {
        res.status(404).json({ message: "The project could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the project"
      });
    });
});

router.delete("/resources/:id", (req, res) => {
  Resource.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The resource has been nuked" });
      } else {
        res.status(404).json({ message: "The resource could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the resource"
      });
    });
});

router.delete("/tasks/:id", (req, res) => {
  Task.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The task has been nuked" });
      } else {
        res.status(404).json({ message: "The task could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the task"
      });
    });
});

router.put("/:id", (req, res) => {
  Project.update(req.params.id, req.body)
    .then(updatedProject => {
      if (updatedProject) {
        res.status(200).json(updatedProject);
      } else {
        res.status(404).json({ message: "The project could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the project"
      });
    });
});

router.put("/resources/:id", (req, res) => {
  Resource.update(req.params.id, req.body)
    .then(updatedResource => {
      if (updatedResource) {
        res.status(200).json(updatedResource);
      } else {
        res.status(404).json({ message: "The resource could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the resource"
      });
    });
});

router.put("/tasks/:id", (req, res) => {
  Task.update(req.params.id, req.body)
    .then(updatedTask => {
      if (updatedTask) {
        res.status(200).json(updatedTask);
      } else {
        res.status(404).json({ message: "The task could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the task"
      });
    });
});

module.exports = router;
