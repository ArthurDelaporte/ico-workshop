import React, { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Simule l'inscription en affichant un message
    if (email && password && firstname && lastname) {
      alert('Inscription réussie!');
    } else {
      setError('Tous les champs sont requis');
    }
  };

  return (
    <div className="flex min-h-screen bg-teal-100 justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-teal-700 text-center mb-8">Inscription</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Prénom"
            className="w-full p-4 mb-4 border border-teal-300 rounded-lg"
            required
          />
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Nom"
            className="w-full p-4 mb-4 border border-teal-300 rounded-lg"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-4 mb-4 border border-teal-300 rounded-lg"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full p-4 mb-6 border border-teal-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300"
          >
            S'inscrire
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
