import React from 'react';
import { X } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="w-[100%] bg-yellow-200 shadow-md">
      <div className="flex items-center justify-between p-3">
        {/* Profile Info */}
        <div className="flex items-center space-x-3">
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-black"
            src={selectedUser?.profilePic || '/avatar.jpg'}
            alt={selectedUser?.fullName || 'User Avatar'}
          />
          <div>
            <h1 className="text-lg font-medium text-gray-800">
              {selectedUser?.fullName || 'Unknown User'}
            </h1>
            <p
              className={`text-sm ${
                onlineUsers.includes(selectedUser?._id)
                  ? 'text-green-500'
                  : 'text-gray-500'
              }`}
            >
              {onlineUsers.includes(selectedUser?._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
