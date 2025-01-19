import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const EditProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_URL = `https://ico-workshop.onrender.com/api/users`;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    birthday: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const response = await fetch(`${API_URL}/${user.id}`);
        if (!response.ok) {
          throw new Error("Impossible de récupérer les informations utilisateur.");
        }
        const data = await response.json();
        setFormData({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          birthday: data.birthday || "",
        });
      } catch (err) {
        console.error("Erreur :", err);
        setError("Une erreur est survenue lors du chargement du profil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, API_URL]);

  // 🔹 Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Mettre à jour les infos du user
  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil.");
      }

      setSuccess("Profil mis à jour avec succès !");
      setTimeout(() => navigate("/profil"), 1500); // Redirige après succès
    } catch (err) {
      console.error("Erreur :", err);
      setError("Impossible de mettre à jour le profil.");
    } finally {
      setSaving(false);
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
        {/* Carte principale */}
        <div className="bg-[#DED0B1] p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#981B20] text-center mb-4">
            Modifier le Profil
          </h2>

          {/* 🔄 Affichage du chargement */}
          {loading ? (
              <p className="text-center text-[#00253E]">Chargement des informations...</p>
          ) : (
              <>
                {/* ✅ Message de succès / erreur */}
                {success && <p className="text-green-600 text-center">{success}</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Formulaire */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="firstname" className="block text-sm font-bold text-[#00253E] mb-2">
                      Prénom :
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-[#DED0B1] bg-white text-[#00253E]"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastname" className="block text-sm font-bold text-[#00253E] mb-2">
                      Nom :
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-[#DED0B1] bg-white text-[#00253E]"
                    />
                  </div>

                  <div>
                    <label htmlFor="birthday" className="block text-sm font-bold text-[#00253E] mb-2">
                      Date de Naissance :
                    </label>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-[#DED0B1] bg-white text-[#00253E]"
                    />
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex justify-between mt-6">
                  <button
                      className="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
                      onClick={handleSave}
                      disabled={saving}
                  >
                    {saving ? "Enregistrement..." : "Enregistrer"}
                  </button>
                  <button
                      className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                      onClick={() => navigate("/profil")}
                  >
                    Annuler
                  </button>
                </div>
              </>
          )}
        </div>
      </div>
  );
};

export default EditProfilePage;