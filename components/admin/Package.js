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
import { desc, eq } from 'drizzle-orm';
import alertify from 'alertifyjs';
import DataTable from 'react-data-table-component';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";

import 'alertifyjs/build/css/alertify.min.css';

export default function PackageListing() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // NEW: Edit mode state
  const [loading, setLoading] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null); // NEW: Selected plan ID
  const [newPackage, setNewPackage] = useState({
    type: '',
    name: '',
    price: '',
    features: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    type: '',
    name: '',
    price: '',
    features: '',
  });

  useEffect(() => {
    GetPlan();
  }, []);

  const GetPlan = async () => {
    try {
      const getPlans = await db
        .select()
        .from(Plan)
        .orderBy(desc(Plan.id));
      setItems(getPlans);
      setFilteredItems(getPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      alertify.error('Failed to fetch plans.');
    }
  };

  useEffect(() => {
    const result = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.features.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(result);
  }, [search, items]);

  const validateFields = () => {
    const errors = {};
    if (!newPackage.type) errors.type = 'Plan type is required';
    if (!newPackage.name) errors.name = 'Plan name is required';
    if (!newPackage.price) errors.price = 'Price is required';
    if (!newPackage.features) errors.features = 'Features are required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddOrEditPackage = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true);

      if (isEditMode && selectedPlanId) {
        // Edit mode: Update the existing plan
        await db
          .update(Plan)
          .set({
            type: newPackage.type,
            name: newPackage.name,
            price: parseInt(newPackage.price, 10),
            features: newPackage.features,
          })
          .where(eq(Plan.id, selectedPlanId));

        alertify.success('Plan updated successfully');
      } else {
        // Add mode: Insert a new plan
        await db.insert(Plan).values({
          type: newPackage.type,
          name: newPackage.name,
          price: parseInt(newPackage.price, 10),
          features: newPackage.features,
          createdAt: new Date().toISOString(),
        });

        alertify.success('Plan added successfully');
      }

      await GetPlan();
      resetModal();
    } catch (error) {
      console.error('Error saving Plan:', error);
      alertify.error('Failed to save the Plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setIsEditMode(true);
    setSelectedPlanId(plan.id);
    setNewPackage({
      type: plan.type,
      name: plan.name,
      price: plan.price.toString(),
      features: plan.features,
    });
    setIsModalOpen(true);
  };

  const resetModal = () => {
    setIsEditMode(false);
    setSelectedPlanId(null);
    setNewPackage({ type: '', name: '', price: '', features: '' });
    setValidationErrors({});
    setIsModalOpen(false);
  };

  const handleCheckPlan = () => {
    GetPlan();
    if (items.length > 2) {
      alertify.error(
        'Limit Reached',
        'You have already added 2 plans. Please update an existing plan or delete a plan.'
      );
    } else {
      resetModal();
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id) => {
    alertify.confirm(
      'Delete Plan',
      'Are you sure you want to delete this plan?',
      async () => {
        try {
          await db.delete(Plan).where(eq(Plan.id, id));
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

  const columns = [
    { name: 'Package Name', selector: (row) => row.name, sortable: true },
    { name: 'Price ($)', selector: (row) => row.price, sortable: true },
    { name: 'Features', selector: (row) => row.features },
    { name: 'Created At', selector: (row) => new Date(row.createdAt).toLocaleString() },
    {
      name: 'Actions',
      width: '200px', // Set desired width here
      cell: (row) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
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
        </div>
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
          float: 'right',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
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
        paginationPerPage={5}
      />

      <Dialog open={isModalOpen} onOpenChange={resetModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              {isEditMode ? 'Edit Plan' : 'Add New Plan'}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={(e) => { e.preventDefault(); handleAddOrEditPackage(); }}>
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
                <Button type="button" variant="ghost" onClick={resetModal}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    isEditMode ? 'Update' : 'Add'
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
