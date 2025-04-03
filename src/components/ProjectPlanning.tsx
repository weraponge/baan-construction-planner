
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CalendarCheck, File, Search, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample project data
const projects = [
  {
    id: 1,
    name: "Villa Renovation Project",
    client: "John Doe",
    startDate: "2023-08-15",
    endDate: "2023-12-20",
    status: "In Progress",
    completion: 65,
    tasks: 24,
    completedTasks: 16,
  },
  {
    id: 2,
    name: "Office Building Construction",
    client: "ABC Corporation",
    startDate: "2023-10-05",
    endDate: "2024-06-30",
    status: "Planning",
    completion: 15,
    tasks: 42,
    completedTasks: 6,
  },
  {
    id: 3,
    name: "Residential Complex Development",
    client: "XYZ Developers",
    startDate: "2023-05-20",
    endDate: "2024-11-15",
    status: "On Hold",
    completion: 40,
    tasks: 86,
    completedTasks: 34,
  },
  {
    id: 4,
    name: "Shopping Mall Renovation",
    client: "Retail Group Inc.",
    startDate: "2023-02-10",
    endDate: "2023-09-30",
    status: "Completed",
    completion: 100,
    tasks: 68,
    completedTasks: 68,
  },
];

// Upcoming tasks (sample)
const upcomingTasks = [
  { id: 1, name: "Foundation inspection", project: "Villa Renovation", dueDate: "Tomorrow", priority: "High" },
  { id: 2, name: "Material delivery", project: "Office Building", dueDate: "In 2 days", priority: "Medium" },
  { id: 3, name: "Client meeting", project: "Residential Complex", dueDate: "Today", priority: "High" },
  { id: 4, name: "Finalize blueprints", project: "Shopping Mall", dueDate: "In 3 days", priority: "Low" },
];

const ProjectPlanning = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => 
          project.name.toLowerCase().includes(term.toLowerCase()) || 
          project.client.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  return (
    <Tabs defaultValue="all-projects" className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <TabsList>
          <TabsTrigger value="all-projects">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button className="bg-construction-yellow text-construction-blue hover:bg-opacity-90">
            New Project
          </Button>
        </div>
      </div>

      <TabsContent value="all-projects" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-construction-blue">{project.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      {project.client}
                    </CardDescription>
                  </div>
                  <Badge
                    className={`
                      ${project.status === 'In Progress' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                        project.status === 'Planning' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
                        project.status === 'On Hold' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' :
                        'bg-green-100 text-green-800 hover:bg-green-200'}
                    `}
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarCheck className="h-3.5 w-3.5 mr-1" />
                      <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Completion: {project.completion}%</span>
                      <span>Tasks: {project.completedTasks}/{project.tasks}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          project.status === 'In Progress' ? 'bg-blue-600' :
                          project.status === 'Planning' ? 'bg-purple-600' :
                          project.status === 'On Hold' ? 'bg-orange-400' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="pt-2 flex justify-between">
                    <Button variant="outline" size="sm" className="text-xs">
                      <File className="h-3.5 w-3.5 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      Team
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No projects found matching your search.</p>
          </div>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-medium">{task.name}</h4>
                    <p className="text-sm text-gray-500">{task.project}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm">{task.dueDate}</span>
                    <Badge variant="outline" className={`text-xs mt-1 ${
                      task.priority === 'High' ? 'border-red-500 text-red-500' :
                      task.priority === 'Medium' ? 'border-orange-500 text-orange-500' :
                      'border-green-500 text-green-500'
                    }`}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="active" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects
            .filter(project => project.status === "In Progress")
            .map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-construction-blue">{project.name}</CardTitle>
                  <CardDescription>{project.client}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Same content as in all-projects */}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>
      
      {/* Similar TabsContent for "planning" and "completed" would go here */}
    </Tabs>
  );
};

export default ProjectPlanning;
