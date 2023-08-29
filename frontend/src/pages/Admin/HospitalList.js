import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const HospitalList = () => {
  const [data, setData] = useState([]);
  const [editingHospital, setEditingHospital] = useState(null); // State for holding the hospital being edited
  const [editedHospitalName, setEditedHospitalName] = useState(""); // State for the edited hospital name
  const [editedHospitalEmail, setEditedHospitalEmail] = useState(""); // State for the edited hospital email
  const [editedHospitalPhone, setEditedHospitalPhone] = useState(""); // State for the edited hospital phone
  //find hospital records
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/admin/hospital-list");
      console.log(data);
      if (data?.success) {
        setData(data?.hospitalData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  const handleEdit = (hospital) => {
    setEditingHospital(hospital);
    setEditedHospitalName(hospital.hospitalName);
    setEditedHospitalEmail(hospital.email);
    setEditedHospitalPhone(hospital.phone);
  };

  const handleSaveEditedHospital = async () => {
    try {
      const { _id: id, role } = editingHospital;
      const data = {
        hospitalName: editedHospitalName,
        email: editedHospitalEmail,
        phone: editedHospitalPhone,
      };
      const response = await API.put(`/admin/update-hospital/${id}`, data);

      if (response.data.success) {
        alert("Hospital information updated successfully");
        setEditingHospital(null);
        setEditedHospitalName("");
        setEditedHospitalEmail("");
        setEditedHospitalPhone("");
        getHospitals(); // Refresh the hospital list after successful update
      } else {
        alert("Error while updating hospital information");
      }
    } catch (error) {
      console.log(error);
      alert("Error while updating hospital information");
    }
  };

  const handleCancelEdit = () => {
    setEditingHospital(null);
    setEditedHospitalName("");
    setEditedHospitalEmail("");
    setEditedHospitalPhone("");
  };

  //DELETE FUNCTION
  const handelDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You SUre Want To Delete This Hospital",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>
                {editingHospital && editingHospital._id === record._id ? (
                  <input
                    type="text"
                    value={editedHospitalName}
                    onChange={(e) => setEditedHospitalName(e.target.value)}
                  />
                ) : (
                  record.hospitalName
                )}
              </td>
              <td>
                {editingHospital && editingHospital._id === record._id ? (
                  <input
                    type="text"
                    value={editedHospitalEmail}
                    onChange={(e) => setEditedHospitalEmail(e.target.value)}
                  />
                ) : (
                  record.email
                )}
              </td>
              <td>
                {editingHospital && editingHospital._id === record._id ? (
                  <input
                    type="text"
                    value={editedHospitalPhone}
                    onChange={(e) => setEditedHospitalPhone(e.target.value)}
                  />
                ) : (
                  record.phone
                )}
              </td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                {editingHospital && editingHospital._id === record._id ? (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={handleSaveEditedHospital}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary ml-2"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(record)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handelDelete(record._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default HospitalList;
