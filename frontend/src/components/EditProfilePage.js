import React, { useState } from "react";

const EditProfilePage = ({ profileData, onSave }) => {
  const [formData, setFormData] = useState({
    firstname: profileData?.firstname || "",
    lastname: profileData?.lastname || "",
    birthday: profileData?.birthday || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    console.log("Profil mis à jour :", formData);
    alert("Profil mis à jour avec succès !");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      {/* Carte principale */}
      <div
        className="bg-[#DED0B1] p-6 rounded-lg shadow-md w-full max-w-md"
        style={{ borderRadius: "16px" }}
      >
        <h2 className="text-2xl font-bold text-[#981B20] text-center mb-4">
          Modifier le Profil
        </h2>

        {/* Formulaire */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-bold text-[#00253E] mb-2"
            >
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
            <label
              htmlFor="lastname"
              className="block text-sm font-bold text-[#00253E] mb-2"
            >
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
            <label
              htmlFor="birthday"
              className="block text-sm font-bold text-[#00253E] mb-2"
            >
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
          >
            Enregistrer
          </button>
          <button
            className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            onClick={() => window.history.back()}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
