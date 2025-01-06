import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { User, Mail, Lock, Loader2, Eye, EyeOff, Earth } from 'lucide-react';
import banner from '../../public/banner.png';
import toast from 'react-hot-toast';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full name is required');
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email');
    if (!formData.password) return toast.error('Password is required');
    if (formData.password.length < 6)
      return toast.error('Password must be at least 6 characters');

    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Form Section */}
        <div className="bg-white p-8 shadow-md rounded-lg w-full lg:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h1>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  type="email"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            {/* Password Section with Show/Hide Icon */}
            <div>
              <label className="block text-gray-600 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter password"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>

            <button
              disabled={isSigningUp}
              type="submit"
              className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
                isSigningUp ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                'Create an Account'
              )}
            </button>
          </form>
          <p className="text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Log in
            </Link>
          </p>
        </div>

        {/* Banner Section */}
        <div className="hidden lg:flex flex-col items-center lg:w-1/2 mt-8 lg:mt-0">
          <img src={banner} alt="Signup Banner" className="rounded-lg shadow-md w-3/4" />
          <p className="font-bold mt-4 text-center italic flex gap-2">
            Where every chat turns into a connection <Earth />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
