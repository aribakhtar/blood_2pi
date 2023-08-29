const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
  updateDonarController,
  updateHospitalController,
  updateOrganizationController
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");


//router object
const router = express.Router();

router.put("/update-donar/:id",
authMiddelware,
adminMiddleware,
updateDonarController);

//Routes

//GET || DONAR LIST
router.get(
  "/donar-list",
  authMiddelware,
  adminMiddleware,
  getDonarsListController
);
//GET || HOSPITAL LIST
router.get(
  "/hospital-list",
  authMiddelware,
  adminMiddleware,
  getHospitalListController
);
//GET || ORG LIST
router.get("/org-list", authMiddelware, adminMiddleware, getOrgListController);
// ==========================

// DELETE DONAR || GET
router.delete(
  "/delete-donar/:id",
  authMiddelware,
  adminMiddleware,
  deleteDonarController
);

router.put("/update-donar/:id",authMiddelware, adminMiddleware, updateDonarController);
router.put("/update-hospital/:id",authMiddelware, adminMiddleware,updateHospitalController);
router.put("/update-organization/:id",authMiddelware, adminMiddleware,updateOrganizationController);

//EXPORT
module.exports = router;
