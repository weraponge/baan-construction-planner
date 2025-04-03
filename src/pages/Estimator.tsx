
import React from 'react';
import Navbar from '@/components/Navbar';
import CostEstimator from '@/components/CostEstimator';
import { Toaster } from "@/components/ui/toaster";

const Estimator = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-construction-blue mb-6">Cost Estimator</h1>
        <CostEstimator />
      </div>
      <Toaster />
    </div>
  );
};

export default Estimator;
