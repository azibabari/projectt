import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = loginSchema.extend({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
});

type LoginInputs = z.infer<typeof loginSchema>;
type RegisterInputs = z.infer<typeof registerSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = React.useState(true);
  const { signIn, signUp } = useAuthStore();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginInputs) => {
    try {
      await signIn(data.email, data.password);
      onClose();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const onRegister = async (data: RegisterInputs) => {
    try {
      await signUp(data.email, data.password, data.full_name);
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isLogin ? 'Login' : 'Create Account'}
          </h2>
          <button onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...registerLogin('email')}
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {loginErrors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {loginErrors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...registerLogin('password')}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {loginErrors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {loginErrors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit(onRegister)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                {...registerSignup('full_name')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {signupErrors.full_name && (
                <p className="mt-1 text-sm text-red-600">
                  {signupErrors.full_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...registerSignup('email')}
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {signupErrors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {signupErrors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...registerSignup('password')}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {signupErrors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {signupErrors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:text-primary-dark"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;