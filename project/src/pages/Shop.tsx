import React, { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/shop/ProductCard';
import CartDrawer from '@/components/shop/CartDrawer';
import AuthModal from '@/components/auth/AuthModal';
import { products } from '@/data/products';
import { FilterType, SortOption } from '@/types/product';

const Shop = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activeSort, setActiveSort] = useState<SortOption>('popularity');

  const filteredProducts = products.filter((product) => {
    if (activeFilter === 'all') return true;
    return product.type === activeFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (activeSort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Our Rice Collection</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => {}}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="relative">
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => {}}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        {(['all', 'local', 'foreign'] as FilterType[]).map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'default' : 'ghost'}
            onClick={() => setActiveFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            showAuthModal={() => setIsAuthModalOpen(true)}
          />
        ))}
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Shop;