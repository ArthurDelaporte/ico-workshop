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
      const response = await fetch("https://ico-workshop.onrender.com/api/auth/signup", {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      <div
        className="relative text-black p-6 rounded-lg w-full max-w-md flex flex-col items-center"
        style={{
          backgroundImage: "url('/img/startgame/background_card.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "16px",
        }}
      >
        <h2 className="text-xl font-bold text-[#981B20] text-center mb-4">
          INSCRIPTION
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <div className="space-y-4 w-full">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm rounded-lg bg-[#DED0B1] text-[#00253E] border border-[#DED0B1]"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm rounded-lg bg-[#DED0B1] text-[#00253E] border border-[#DED0B1]"
          />
          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm rounded-lg bg-[#DED0B1] text-[#00253E] border border-[#DED0B1]"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm rounded-lg bg-[#DED0B1] text-[#00253E] border border-[#DED0B1]"
          />
          <input
            type="date"
            name="birthday"
            placeholder="Date de naissance"
            value={formData.birthday}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm rounded-lg bg-[#DED0B1] text-[#00253E] border border-[#DED0B1]"
          />
          <button
            onClick={handleSignUp}
            className="w-full bg-black text-white py-3 text-lg font-bold rounded-lg hover:bg-gray-800 transition duration-300"
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
