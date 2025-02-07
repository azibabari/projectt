import React, { useState, useEffect } from 'react';
import { Package, Truck, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    weight: number;
  }[];
  tracking_number?: string;
  estimated_delivery?: string;
}

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-02-20',
    status: 'delivered',
    total: 25000,
    items: [
      {
        id: '1',
        name: 'Premium Ofada Rice',
        quantity: 2,
        price: 12500,
        weight: 5,
      },
    ],
    tracking_number: 'TRK123456',
    estimated_delivery: '2024-02-25',
  },
  {
    id: 'ORD-002',
    date: '2024-02-22',
    status: 'processing',
    total: 36000,
    items: [
      {
        id: '2',
        name: 'Jasmine Long Grain',
        quantity: 2,
        price: 18000,
        weight: 5,
      },
    ],
    tracking_number: 'TRK789012',
    estimated_delivery: '2024-02-27',
  },
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="border-t border-b py-4 my-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x {item.weight}kg
                    </p>
                  </div>
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                {order.tracking_number && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="h-4 w-4 mr-1" />
                    <span>Tracking: {order.tracking_number}</span>
                  </div>
                )}
                {order.estimated_delivery && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Estimated: {new Date(order.estimated_delivery).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <p className="text-lg font-bold">
                Total: {formatPrice(order.total)}
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline">Track Order</Button>
              <Button>Reorder</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;