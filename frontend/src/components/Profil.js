import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Profil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] text-white">
        <p className="text-lg">Vous devez être connecté pour accéder à votre profil.</p>
        <button
          className="mt-4 bg-[#981B20] text-white font-bold py-2 px-4 rounded-lg"
          onClick={() => navigate("/signin")}
        >
          Se connecter
        </button>
      </div>
    );
  }

  const handleEditProfile = () => {
    navigate("/edit-profile", { state: { profileData: user } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      <div
        className="relative bg-[#DED0B1] p-6 rounded-lg shadow-md w-full max-w-sm text-center"
        style={{
          borderRadius: "16px",
        }}
      >
        <h1 className="text-2xl font-bold text-[#981B20] mb-4">Mon Profil</h1>
        <div className="text-[#00253E] text-sm leading-relaxed">
          <p>
            <span className="font-bold">Email :</span> {user.email || "N/A"}
          </p>
          <p>
            <span className="font-bold">Prénom :</span> {user.firstname || "N/A"}
          </p>
          <p>
            <span className="font-bold">Nom :</span> {user.lastname || "N/A"}
          </p>
          <p>
            <span className="font-bold">Date de naissance :</span>{" "}
            {user.birthday || "N/A"}
          </p>
        </div>
        <button
          className="w-full bg-black text-white font-bold py-3 rounded-lg mt-6 shadow-md hover:bg-gray-800 transition duration-300"
          onClick={handleEditProfile}
        >
          Modifier le profil
        </button>
        <button
          className="w-full bg-red-600 text-white font-bold py-3 rounded-lg mt-4 shadow-md hover:bg-red-700 transition duration-300"
          onClick={logout}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Profil;
