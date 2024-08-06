import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketCard from '../components/TicketCard';
import AddTicketModal from '../components/AddTicketModal';

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('https://node-app-ktp.onrender.com/tickets', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (data.status === 'fail') {
                    navigate('/login');
                } else {
                    setTickets(data.data);
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
                navigate('/login');
            }
        };

        fetchTickets();
    }, [navigate]);

    const handleAddTicket = (newTicket) => {
        setTickets([...tickets, { ...newTicket, user: tickets[0].user }]);
    };

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
            <div className="flex justify-between w-full max-w-2xl mb-4">
                <button
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Ticket
                </button>
                <button
                    className="px-4 py-2 text-white bg-red-500 rounded"
                    onClick={handleLogOut}
                >
                    Log Out
                </button>
            </div>
            <div className="flex flex-wrap justify-center w-full">
                {tickets.map(ticket => (
                    <TicketCard key={ticket.code} ticket={ticket} />
                ))}
            </div>
            <AddTicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddTicket={handleAddTicket}
            />
        </div>
    );
};

export default Dashboard;
