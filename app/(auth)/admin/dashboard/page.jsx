"use client";
import React, { useState,useEffect } from "react";
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import Listing from '@/components/admin/Listing';
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      router.push('/admin/login');
    } else {
      console.log("1111")
      try {
        router.push('/admin/dashboard');
        // const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        // console.log(decoded)
        // if (decoded.role !== 'admin') {
        //   throw new Error('Unauthorized');
        // }
      } catch (err) {
        localStorage.removeItem('token');
        router.push('/admin/login');
      }
    }
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header at the Top */}
      <Header />

      {/* Main Content Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',

                  padding: '20px',
                  backgroundColor: '#f9fafb',
                  minHeight: '100vh'
            }}>
              <div style={{
                width: '100%', 
                maxWidth: '1100px',
                backgroundColor: '#fff',  
                borderRadius: '8px',      
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
              }}>
                <Listing />
              </div>
            </main>

      </div>
    </div>
  );
}
