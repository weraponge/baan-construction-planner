
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clipboard, Truck, Clock, TrendingUp } from 'lucide-react';

const dashboardData = [
  { name: 'Jan', budget: 4000, actual: 2400 },
  { name: 'Feb', budget: 3000, actual: 1398 },
  { name: 'Mar', budget: 2000, actual: 9800 },
  { name: 'Apr', budget: 2780, actual: 3908 },
  { name: 'May', budget: 1890, actual: 4800 },
  { name: 'Jun', budget: 2390, actual: 3800 },
];

const projectsData = [
  { id: 1, name: 'Villa Renovation', status: 'In Progress', completion: 65, budget: '₿1,200,000' },
  { id: 2, name: 'Office Building', status: 'Planning', completion: 15, budget: '₿3,500,000' },
  { id: 3, name: 'Residential Complex', status: 'On Hold', completion: 40, budget: '₿8,750,000' },
  { id: 4, name: 'Shopping Mall', status: 'Completed', completion: 100, budget: '₿12,500,000' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Clipboard className="h-4 w-4 text-construction-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-construction-blue">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
            <Truck className="h-4 w-4 text-construction-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-construction-blue">248</div>
            <p className="text-xs text-muted-foreground">42 require restocking</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
            <Clock className="h-4 w-4 text-construction-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-construction-blue">3.2 months</div>
            <p className="text-xs text-muted-foreground">-0.5 from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-construction-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-construction-blue">₿24.5M</div>
            <p className="text-xs text-muted-foreground">+18% from last year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget vs. Actual Spending</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dashboardData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#0F3057" name="Budget" />
                <Bar dataKey="actual" fill="#F9A826" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectsData.map((project) => (
                <div key={project.id} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium text-sm">{project.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'Planning' ? 'bg-purple-100 text-purple-800' :
                      project.status === 'On Hold' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>{project.status}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Completion: {project.completion}%</span>
                    <span>Budget: {project.budget}</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
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
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
