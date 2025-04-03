
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calculator, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Material categories and items
const materialCategories = [
  {
    name: "Concrete and Cement",
    items: [
      { name: "Portland Cement", unit: "Bag", rate: 280 },
      { name: "Ready-Mix Concrete", unit: "Cu.m", rate: 3600 },
      { name: "Reinforcement Steel", unit: "Ton", rate: 38000 },
    ],
  },
  {
    name: "Wood and Timber",
    items: [
      { name: "Plywood (4x8)", unit: "Sheet", rate: 850 },
      { name: "Lumber (2x4)", unit: "Board", rate: 120 },
      { name: "Hardwood Flooring", unit: "Sq.m", rate: 2200 },
    ],
  },
  {
    name: "Bricks and Blocks",
    items: [
      { name: "Standard Clay Brick", unit: "Piece", rate: 12 },
      { name: "Concrete Block (8x8x16)", unit: "Piece", rate: 45 },
      { name: "AAC Block", unit: "Piece", rate: 75 },
    ],
  },
  {
    name: "Finishes",
    items: [
      { name: "Interior Paint", unit: "Gallon", rate: 950 },
      { name: "Ceramic Tile", unit: "Sq.m", rate: 450 },
      { name: "Laminate Flooring", unit: "Sq.m", rate: 850 },
    ],
  },
];

// Labor categories and rates
const laborCategories = [
  {
    name: "General Labor",
    items: [
      { name: "Unskilled Labor", unit: "Day", rate: 600 },
      { name: "Semi-skilled Labor", unit: "Day", rate: 800 },
      { name: "Skilled Labor", unit: "Day", rate: 1200 },
    ],
  },
  {
    name: "Specialized Labor",
    items: [
      { name: "Electrician", unit: "Day", rate: 1500 },
      { name: "Plumber", unit: "Day", rate: 1500 },
      { name: "Mason", unit: "Day", rate: 1300 },
      { name: "Carpenter", unit: "Day", rate: 1200 },
      { name: "Painter", unit: "Day", rate: 1000 },
    ],
  },
];

type EstimateItem = {
  id: string;
  category: string;
  item: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
};

const CostEstimator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'materials' | 'labor'>('materials');
  const [projectName, setProjectName] = useState("");
  const [estimateItems, setEstimateItems] = useState<EstimateItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState("");
  
  // Get items for selected category
  const getItemsForCategory = () => {
    if (!selectedCategory) return [];
    
    if (activeTab === 'materials') {
      const category = materialCategories.find(cat => cat.name === selectedCategory);
      return category ? category.items : [];
    } else {
      const category = laborCategories.find(cat => cat.name === selectedCategory);
      return category ? category.items : [];
    }
  };

  // Get details for selected item
  const getSelectedItemDetails = () => {
    const items = getItemsForCategory();
    return items.find(item => item.name === selectedItem);
  };
  
  // Add item to estimate
  const addItemToEstimate = () => {
    const itemDetails = getSelectedItemDetails();
    
    if (!itemDetails) {
      toast({
        title: "Error",
        description: "Please select an item.",
        variant: "destructive",
      });
      return;
    }
    
    const amount = itemDetails.rate * quantity;
    
    const newItem: EstimateItem = {
      id: Math.random().toString(36).substring(2, 9),
      category: selectedCategory,
      item: selectedItem,
      description: description || selectedItem,
      quantity,
      unit: itemDetails.unit,
      rate: itemDetails.rate,
      amount,
    };
    
    setEstimateItems([...estimateItems, newItem]);
    
    toast({
      title: "Item Added",
      description: `${selectedItem} has been added to your estimate.`,
    });
    
    // Clear form for next entry
    setDescription("");
    setQuantity(1);
  };
  
  // Remove item from estimate
  const removeItem = (id: string) => {
    setEstimateItems(estimateItems.filter(item => item.id !== id));
    
    toast({
      title: "Item Removed",
      description: "The item has been removed from your estimate.",
    });
  };
  
  // Calculate totals
  const calculateTotal = () => {
    return estimateItems.reduce((total, item) => total + item.amount, 0);
  };
  
  // Save estimate
  const saveEstimate = () => {
    if (!projectName) {
      toast({
        title: "Error",
        description: "Please enter a project name.",
        variant: "destructive",
      });
      return;
    }
    
    if (estimateItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one item to your estimate.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Estimate Saved",
      description: `Your estimate for ${projectName} has been saved.`,
    });
    
    // In a real application, this would save the estimate to a database
    console.log("Saving estimate:", { projectName, items: estimateItems, total: calculateTotal() });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-2 h-5 w-5" />
            Cost Estimator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="mt-1"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant={activeTab === 'materials' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('materials')}
                className={activeTab === 'materials' ? 'bg-construction-blue' : ''}
              >
                Materials
              </Button>
              <Button 
                variant={activeTab === 'labor' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('labor')}
                className={activeTab === 'labor' ? 'bg-construction-blue' : ''}
              >
                Labor
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {(activeTab === 'materials' ? materialCategories : laborCategories).map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="item">Item</Label>
                <Select
                  value={selectedItem}
                  onValueChange={setSelectedItem}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger id="item" className="mt-1">
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    {getItemsForCategory().map((item) => (
                      <SelectItem key={item.name} value={item.name}>
                        {item.name} (₿{item.rate}/{item.unit})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Additional details"
                  className="mt-1"
                />
              </div>
            </div>
            
            <Button onClick={addItemToEstimate} className="bg-construction-yellow text-construction-blue hover:bg-opacity-90 w-full md:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add to Estimate
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <h3 className="text-lg font-medium mb-4">Estimate Items</h3>
            
            {estimateItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No items added to this estimate yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-2">Description</th>
                      <th className="text-left px-4 py-2">Qty</th>
                      <th className="text-left px-4 py-2">Unit</th>
                      <th className="text-right px-4 py-2">Rate (₿)</th>
                      <th className="text-right px-4 py-2">Amount (₿)</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimateItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="px-4 py-2">
                          <div className="font-medium">{item.description}</div>
                          <div className="text-xs text-gray-500">{item.category}</div>
                        </td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">{item.unit}</td>
                        <td className="text-right px-4 py-2">{item.rate.toLocaleString()}</td>
                        <td className="text-right px-4 py-2">{item.amount.toLocaleString()}</td>
                        <td className="px-4 py-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="px-4 py-2 text-right font-medium">Total</td>
                      <td className="text-right px-4 py-2 font-medium">₿{calculateTotal().toLocaleString()}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button 
            onClick={saveEstimate}
            disabled={estimateItems.length === 0 || !projectName}
            className="bg-construction-blue hover:bg-opacity-90"
          >
            Save Estimate
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CostEstimator;
