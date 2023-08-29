import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const DonarList = () => {
  const [data, setData] = useState([]);
  const [editingDonar, setEditingDonar] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  //find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      //   console.log(data);
      if (data?.success) {
        setData(data?.donarData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

    // EDIT FUNCTION
    const handleEdit = (donar) => {
      setEditingDonar(donar);
      setEditedName(donar.name || donar.organisationName);
      setEditedEmail(donar.email);
      setEditedPhone(donar.phone);
    };

    const handleCancelEdit = () => {
      setEditingDonar(null);
      setEditedName("");
      setEditedEmail("");
      setEditedPhone("");
    };
    
  
    // SAVE EDITED DONAR FUNCTION
    const handleSaveEditedDonar = async () => {
      try {
        const { _id: id, role } = editingDonar;
        const data = {
          name: editedName,
          email: editedEmail,
          phone: editedPhone,
        };
        const response = await API.put(`/admin/update-donar/${id}`, data);
  
        if (response.data.success) {
          alert("Donar information updated successfully");
          setEditingDonar(null);
          setEditedName("");
          setEditedEmail("");
          setEditedPhone("");
          getDonars(); // Refresh the donor list after successful update
        } else {
          alert("Error while updating donor information");
        }
      } catch (error) {
        console.log(error);
        alert("Error while updating donor information");
      }
    };


  //DELETE FUNCTION
  const handelDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You SUre Want To Delete This Donar",
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
                {editingDonar && editingDonar._id === record._id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  record.name || record.organisationName
                )}
              </td>
              <td>
                {editingDonar && editingDonar._id === record._id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                ) : (
                  record.email
                )}
              </td>
              <td>
                {editingDonar && editingDonar._id === record._id ? (
                  <input
                    type="text"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                  />
                ) : (
                  record.phone
                )}
              </td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                {editingDonar && editingDonar._id === record._id ? (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={handleSaveEditedDonar}
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

export default DonarList;
