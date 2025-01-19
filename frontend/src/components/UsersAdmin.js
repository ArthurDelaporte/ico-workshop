import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaSearch, FaFilter, FaBan, FaUndo } from 'react-icons/fa';
import BanModal from './BanModal';

const UsersAdmin = () => {
    const API_URL = "https://ico-workshop.onrender.com/api/users"; // Ajustez selon votre configuration backend
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10; //Nombre users/pages 

    // Récupérer les utilisateurs depuis le backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Erreur lors du chargement des utilisateurs');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchUsers();
    }, []);

    // Filtrer les utilisateurs en fonction de la recherche et du statut
    useEffect(() => {
        let filtered = users;

        if (searchQuery) {
            filtered = filtered.filter(user =>
                `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterStatus) {
            filtered = filtered.filter(user => user.statusBan === (filterStatus === 'banned'));
        }

        setFilteredUsers(filtered);
    }, [searchQuery, filterStatus, users]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    const handleBanUser = async (id) => {
        setSelectedUserId(id);
        setIsBanModalOpen(true);
    };

    const handleUnbanUser = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ statusBan: false }),
            });
            if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut utilisateur');

            const updatedUser = await response.json();
            setUsers((prevUsers) =>
                prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
            );
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleConfirmBan = async (banDuration) => {
        try {
            const response = await fetch(`${API_URL}/${selectedUserId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ statusBan: true }),
            });
            if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut utilisateur');

            const updatedUser = await response.json();
            setUsers((prevUsers) =>
                prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
            );

            // Optionnel : Unban automatique après une durée donnée
            if (banDuration > 0) {
                setTimeout(() => handleUnbanUser(selectedUserId), banDuration * 60000);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsBanModalOpen(false);
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Pagination Logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div className="min-h-screen bg-[#00253E] py-6 px-4 font-sans">
            {/* Barre supérieure avec retour au Dashboard */}
            <div className="w-full max-w-4xl flex items-center justify-between mb-6">
                <button
                    onClick={() => (window.location.href = "./dashboard")}
                    className="text-[#CE5960] text-xl flex items-center hover:text-[#AF2127]"
                >
                    <FaArrowLeft className="mr-2" />
                </button>
                <h1
                    className="text-4xl font-bold text-[#DED0B1] text-center"
                    style={{ fontFamily: "'Alatsi', sans-serif" }}
                >
                    Gestion des utilisateurs
                </h1>
                <div className="w-8" />
            </div>

            {/* Barre de recherche et filtre */}
            <div className="flex justify-between mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Recherche..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-4 py-2 w-64 border rounded-lg text-gray-700"
                    />
                    <FaSearch className="absolute top-2.5 right-3 text-gray-500" />
                </div>
                <div className="relative">
                    <select
                        value={filterStatus}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="px-4 py-2 border rounded-lg text-gray-700"
                    >
                        <option value="">Filtrer par statut</option>
                        <option value="active">Actif</option>
                        <option value="banned">Banni</option>
                    </select>
                    <FaFilter className="absolute top-2.5 right-3 text-gray-500" />
                </div>
            </div>

            {/* Liste des utilisateurs */}
            <ul className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
                {currentUsers.map(user => (
                    <li key={user.id} className="flex justify-between items-center px-4 py-3">
                        <span className="text-lg">{`${user.firstname} ${user.lastname}`}</span>
                        <div>
                            {!user.statusBan ? (
                                <button
                                    onClick={() => handleBanUser(user.id)}
                                    className="bg-[#CE5960] text-white px-4 py-2 rounded-lg mr-2 hover:bg-[#AF2127]"
                                >
                                    <FaBan className="inline mr-1" /> Bannir
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleUnbanUser(user.id)}
                                    className="bg-[#AF2127] text-white px-4 py-2 rounded-lg hover:bg-[#CE5960]"
                                >
                                    <FaUndo className="inline mr-1" /> Débannir
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-[#DED0B1] text-[#00253E]' : 'bg-[#CE5960] text-white'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Modal pour bannir */}
            <BanModal
                isOpen={isBanModalOpen}
                onClose={() => setIsBanModalOpen(false)}
                onConfirm={handleConfirmBan}
            />
        </div>
    );
};

export default UsersAdmin;
