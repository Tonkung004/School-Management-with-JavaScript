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
} = require("../Controllers/subject");
const validate = require("../middleware/validate");
//CRUD

router.get("/subject/list", list);
router.get("/subject/read/:id", read);
router.post(
  "/subject/create",
  validate.required("idSubject"),
  validate.required("name"),
  validate.required("credit"),
  validate.lengthAbove("credit", 1),
  validate.idSubformat("idSubject"),
  create
);
router.post(
  "/subject/update/:id",
  validate.required("name"),
  validate.required("credit"),
  validate.lengthAbove("credit", 1),
  update
);
router.delete("/subject/remove/:id", remove);

//views
router.get("/subject/post", form);
router.get("/subject/update/:id", formUpdate);

module.exports = router;
