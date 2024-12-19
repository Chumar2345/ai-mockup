'use client';

import { useState, useEffect } from 'react';
import { Plan } from "@/utils/schema";
import { db } from "@/utils/db";

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';

export default function AddPlan() {
    // Static Array of Packages
  
    const [items, setItems] = useState([]); // State for all packages
    // const [filteredItems, setFilteredItems] = useState([]); // State for search/filter
    // const [search, setSearch] = useState(''); // State for search query
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [newPackage, setNewPackage] = useState({
      type: '',
      name: '',
      price: '',
      duration: '',
      features: '',
    }); // New package state
  
    const [validationErrors, setValidationErrors] = useState({
      type: '',
      name: '',
      price: '',
      duration: '',
      features: '',
    });
    
  
    useEffect(() => {
      // Initialize static package data
    //   setItems(packageList);
    //   setFilteredItems(packageList);
    }, []);
  
    const validateFields = () => {
      const errors = {};
      if (!newPackage.type) errors.type = 'Plan type is required';
      if (!newPackage.name) errors.name = 'Plan name is required';
      if (!newPackage.price) errors.price = 'Price is required';
      if (!newPackage.duration) errors.duration = 'Duration is required';
      if (!newPackage.features) errors.features = 'Features are required';
      setValidationErrors(errors);
      return Object.keys(errors).length === 0; // Returns true if no errors
    };
    
  
    // Handle Add Package
    const handleAddPackage = async () => {
  
      if (!validateFields()) return;
  
      try {
          // Insert the new package into the database
          await db.insert(Plan).values({
            type: newPackage.type, // Assuming "custom" is the type for user-added plans
            name: newPackage.name,
            price: parseInt(newPackage.price, 10),
            features: newPackage.features,
            createdAt: new Date().toISOString(),
          });
      
        //   setItems((prevItems) => [...prevItems, newPackageWithId]);
        //   setFilteredItems((prevItems) => [...prevItems, newPackageWithId]);
          setIsModalOpen(false);
          setNewPackage({ name: '', price: '', duration: '', features: '' }); // Reset form
          setValidationErrors({});
          alertify.success('Package added successfully');
        } catch (error) {
          console.error('Error adding package to the database:', error);
          alertify.error('Failed to add the package. Please try again.');
        }
    };
  
    return (
      <div>
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                width: '600px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3>Add New Plan</h3>
              <input
                type="text"
                placeholder="Plan Type"
                value={newPackage.type}
                onChange={(e) => setNewPackage({ ...newPackage, type: e.target.value })}
                style={{
                  marginBottom: '5px',
                  padding: '10px',
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
              {validationErrors.type && (
                  <div style={{ color: 'red', marginBottom: '5px' }}>{validationErrors.type}</div>
              )}
              <input
                type="text"
                placeholder="Package Name"
                value={newPackage.name}
                onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                style={{
                  marginBottom: '5px',
                  padding: '10px',
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
              {validationErrors.name && (
                  <div style={{ color: 'red', marginBottom: '5px' }}>{validationErrors.name}</div>
              )}
              <input
                type="number"
                placeholder="Price"
                value={newPackage.price}
                onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                style={{
                  marginBottom: '5px',
                  padding: '10px',
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
              {validationErrors.price && (
                  <div style={{ color: 'red', marginBottom: '5px' }}>{validationErrors.price}</div>
              )}
              <input
                type="text"
                placeholder="Duration"
                value={newPackage.duration}
                onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                style={{
                  marginBottom: '5px',
                  padding: '10px',
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
              {validationErrors.duration && (
                  <div style={{ color: 'red', marginBottom: '5px' }}>{validationErrors.duration}</div>
              )}
              <textarea
                placeholder="Features"
                value={newPackage.features}
                onChange={(e) => setNewPackage({ ...newPackage, features: e.target.value })}
                style={{
                  marginBottom: '5px',
                  padding: '10px',
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
              {validationErrors.features && (
                  <div style={{ color: 'red', marginBottom: '5px' }}>{validationErrors.features}</div>
              )}
              <button
                style={{
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
                onClick={handleAddPackage}
              >
                Add
              </button>
              <button
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
      </div>
    );
  }