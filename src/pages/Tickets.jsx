import React, { useEffect, useState } from 'react';
import TicketCard from '../components/TicketCard';
import AddTicketModal from '../components/AddTicketModal';
import { useNavigate } from 'react-router-dom';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const resultsPerPage = 5;
    const navigate = useNavigate();

    const fetchTickets = async (page) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`https://node-app-ktp.onrender.com/tickets?page=${page}&&results_per_page=${resultsPerPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.status === 'fail') {
                navigate('/login');
            } else {
                setTickets(data.data);

                const totalResultados = data.total

                setTotalPages(Math.ceil(totalResultados / resultsPerPage));

            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
            navigate('/login');
        }
    };
    
    useEffect(() => {
        fetchTickets(currentPage);
    }, [currentPage, navigate]);

    const handleAddTicket = (newTicket) => {
        setTickets([...tickets, newTicket]);
    };

    const handleUpdateTicket = (updatedTicket) => {
        setTickets(tickets.map(ticket => ticket.id === updatedTicket.id ? updatedTicket : ticket));
    };

    const handleDeleteTicket = (ticketId) => {
        setTickets(tickets.filter(ticket => ticket.id !== ticketId));
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen w-full">
            <button
                className="mb-4 px-4 py-2 text-white bg-blue-500 rounded"
                onClick={() => setIsModalOpen(true)}
            >
                Nuevo Ticket
            </button>
            <div className="flex flex-wrap justify-center w-full">
                {tickets.map(ticket => (
                    <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        onUpdateTicket={handleUpdateTicket}
                        onDeleteTicket={handleDeleteTicket}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="px-3 py-1 mx-1 bg-blue-500 text-white rounded"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    &lt;&lt;
                </button>
                <span className="px-3 py-1 mx-1 text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-3 py-1 mx-1 bg-blue-500 text-white rounded"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    &gt;&gt;
                </button>
            </div>
            <AddTicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddTicket={handleAddTicket}
            />
        </div>
    );
};

export default Tickets;
