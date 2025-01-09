const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-start ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
        >
          {/* Avatar Skeleton */}
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />

          {/* Message Skeleton */}
          <div
            className={`ml-4 ${idx % 2 === 0 ? "mr-auto" : "ml-auto"} space-y-2`}
          >
            {/* Header Skeleton */}
            <div className="w-16 h-4 bg-gray-300 animate-pulse rounded" />
            {/* Chat Bubble Skeleton */}
            <div className="w-[200px] h-6 bg-gray-300 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
