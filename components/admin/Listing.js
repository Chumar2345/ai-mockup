'use client';
import { useState, useEffect } from 'react';
import { Users } from "@/utils/schema";
import { db } from "@/utils/db";
import { desc } from "drizzle-orm";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css'; 

export default function Listing() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    GetUser();
  }, []);

  const GetUser = async () => {
    const getUsers = await db
      .select()
      .from(Users)
      .orderBy(desc(Users.id)); // Fetch all users ordered by descending ID
  
    setItems(getUsers); // Set the full list of users to state
  };
  

  const handleDelete = (id) => {
    alertify.confirm(
      'Delete User', // Title of the confirmation box
      'Are you sure you want to delete this user?', // Message
      () => {
        // User clicks OK
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        alertify.success('User deleted successfully'); // Success notification
      },
      () => {
        // User clicks Cancel
        alertify.error('Delete operation cancelled'); // Error notification
      }
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Listing</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Plan</th>
            <th style={styles.th}>Interview Used</th>
            <th style={styles.th}>Interview Limit</th>
            <th style={styles.th}>Created At</th>
            <th style={styles.th}>End Date</th>
            <th style={styles.th}>Payment Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={styles.row}>
              <td style={styles.td}>{item.email}</td>
              <td style={styles.td}>{item.plan}</td>
              <td style={styles.td}>{item.mockUsed}</td>
              <td style={styles.td}>{item.mockLimit}</td>
              <td style={styles.td}>{new Date(item.createdAt).toLocaleString()}</td>
              <td style={styles.td}>{new Date(item.endDate).toLocaleString()}</td>
              <td style={styles.td}>{item.paymentStatus}</td>
              <td style={styles.td}>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',  // Set a max width for the container to prevent it from being too wide
    margin: '0 auto',    // Center the container
    padding: '20px',     // Add padding inside the container
  },
  heading: {
    marginBottom: '20px',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  th: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  row: {
    backgroundColor: '#f9f9f9',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
