import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { UserRound } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";


const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore(); // Assuming this will be dynamically populated.

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <div className="h-full w-20 lg:w-72 border-r border-gray-300 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 gap-3 border-b border-gray-300 text-xl font-bold bg-white">
        <UserRound className="text-gray-600" />
        <span className="hidden lg:block">Chats</span>
      </div>

     
      {/* User List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex w-full items-center p-3 gap-3 transition-colors hover:bg-gray-100 ${
              selectedUser?._id === user._id
                ? "bg-gray-100 ring-2 ring-gray-300"
                : ""
            }`}
          >
            {/* User Avatar */}
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.jpg"}
                alt={user.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0">
              <p className="font-medium">{user.fullName}</p>
              <span
                className={`text-sm ${
                  onlineUsers.includes(user._id)
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
