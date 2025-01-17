import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaSearch, FaFilter, FaBan, FaUndo } from 'react-icons/fa';
import BanModal from './BanModal';

const UsersAdmin = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Alice', status: 'active' },
        { id: 2, name: 'Bob', status: 'banned' },
        { id: 3, name: 'Charlie', status: 'active' },
        { id: 4, name: 'A', status: 'active' },
        { id: 5, name: 'B', status: 'active' },
        { id: 6, name: 'C', status: 'active' },
        { id: 7, name: 'D', status: 'active' },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;

    useEffect(() => {
        let filtered = users;

        if (searchQuery) {
            filtered = filtered.filter(user => 
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterStatus) {
            filtered = filtered.filter(user => user.status === filterStatus);
        }

        setFilteredUsers(filtered);
    }, [searchQuery, filterStatus, users]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    const handleBanUser = (id) => {
        setSelectedUserId(id);
        setIsBanModalOpen(true);
    };

    const handleUnbanUser = (id) => {
        setUsers(prevUsers => prevUsers.map(user => 
            user.id === id ? { ...user, status: 'active' } : user
        ));
    };

    const handleConfirmBan = (banDuration) => {
        setUsers(prevUsers => prevUsers.map(user => 
            user.id === selectedUserId ? { ...user, status: 'banned' } : user
        ));
        setTimeout(() => handleUnbanUser(selectedUserId), banDuration * 60000);
        setIsBanModalOpen(false);
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
                                <div className="w-8" /> {/* Placeholder pour équilibrer le design */}
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
                        <span className="text-lg">{user.name}</span>
                        <div>
                            {user.status !== 'banned' ? (
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
