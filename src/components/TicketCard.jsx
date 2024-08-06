import React from 'react';

const TicketCard = ({ ticket }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md mb-4 w-full md:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-semibold">Codigo: {ticket.code}</h3>
            <p className="text-gray-500">Descripcion: {ticket.description}</p>
            <p className="text-gray-700">Resumen: {ticket.summary}</p>
            <p className="text-blue-600">Responsable: {ticket.user.name}</p>
        </div>
    );
};

export default TicketCard;
