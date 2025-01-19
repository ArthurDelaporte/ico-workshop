import React from 'react';
import { useNavigate } from 'react-router-dom';

const LegalMentions = () => {
  const navigate = useNavigate();

  const handleMenu = () => {
    navigate('/');
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      <div
        className="relative text-black p-6 rounded-lg w-full max-w-lg flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/img/startgame/background_card.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '16px',
        }}
      >
        <h1 className="text-xl font-bold text-[#981B20] text-center mb-4">
          MENTIONS LÉGALES
        </h1>
        <div className="text-sm text-[#00253E] space-y-4 leading-relaxed">
          <h2 className="font-bold text-lg">1. Identification de l'éditeur</h2>
          <p>
            <strong>Nom :</strong> ICO
          </p>
          <p>
            <strong>Adresse :</strong>
          </p>
          <p>
            <strong>Email :</strong>
          </p>
          <p>
            <strong>Numéro SIRET :</strong>
          </p>

          <h2 className="font-bold text-lg">2. Hébergement</h2>
          <p>
            <strong>Hébergeur :</strong>
          </p>
          <p>
            <strong>Adresse :</strong>
          </p>
          <p>
            <strong>Contact :</strong>
          </p>

          <h2 className="font-bold text-lg">3. Propriété intellectuelle</h2>
          <p>
            Tous les contenus présents sur ce site (textes, images, vidéos, code)
            sont protégés par le droit d'auteur. Toute reproduction, modification
            ou diffusion sans autorisation est interdite.
          </p>

          <h2 className="font-bold text-lg">4. Protection des données personnelles</h2>
          <p>
            <strong>Données collectées :</strong> Email et mot de passe uniquement
          </p>
          <p>
            <strong>Finalité :</strong> Création de compte utilisateur, gestion des connexions
          </p>
          <p>
            <strong>Durée de conservation :</strong> Les données sont conservées
            jusqu’à suppression du compte utilisateur.
          </p>
          <p>
            <strong>Vos droits :</strong> Vous pouvez demander l'accès, la modification ou la suppression de vos données à tout moment via : [email ou formulaire].
          </p>

          <h2 className="font-bold text-lg">5. Responsabilité</h2>
          <p>
            L'éditeur ne peut être tenu responsable des interruptions de service
            ou des contenus externes liés depuis ce site.
          </p>

          <h2 className="font-bold text-lg">6. Loi applicable</h2>
          <p>
            Ce site est régi par la législation française. En cas de litige, les
            tribunaux français seront compétents.
          </p>
        </div>
        <button
          className="mt-6 bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
          onClick={handleMenu}
          >
          RETOUR AU MENU
        </button>
      </div>
    </div>
  );
};

export default LegalMentions;
