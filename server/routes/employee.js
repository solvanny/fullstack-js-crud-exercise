const router = require("express").Router();
const { callAsync } = require("../helpers");
const Employee = require("../models/employee");

// List all users
router.get(
  "/:page?",
  callAsync(async (req, res) => {
    let result = await Employee.fetchPage({
      pageSize: 7,
      page: req.params.page || 1
    });
    if (result.isEmpty()) {
      res.status(404).json({ message: "Empty set" });
    } else {
      res.json({
        employees: result.models,
        pagination: result.pagination
      });
    }
  })
);

// get user by id
router.get(
  "/view/:id",
  callAsync(async (req, res) => {
    let result = await Employee.where({ id: req.params.id }).fetch();

    if (result !== null) {
      res.json(result.toJSON());
    } else {
      res.status(404).json({ message: "Not found" });
    }
  })
);

// create new user
router.post(
  "/",
  callAsync(async (req, res) => {
    let employee = new Employee(req.body.user);
    let result = await employee.save();

    if (result) {
      res.json(result);
    } else {
      res.status(500).json({ error: "Error saving" });
    }
  })
);

// update user by id
router.put(
  "/:id",
  callAsync(async (req, res) => {
    let employee = await Employee.where({ id: req.params.id }).fetch();
    if (employee) {
      let result = await employee.set(req.body.user).save();
      if (result) {
        res.json(result);
      }
    } else {
      res.status(500).json({ error: "Error updating" });
    }
  })
);

// delete user by id
router.delete(
  "/:id",
  callAsync(async (req, res) => {
    let employee = await Employee.where({ id: req.params.id }).fetch();
    if (employee) {
      let result = await employee.destroy();
      if (result) {
        res.json({ message: "Success" });
      }
    } else {
      res.status(500).json({ error: "Error deleting" });
    }
  })
);

module.exports = router;
