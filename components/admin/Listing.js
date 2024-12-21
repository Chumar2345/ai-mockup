'use client';
import { useState, useEffect } from 'react';
import { Users } from '@/utils/schema';
import { db } from '@/utils/db';
import { desc,eq } from 'drizzle-orm';
import alertify from 'alertifyjs';
import DataTable from 'react-data-table-component'; // Import DataTable
import 'alertifyjs/build/css/alertify.min.css';

export default function Listing() {
  const [items, setItems] = useState([]); // State for all users
  const [filteredItems, setFilteredItems] = useState([]); // State for search/filter
  const [search, setSearch] = useState(''); // State for search query

  useEffect(() => {
    GetUser();
  }, []);

  // Fetch Users
  const GetUser = async () => {
    const getUsers = await db
      .select()
      .from(Users)
      .orderBy(desc(Users.id));

    setItems(getUsers);
    setFilteredItems(getUsers); // Initialize filtered items
  };

  // Handle Delete Confirmation
  const handleDelete = async (id) => {

    alertify.confirm(
      'Delete User',
      'Are you sure you want to delete this user?',
      async () => {
        try {
          // Update the is_deleted value in the database
          await db.update(Users)
            .set({ is_delete: 1 }) // Set is_deleted to 1
            .where(eq(Users.id,id)); // Match the user by ID
  
          // Update the UI
          const updatedItems = items.filter((item) => item.id !== id); // Optionally filter out deleted items
          setItems(updatedItems);
          setFilteredItems(updatedItems);
  
          alertify.success('User deleted successfully');
        } catch (error) {
          console.error('Error deleting user:', error);
          alertify.error('Failed to delete the user. Please try again.');
        }
      },
      () => {
        alertify.error('Delete operation cancelled');
      }
    );
  };
  

  // Handle Search
  useEffect(() => {
    const result = items.filter((item) => {
      return (
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.plan.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredItems(result);
  }, [search, items]);

  // Define Table Columns
  const columns = [
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Plan', selector: (row) => row.plan, sortable: true },
    { name: 'Interview Used', selector: (row) => row.mockUsed },
    { name: 'Interview Limit', selector: (row) => row.mockLimit },
    { name: 'Created At', selector: (row) => new Date(row.createdAt).toLocaleString() },
    { name: 'End Date', selector: (row) => new Date(row.endDate).toLocaleString() },
    { name: 'Payment Status', selector: (row) => row.paymentStatus },
    { 
      name: 'Deleted Status', 
      selector: (row) => row.is_delete === 0 ? 'Not Deleted' : 'Deleted' 
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
          style={{
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>User Listing</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by Email or Plan"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          border: '1px solid #ddd',
          borderRadius: '5px',
        }}
      />

      {/* DataTable Component */}
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        highlightOnHover
        responsive
        defaultSortFieldId={1}
        paginationPerPage={5} // Show 5 rows per page
      />
    </div>
  );
}
