const express = require("express");
const actionDB = require("../data/helpers/actionModel");
const router = express.Router();

//Do CRUD but actually do stuff

//GET all action by id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  actionDB
    .get(id)
    .then(actID => {
      if (!id) {
        res
          .status(404)
          .json({ errorMessage: "No action found with specified id" });
      } else {
        res.status(200).json(actID);
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Action could not be found", err });
    });
});

//POST - create a new action
router.post("/", (req, res) => {
  const id = req.params.id;

  actionDB
    .insert(id)
    .then(newAct => {
      res.status(200).json(newAct);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "An error occurred while creating the action",
        err
      });
    });
});

//PUT - update an action - need id
router.put("/:id", (req, res) => {
  const project_id = req.params.id;

  actionDB
    .update(project_id)
    .then(actUp => {
      if (!project_id) {
        res
          .status(404)
          .json({ errorMessage: "Action with specific id does not exist" });
      } else {
        res.status(200).json({ actUp });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Action could not be updated",
        err
      });
    });
});

//DELETE - remove an action - id required
router.delete("/:id", (req, res) => {
  const project_id = req.params.id;

  actionDB
    .update(project_id)
    .then(remAct => {
      if (!project_id) {
        res
          .status(404)
          .json({ errorMessage: "Action with specific id does not exist" });
      } else {
        res.status(200).json({ remAct });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Action could not be removed",
        err
      });
    });
});
