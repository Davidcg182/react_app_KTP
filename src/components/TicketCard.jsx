import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditTicketModal from './EditTicketModal';
import DeleteTicketModal from './DeleteTicketModal';

const TicketCard = ({ ticket, onUpdateTicket, onDeleteTicket }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <div className="bg-white shadow-md rounded p-4 m-2 w-full md:w-1/3">
            <h3 className="text-xl font-semibold">{ticket.code}</h3>
            <p><strong>Summary:</strong> {ticket.summary}</p>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>User:</strong> {ticket.user.name}</p>
            <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => setIsEditModalOpen(true)} className="text-blue-500">
                    <FaEdit />
                </button>
                <button onClick={() => setIsDeleteModalOpen(true)} className="text-red-500">
                    <FaTrash />
                </button>
            </div>
            <EditTicketModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                ticket={ticket}
                onUpdateTicket={onUpdateTicket}
            />
            <DeleteTicketModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                ticket={ticket}
                onDeleteTicket={onDeleteTicket}
            />
        </div>
    );
};

export default TicketCard;
