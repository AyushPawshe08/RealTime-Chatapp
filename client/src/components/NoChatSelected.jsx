import { MessageSquare } from 'lucide-react';
import React from 'react';

const NoChatSelected = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <div className="text-center bg-white p-8 rounded-lg  max-w-md">
        <div className="flex animate-bounce  justify-center items-center mb-4 ">
          <span className='bg-blue-500 rounded-md p-2 text-blue-800'><MessageSquare size={48} /></span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Chatify~!</h1>
        <p className="text-gray-600">
          Select a conversation from the sidebar to <span className="text-blue-500 font-semibold">Start Chatting</span>.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
