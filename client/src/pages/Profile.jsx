import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, CircleArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Back Button */}
      <Link to="/" className="flex items-center gap-3 text-xl text-gray-700 mx-6">
        <CircleArrowLeft className="w-6 h-6 text-gray-700" /> Back
      </Link>

      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl space-y-8">
        {/* Profile Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Profile</h1>
          <p className="mt-2 text-lg text-gray-600">Your profile information</p>
        </div>

        {/* Avatar Upload Section */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-white p-3 rounded-full cursor-pointer shadow-md hover:scale-110 transition-all ${
                isUpdatingProfile ? "pointer-events-none" : ""
              }`}
            >
              <Camera className="w-8 h-8 text-gray-700" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-gray-500">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </div>

        {/* Profile Details */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="text-md text-gray-500 flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              Full Name
            </div>
            <p className="px-6 py-3 bg-gray-50 rounded-lg border text-xl font-semibold text-gray-700">
              {authUser?.fullName}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-md text-gray-500 flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              Email Address
            </div>
            <p className="px-6 py-3 bg-gray-50 rounded-lg border text-xl font-semibold text-gray-700">
              {authUser?.email}
            </p>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Profile;
