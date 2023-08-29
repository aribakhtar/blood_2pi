import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const OrgList = () => {
  const [data, setData] = useState([]);
  const [editingOrganization, setEditingOrganization] = useState(null);
  const [editedOrgName, setEditedOrgName] = useState("");
  const [editedOrgEmail, setEditedOrgEmail] = useState("");
  const [editedOrgPhone, setEditedOrgPhone] = useState("");

  // Find organization records
  const getOrganizations = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      console.log(data);
      if (data?.success) {
        setData(data?.orgData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganizations();
  }, []);

  // EDIT FUNCTION
  const handleEdit = (organization) => {
    setEditingOrganization(organization);
    setEditedOrgName(organization.organisationName);
    setEditedOrgEmail(organization.email);
    setEditedOrgPhone(organization.phone);
  };

  // SAVE EDITED ORGANIZATION FUNCTION
  const handleSaveEditedOrganization = async () => {
    try {
      const { _id: id, role } = editingOrganization;
      const data = {
        organisationName: editedOrgName,
        email: editedOrgEmail,
        phone: editedOrgPhone,
      };
      const response = await API.put(`/admin/update-organization/${id}`, data);

      if (response.data.success) {
        alert("Organization information updated successfully");
        setEditingOrganization(null);
        setEditedOrgName("");
        setEditedOrgEmail("");
        setEditedOrgPhone("");
        getOrganizations(); // Refresh the organization list after successful update
      } else {
        alert("Error while updating organization information");
      }
    } catch (error) {
      console.log(error);
      alert("Error while updating organization information");
    }
  };

  // CANCEL EDIT FUNCTION
  const handleCancelEdit = () => {
    setEditingOrganization(null);
    setEditedOrgName("");
    setEditedOrgEmail("");
    setEditedOrgPhone("");
  };

  const handelDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You SUre Want To Delete This Organisation",
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
                {editingOrganization && editingOrganization._id === record._id ? (
                  <input
                    type="text"
                    value={editedOrgName}
                    onChange={(e) => setEditedOrgName(e.target.value)}
                  />
                ) : (
                  record.organisationName
                )}
              </td>
              <td>
                {editingOrganization && editingOrganization._id === record._id ? (
                  <input
                    type="text"
                    value={editedOrgEmail}
                    onChange={(e) => setEditedOrgEmail(e.target.value)}
                  />
                ) : (
                  record.email
                )}
              </td>
              <td>
                {editingOrganization && editingOrganization._id === record._id ? (
                  <input
                    type="text"
                    value={editedOrgPhone}
                    onChange={(e) => setEditedOrgPhone(e.target.value)}
                  />
                ) : (
                  record.phone
                )}
              </td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                {editingOrganization && editingOrganization._id === record._id ? (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={handleSaveEditedOrganization}
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

export default OrgList;
