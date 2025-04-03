
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Package2, AlertTriangle, PlusCircle, Filter, ArrowUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

// Sample inventory data
const inventoryItems = [
  {
    id: 1,
    name: "Portland Cement",
    category: "Concrete Materials",
    unit: "Bags",
    inStock: 120,
    minStock: 50,
    price: 280,
    supplier: "Cement Supplies Co.",
    lastRestocked: "2023-08-15",
  },
  {
    id: 2,
    name: "Steel Rebar (12mm)",
    category: "Steel & Metal",
    unit: "Tons",
    inStock: 5.2,
    minStock: 3,
    price: 38000,
    supplier: "Steel Industries Ltd.",
    lastRestocked: "2023-09-02",
  },
  {
    id: 3,
    name: "Bricks",
    category: "Masonry",
    unit: "Pieces",
    inStock: 2500,
    minStock: 1000,
    price: 12,
    supplier: "Brick Works Inc.",
    lastRestocked: "2023-09-25",
  },
  {
    id: 4,
    name: "Sand",
    category: "Aggregates",
    unit: "Cubic Meters",
    inStock: 18,
    minStock: 15,
    price: 1200,
    supplier: "Aggregates Supply Inc.",
    lastRestocked: "2023-10-05",
  },
  {
    id: 5,
    name: "PVC Pipes (4-inch)",
    category: "Plumbing",
    unit: "Pieces",
    inStock: 35,
    minStock: 40,
    price: 320,
    supplier: "Plumbing Wholesale Co.",
    lastRestocked: "2023-08-20",
  },
  {
    id: 6,
    name: "2x4 Lumber",
    category: "Wood & Timber",
    unit: "Pieces",
    inStock: 180,
    minStock: 100,
    price: 120,
    supplier: "Timber Yard Co.",
    lastRestocked: "2023-09-12",
  },
  {
    id: 7,
    name: "Paint - Interior White",
    category: "Finishes",
    unit: "Gallons",
    inStock: 28,
    minStock: 20,
    price: 950,
    supplier: "Paint Masters Ltd.",
    lastRestocked: "2023-10-10",
  },
  {
    id: 8,
    name: "Ceramic Tiles",
    category: "Finishes",
    unit: "Boxes",
    inStock: 42,
    minStock: 30,
    price: 1350,
    supplier: "Tile Specialists Inc.",
    lastRestocked: "2023-09-28",
  },
];

// Sample categories
const categories = [
  "All Categories",
  "Concrete Materials",
  "Steel & Metal",
  "Masonry",
  "Aggregates",
  "Plumbing",
  "Wood & Timber",
  "Finishes",
  "Tools & Equipment",
  "Electrical",
];

// Sample suppliers
const suppliers = [
  "All Suppliers",
  "Cement Supplies Co.",
  "Steel Industries Ltd.",
  "Brick Works Inc.",
  "Aggregates Supply Inc.",
  "Plumbing Wholesale Co.",
  "Timber Yard Co.",
  "Paint Masters Ltd.",
  "Tile Specialists Inc."
];

const Inventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSupplier, setSelectedSupplier] = useState("All Suppliers");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  
  // Filter inventory based on search term and filters
  const filteredInventory = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    const matchesSupplier = selectedSupplier === "All Suppliers" || item.supplier === selectedSupplier;
    
    return matchesSearch && matchesCategory && matchesSupplier;
  });
  
  // Sort inventory based on sortConfig
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const key = sortConfig.key as keyof typeof a;
    
    if (a[key] < b[key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Handle sort request
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Get stock status
  const getStockStatus = (item: typeof inventoryItems[0]) => {
    if (item.inStock <= 0) {
      return { label: "Out of Stock", className: "bg-red-100 text-red-800" };
    } else if (item.inStock < item.minStock) {
      return { label: "Low Stock", className: "bg-orange-100 text-orange-800" };
    } else {
      return { label: "In Stock", className: "bg-green-100 text-green-800" };
    }
  };
  
  // Restock an item
  const restockItem = (itemId: number) => {
    toast({
      title: "Restock Request Sent",
      description: "A restock request has been sent to the supplier.",
    });
    console.log(`Restock request sent for item ID: ${itemId}`);
  };
  
  // Low stock items
  const lowStockItems = inventoryItems.filter(item => item.inStock < item.minStock);

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Package2 className="mr-2 h-5 w-5" />
            Inventory Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all-items" className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <TabsList>
                <TabsTrigger value="all-items">All Items</TabsTrigger>
                <TabsTrigger value="low-stock" className="flex items-center">
                  <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                  Low Stock
                  {lowStockItems.length > 0 && (
                    <Badge className="ml-1.5 bg-red-500">{lowStockItems.length}</Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <Button className="bg-construction-yellow text-construction-blue hover:bg-opacity-90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Item
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search inventory..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-4">
                  <div className="w-40">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center">
                          <Filter className="mr-2 h-4 w-4" />
                          <span className="truncate">Category</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-40">
                    <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center">
                          <Filter className="mr-2 h-4 w-4" />
                          <span className="truncate">Supplier</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier} value={supplier}>
                            {supplier}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <TabsContent value="all-items" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">
                          <button 
                            onClick={() => requestSort('name')}
                            className="flex items-center hover:text-construction-blue"
                          >
                            Item Name
                            <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
                          </button>
                        </TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">
                          <button 
                            onClick={() => requestSort('inStock')}
                            className="flex items-center hover:text-construction-blue"
                          >
                            In Stock
                            <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
                          </button>
                        </TableHead>
                        <TableHead className="text-right">Unit</TableHead>
                        <TableHead className="text-right">
                          <button 
                            onClick={() => requestSort('price')}
                            className="flex items-center hover:text-construction-blue"
                          >
                            Price (₿)
                            <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
                          </button>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedInventory.map((item) => {
                        const stockStatus = getStockStatus(item);
                        return (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.name}
                              <div className="text-xs text-gray-500 mt-0.5">{item.supplier}</div>
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell className="text-right">{item.inStock}</TableCell>
                            <TableCell className="text-right">{item.unit}</TableCell>
                            <TableCell className="text-right">{item.price.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge className={stockStatus.className}>
                                {stockStatus.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => restockItem(item.id)}
                                disabled={item.inStock >= item.minStock}
                              >
                                Restock
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {sortedInventory.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="h-32 text-center">
                            No inventory items found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="low-stock" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">In Stock</TableHead>
                        <TableHead className="text-right">Min Stock</TableHead>
                        <TableHead className="text-right">Shortage</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lowStockItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell className="text-right">{item.inStock}</TableCell>
                          <TableCell className="text-right">{item.minStock}</TableCell>
                          <TableCell className="text-right">{(item.minStock - item.inStock).toFixed(1)}</TableCell>
                          <TableCell>{item.supplier}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => restockItem(item.id)}
                            >
                              Restock
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {lowStockItems.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="h-32 text-center">
                            No items currently low in stock. Your inventory is well-stocked!
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
