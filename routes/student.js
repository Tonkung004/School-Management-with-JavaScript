const express = require("express");
const router = express();

const {
  list,
  read,
  create,
  update,
  remove,
  form,
  formUpdate,
} = require("../Controllers/student");
const validate = require("../middleware/validate");
//CRUD
router.get("/", (req, res) => {
  res.render("index", { title: "Welcome" });
});
router.get("/student/list", list);
router.get("/student/read/:id", read);
router.post(
  "/student/create",
  validate.required("idStd"),
  validate.lengthAbove("idStd", 10),
  validate.required("name"),
  validate.nameFormat("name"),
  validate.onlyNumber("idStd"),
  create
);
router.post(
  "/student/update/:id",
  validate.required("name"),
  validate.nameFormat("name"),
  update
);
router.delete("/student/remove/:id", remove);

//views
router.get("/student/post", form);
router.get("/student/update/:id", formUpdate);

module.exports = router;
