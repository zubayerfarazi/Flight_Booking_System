import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    phone: user?.phone || "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/api/user/${user._id}`,
        formData
      );
      alert("Profile updated successfully!");
      setUser(response.data.user); // Update user in context
      navigate("/profile"); // Redirect to Profile page
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border p-3 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border p-3 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border p-3 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border p-3 rounded"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-4 py-2 border border-gray-400 text-gray-600 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
