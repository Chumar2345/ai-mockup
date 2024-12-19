'use client';

import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Plan } from "@/utils/schema";
import { db } from "@/utils/db";
import { desc,eq } from 'drizzle-orm';
import alertify from 'alertifyjs';
import DataTable from 'react-data-table-component';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";

import 'alertifyjs/build/css/alertify.min.css';

export default function PackageListing() {
  const [items, setItems] = useState([]); // State for all packages
  const [filteredItems, setFilteredItems] = useState([]); // State for search/filter
  const [search, setSearch] = useState(''); // State for search query
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [loading, setLoading] = useState(false);
  const [newPackage, setNewPackage] = useState({
    type: '',
    name: '',
    price: '',
    // duration: '',
    features: '',
  }); // New package state

  const [validationErrors, setValidationErrors] = useState({
    type: '',
    name: '',
    price: '',
    // duration: '',
    features: '',
  });

  useEffect(() => {
    GetPlan();
  }, []);

  // Fetch Plans from the database
  const GetPlan = async () => {
    try {
      const getPlans = await db
        .select()
        .from(Plan)
        .orderBy(desc(Plan.id)); // Fetch plans in descending order by ID
      setItems(getPlans); // Set the fetched items
      setFilteredItems(getPlans); // Set filtered items for search functionality
    } catch (error) {
      console.error('Error fetching plans:', error);
      alertify.error('Failed to fetch plans.');
    }
  };

  // Handle search
  useEffect(() => {
    const result = items.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.features.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredItems(result); // Update filtered items based on search
  }, [search, items]);

  const validateFields = () => {
    const errors = {};
    if (!newPackage.type) errors.type = 'Plan type is required';
    if (!newPackage.name) errors.name = 'Plan name is required';
    if (!newPackage.price) errors.price = 'Price is required';
    // if (!newPackage.duration) errors.duration = 'Duration is required';
    if (!newPackage.features) errors.features = 'Features are required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const handleAddPackage = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true);
      // Insert the new package into the database
      await db.insert(Plan).values({
        type: newPackage.type,
        name: newPackage.name,
        price: parseInt(newPackage.price, 10),
        features: newPackage.features,
        createdAt: new Date().toISOString(),
      });

      // Fetch updated plans after adding the new package
      await GetPlan();

      setNewPackage({ type: '', name: '', price: '', features: '' }); // Reset form
      setValidationErrors({});
      setIsModalOpen(false);
      alertify.success('Plan added successfully');
    } catch (error) {
      console.error('Error adding Plan:', error);
      alertify.error('Failed to add the Plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    alertify.confirm(
      'Delete Plan',
      'Are you sure you want to delete this plan?',
      async () => {
        try {
          // Delete the plan from the database
          await db.delete(Plan).where(eq(Plan.id, id));
  
          // Update the state after successful deletion
          setItems((prevItems) => prevItems.filter((item) => item.id !== id));
          setFilteredItems((prevItems) => prevItems.filter((item) => item.id !== id));
  
          alertify.success('Plan deleted successfully');
        } catch (error) {
          console.error('Error deleting plan:', error);
          alertify.error('Failed to delete the plan. Please try again.');
        }
      },
      () => {
        alertify.error('Delete operation cancelled');
      }
    );
  };
  

  const handleCheckPlan = () => {
    GetPlan();
    console.log(items);
    if(items.length > 2){
        alertify.error('Limit Reached', 'You have already added 2 plans. Please update an existing plan or delete the first/new plan.');

    } else {
        setIsModalOpen(true);
    }       
 };

  // Define Table Columns
  const columns = [
    { name: 'Package Name', selector: (row) => row.name, sortable: true },
    { name: 'Price ($)', selector: (row) => row.price , sortable: true },
    // { name: 'Duration', selector: (row) => row.duration },
    { name: 'Features', selector: (row) => row.features },
    { name: 'Created At', selector: (row) => new Date(row.createdAt).toLocaleString() },
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
      <h2 style={{ marginBottom: '20px' }}>Plan Listing</h2>

      <button
        style={{
          position: 'absolute',
          right: '22px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight:"20px",
        }}
        onClick={handleCheckPlan}
      >
        Add Plan
      </button>

      <input
        type="text"
        placeholder="Search by Name or Features"
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

      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        highlightOnHover
        responsive
        defaultSortFieldId={1}
        paginationPerPage={5} // Show 5 rows per page
      />

      <Dialog open={isModalOpen} onOpenChange={handleCheckPlan}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Add New Plan
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={handleAddPackage}>
              <div className="mt-7 my-3">
                <label>Plan Type</label>
                <Input
                  placeholder="Plan Type"
                  required
                  value={newPackage.type}
                  onChange={(e) => setNewPackage({ ...newPackage, type: e.target.value })}
                />
                {validationErrors.type && <div style={{ color: 'red' }}>{validationErrors.type}</div>}
              </div>
              <div className="mt-7 my-3">
                <label>Plan Name</label>
                <Input
                  placeholder="Plan Name"
                  required
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                />
                {validationErrors.name && <div style={{ color: 'red' }}>{validationErrors.name}</div>}
              </div>
              <div className="mt-7 my-3">
                <label>Plan Price</label>
                <Input
                  type="number"
                  placeholder="Price"
                  required
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                />
                {validationErrors.price && <div style={{ color: 'red' }}>{validationErrors.price}</div>}
              </div>
              {/* <div className="mt-7 my-3">
                <label>Duration</label>
                <Input
                  placeholder="Duration"
                  required
                  value={newPackage.duration}
                  onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                />
                {validationErrors.duration && <div style={{ color: 'red' }}>{validationErrors.duration}</div>}
              </div> */}
              <div className="my-3">
                <label>Features</label>
                <Textarea
                  placeholder="Features"
                  required
                  value={newPackage.features}
                  onChange={(e) => setNewPackage({ ...newPackage, features: e.target.value })}
                />
              </div>
              <div className="flex gap-5 justify-end">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Add
                    </>
                  ) : (
                    'Add'
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
