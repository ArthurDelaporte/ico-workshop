import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    birthday: "",
    role: "player",
    statusBan: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    setFormData((prevState) => ({
      ...prevState,
      role: "player",
      statusBan: false,
    }));
    try {
      const response = await fetch("http://localhost:1234/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur inconnue");
      alert("Inscription réussie !");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col justify-center items-center px-6 py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-teal-700 text-center mb-8">
          Inscription
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
          <input
            type="date"
            name="birthday"
            placeholder="Date de naissance"
            value={formData.birthday}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
          <button
            onClick={handleSignUp}
            className="w-full text-center bg-teal-600 text-white py-3 text-lg font-medium rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
