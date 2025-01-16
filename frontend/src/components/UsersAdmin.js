import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaBan, FaUndo } from 'react-icons/fa';
import BanModal from './BanModal';

const UsersAdmin = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Alice', status: 'active' },
        { id: 2, name: 'Bob', status: 'banned' },
        { id: 3, name: 'Charlie', status: 'active' },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 2;

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
        <div className="min-h-screen bg-gray-100 py-6 px-4">
            <div className="flex justify-between mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Recherche..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-4 py-2 w-64 border rounded-lg"
                    />
                    <FaSearch className="absolute top-2.5 right-3 text-gray-500" />
                </div>
                <div className="relative">
                    <select
                        value={filterStatus}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                    >
                        <option value="">Filtrer par statut</option>
                        <option value="active">Actif</option>
                        <option value="banned">Banni</option>
                    </select>
                    <FaFilter className="absolute top-2.5 right-3 text-gray-500" />
                </div>
            </div>
            <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
                {currentUsers.map(user => (
                    <li key={user.id} className="flex justify-between items-center px-4 py-3">
                        <span>{user.name}</span>
                        <div>
                            {user.status !== 'banned' ? (
                                <button
                                    onClick={() => handleBanUser(user.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                                >
                                    <FaBan className="inline mr-1" /> Bannir
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleUnbanUser(user.id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                >
                                    <FaUndo className="inline mr-1" /> Débannir
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <BanModal
                isOpen={isBanModalOpen}
                onClose={() => setIsBanModalOpen(false)}
                onConfirm={handleConfirmBan}
            />
        </div>
    );
};

export default UsersAdmin;
