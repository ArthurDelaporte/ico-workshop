import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch("https://ico-workshop.onrender.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur inconnue");
      }

      login(data.user)

      // Vérification du rôle de l'utilisateur
      const userRole = data.user?.role;
      if (userRole === 'admin') {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#00253E] px-6 py-8">
      <div className="text-center mt-8">
        <img
          src="/img/homepage/logo_ico.png"
          alt="Logo ICO"
          className="w-auto h-24 mx-auto mb-4"
        />
      </div>

      <form onSubmit={handleSignIn} className="bg-[#00253E] w-full max-w-xs mt-4">
        <label htmlFor="email" className="block text-white text-sm font-semibold mb-2">
          Identifiant :
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="adresse mail"
          className="w-full p-4 mb-4 border border-[#DED0B1] rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DED0B1]"
          required
        />
        <label htmlFor="password" className="block text-white text-sm font-semibold mb-2">
          Mot de passe :
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="mot de passe"
          className="w-full p-4 mb-6 border border-[#DED0B1] rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DED0B1]"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white text-lg font-bold py-3 rounded-lg hover:bg-gray-800 transition duration-300"
          disabled={loading}
        >
          {loading ? "Connexion..." : "CONNEXION"}
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>

      <a href="#" className="text-[#DED0B1] text-sm underline mt-4 mb-8">
        mentions légales
      </a>
    </div>
  );
};

export default SignIn;
