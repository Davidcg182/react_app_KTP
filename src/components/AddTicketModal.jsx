import React, { useState } from 'react';

const AddTicketModal = ({ isOpen, onClose, onAddTicket }) => {
  const [code, setCode] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTicket = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in.');
      return;
    }
    const token = localStorage.getItem('token');

    const newTicket = {
      code: code,
      summary: summary,
      description: description,
      userId: userId,
    };

    try {
      const response = await fetch('https://node-app-ktp.onrender.com/tickets/newticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newTicket),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // onAddTicket(data.data);
        onClose();
      } else {
        alert('Failed to add ticket.');
      }
    } catch (error) {
      console.error('Error adding ticket:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="mb-4 text-2xl font-semibold text-center">Add Ticket</h2>
        <form onSubmit={handleAddTicket}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Code</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Summary</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicketModal;
