import { LogOut, MessageSquare, User, LogOutIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div className="flex justify-between border-b-2 shadow-md items-center px-4 py-2">
      {/* Logo Section */}
      <div>
        <h1 className="flex items-center gap-2 font-bold bg-blue-300 px-3 py-2 rounded-md">
          <MessageSquare className="text-blue-500 w-5 h-5" />
          Chatify
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-3">
        {authUser && (
          <>
            <Link
              className="flex items-center gap-2 px-3 py-2 bg-green-300 rounded-md text-green-700 hover:bg-green-400 transition"
              to="/profile"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            <button
              className="flex items-center gap-2 px-3 py-2 bg-red-300 rounded-md text-red-700 hover:bg-red-400 transition"
              onClick={logout}
            >
              <LogOutIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
