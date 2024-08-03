import React, { useEffect, useState } from "react";
import { useAuth } from "../login/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <p>{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">First Name:</label>
          <p>{user.firstname}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name:</label>
          <p>{user.lastname}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Roles:</label>
          <ul>
            {user.roles && user.roles.length > 0 ? (
              user.roles.map((role) => <li key={role.roleId}>{role.name}</li>)
            ) : (
              <li>No roles assigned.</li>
            )}
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
