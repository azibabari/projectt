import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  showAuthModal: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAuthModal }) => {
  const { user } = useAuthStore();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!user) {
      showAuthModal();
      return;
    }
    addItem(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 rounded-full text-sm">
          {product.weight}kg
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-secondary fill-current" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-600">{product.reviews} reviews</span>
        </div>
        <Button
          className="w-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;