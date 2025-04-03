
import React from 'react';
import Navbar from '@/components/Navbar';
import ProjectPlanning from '@/components/ProjectPlanning';
import { Toaster } from "@/components/ui/toaster";

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-construction-blue mb-6">Project Planning</h1>
        <ProjectPlanning />
      </div>
      <Toaster />
    </div>
  );
};

export default Projects;
