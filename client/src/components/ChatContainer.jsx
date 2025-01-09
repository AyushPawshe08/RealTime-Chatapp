import React, { useEffect, useRef } from 'react';
import MessageSkeleton from './skeletons/MessageSkeleton';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    selectedUser,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeMessages, // Correct function name here
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeMessages(); // Correct function name here
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-gray-100">
        <p className="text-gray-500">Select a user to start chatting!</p>
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-gray-100">
      <ChatHeader />
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSentByAuthUser = message.senderId === authUser._id;

          const profilePic =
            isSentByAuthUser
              ? authUser.profilePic || '/avatar.jpg'
              : selectedUser.profilePic || '/avatar.jpg';

          return (
            <div
              key={message._id}
              className={`flex items-start ${isSentByAuthUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isSentByAuthUser && (
                <img
                  className="w-10 h-10 rounded-full object-cover mr-2"
                  src={profilePic}
                  alt="profile pic"
                />
              )}
              <div className="flex flex-col items-start space-y-1 max-w-xs">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-full rounded-lg mb-1"
                  />
                )}
                {message.text && (
                  <div
                    className={`px-4 py-2 rounded-lg text-sm ${
                      isSentByAuthUser
                        ? 'bg-gray-200 text-gray-800 rounded-br-none self-end'
                        : 'bg-white text-gray-800 rounded-bl-none self-start'
                    }`}
                  >
                    {message.text}
                  </div>
                )}
                <time className="text-xs text-gray-500 mt-1 self-end">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </div>
              {isSentByAuthUser && (
                <img
                  className="w-10 h-10 rounded-full object-cover ml-2"
                  src={profilePic}
                  alt="profile pic"
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
