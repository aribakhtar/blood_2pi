const userModel = require("../models/userModel");

// UPDATE ORGANIZATION
const updateOrganizationController = async (req, res) => {
  const { id } = req.params;
  const { organisationName, email, phone } = req.body;

  try {
    const updatedOrganization = await userModel.findByIdAndUpdate(
      id,
      { organisationName, email, phone },
      { new: true }
    );

    if (!updatedOrganization) {
      return res.status(404).send({
        success: false,
        message: "Organization not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Organization updated successfully",
      organizationData: updatedOrganization,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating organization",
      error,
    });
  }
};


// UPDATE HOSPITAL
const updateHospitalController = async (req, res) => {
  const { id } = req.params;
  const { hospitalName, email, phone } = req.body;

  try {
    const updatedHospital = await userModel.findByIdAndUpdate(
      id,
      { hospitalName, email, phone },
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).send({
        success: false,
        message: "Hospital not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Hospital updated successfully",
      hospitalData: updatedHospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating hospital",
      error,
    });
  }
};

//UPDATE DONARS
const updateDonarController = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedDonar = await userModel.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );

    if (!updatedDonar) {
      return res.status(404).send({
        success: false,
        message: "Donar not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Donar updated successfully",
      donarData: updatedDonar,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating donar",
      error,
    });
  }
};



//GET DONAR LIST
const getDonarsListController = async (req, res) => {
  try {
    const donarData = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: donarData.length,
      message: "Donar List Fetched Successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In DOnar List API",
      error,
    });
  }
};
//GET HOSPITAL LIST
const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: hospitalData.length,
      message: "HOSPITAL List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital List API",
      error,
    });
  }
};
//GET ORG LIST
const getOrgListController = async (req, res) => {
  try {
    const orgData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: orgData.length,
      message: "ORG List Fetched Successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG List API",
      error,
    });
  }
};
// =======================================

//DELETE DONAR
const deleteDonarController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: " Record Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};

//EXPORT
module.exports = {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
  updateDonarController,
  updateHospitalController,
  updateOrganizationController
};
