
import React from 'react';
import Navbar from '@/components/Navbar';
import Inventory from '@/components/Inventory';
import { Toaster } from "@/components/ui/toaster";

const InventoryPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-construction-blue mb-6">Inventory Management</h1>
        <Inventory />
      </div>
      <Toaster />
    </div>
  );
};

export default InventoryPage;
