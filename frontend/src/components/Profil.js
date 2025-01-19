import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Profil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const API_URL = 'https://ico-workshop.onrender.com/api/users';

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const response = await fetch(`${API_URL}/${user.id}`);
        if (!response.ok) {
          throw new Error("Impossible de récupérer les informations utilisateur.");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        console.error("Erreur :", err);
        setError(err.message || "Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, API_URL]);

  if (!user) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] text-white">
          <p className="text-lg">Vous devez être connecté pour accéder à votre profil.</p>
          <button
              className="mt-4 bg-[#981B20] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#B02225] transition duration-300"
              onClick={() => navigate("/signin")}
          >
            Se connecter
          </button>
        </div>
    );
  }

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] text-white">
          <p className="text-lg">Chargement des informations...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] text-white">
          <p className="text-lg text-red-500">{error}</p>
          <button
              className="mt-4 bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
              onClick={() => window.location.reload()}
          >
            Réessayer
          </button>
        </div>
    );
  }

  const handleEditProfile = () => {
    navigate("/edit-profile", { state: { profileData } });
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
        <div className="relative bg-[#DED0B1] p-6 rounded-lg shadow-md w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold text-[#981B20] mb-4">Mon Profil</h1>
          <div className="text-[#00253E] text-sm leading-relaxed space-y-2">
            <p>
              <span className="font-bold">Email :</span> {profileData?.email || "N/A"}
            </p>
            <p>
              <span className="font-bold">Prénom :</span> {profileData?.firstname || "N/A"}
            </p>
            <p>
              <span className="font-bold">Nom :</span> {profileData?.lastname || "N/A"}
            </p>
            <p>
              <span className="font-bold">Date de naissance :</span> {profileData?.birthday || "N/A"}
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