const express = require("express");
const proDB = require("../data/helpers/projectModel");
const router = express.Router();

//perform CRUD

//GET (read)- all projects
router.get("/", (req, res) => {
  proDB
    .get()
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "unable to pull projects", err });
    });
});

//GET list of actions for a project
router.get("/:id/actions", (req, res) => {
  const project_id = req.params.id;
  proDB
    .getProjectActions(project_id)
    .then(info => {
      if (!project_id) {
        res
          .status(404)
          .json({ errorMessage: "Project with specified ID not found" });
      } else {
        res.status(200).json(info);
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "project action data could not be found",
        err
      });
    });
});

//POST (create) - make a new project
router.post("/", (req, res) => {
  const newProj = req.body;
  proDB
    .insert(newProj)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "An error occurred and new project was not created",
        err
      });
    });
});

//PUT (update) - update a project - id required
router.put("/:id", (req, res) => {
  const project_id = req.params.id;
  const body = req.body;

  proDB
    .update(project_id, body)
    .then(revPro => {
      if (!project_id) {
        res
          .status(404)
          .json({ errorMessage: "Specified project id not found" });
      } else if (!req.body.name || !req.body.description) {
        res.status(400).json({
          errorMessage: "Project name and description are required for update"
        });
      } else {
        res.status(200).json(revPro);
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Project update could not be completed",
        err
      });
    });
});

//Delete - remove a project - id required
router.delete("/:id", (req, res) => {
  const project_id = req.params.id;

  proDB
    .remove(project_id)
    .then(remPro => {
      if (!project_id) {
        res
          .status(404)
          .json({ errorMessage: "Specified project id not found" });
      } else {
        res.status(200).json(remPro);
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Project could not be removed",
        err
      });
    });
});

module.exports = router;
