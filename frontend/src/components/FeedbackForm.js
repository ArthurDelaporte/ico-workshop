import React, { useState } from 'react';

const FeedbackForm = () => {
  const [feedbackType, setFeedbackType] = useState('bug'); // Par défaut "Bug"
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!description.trim()) {
      alert('Veuillez fournir une description.');
      return;
    }

    console.log({
      type: feedbackType,
      description,
      email,
    });

    alert('Merci pour votre retour !');
    setFeedbackType('bug');
    setDescription('');
    setEmail('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00253E] px-6 py-8">
      <div
        className="relative text-black p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/img/startgame/background_card.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '16px',
        }}
      >
        <h1 className="text-xl font-bold text-[#981B20] text-center mb-4">
          REMONTER UN BUG OU FAIRE UNE SUGGESTION
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-bold text-[#00253E] mb-2">
            Type de retour :
          </label>
          <div className="flex justify-around">
            <button
              className={`py-2 px-4 rounded-lg font-bold ${
                feedbackType === 'bug'
                  ? 'bg-[#981B20] text-white'
                  : 'bg-[#DED0B1] text-[#00253E]'
              }`}
              onClick={() => setFeedbackType('bug')}
            >
              Bug
            </button>
            <button
              className={`py-2 px-4 rounded-lg font-bold ${
                feedbackType === 'suggestion'
                  ? 'bg-[#981B20] text-white'
                  : 'bg-[#DED0B1] text-[#00253E]'
              }`}
              onClick={() => setFeedbackType('suggestion')}
            >
              Suggestion
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-bold text-[#00253E] mb-2"
          >
            Description :
          </label>
          <textarea
            id="description"
            className="w-full px-4 py-2 text-sm rounded-lg border border-[#DED0B1] bg-[#DED0B1] text-[#00253E]"
            placeholder="Décrivez le bug ou votre suggestion..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-bold text-[#00253E] mb-2"
          >
            Email (optionnel) :
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 text-sm rounded-lg border border-[#DED0B1] bg-[#DED0B1] text-[#00253E]"
            placeholder="Votre email (facultatif)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-black text-white font-bold py-3 rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
          onClick={handleSubmit}
        >
          ENVOYER
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;