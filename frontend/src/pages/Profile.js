import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-gray-600">You need to log in first.</p>
        <Link to="/login" className="text-blue-500 hover:underline mt-4">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">My Profile</h2>
          <div className="flex gap-6">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <p className="text-lg">
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p className="text-lg mt-2">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="text-lg mt-2">
                <span className="font-semibold">Address:</span> {user.address}
              </p>
              <p className="text-lg mt-2">
                <span className="font-semibold">Phone:</span>{" "}
                {user.phone || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 flex justify-end">
          <Link
            to="/edit-profile"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
