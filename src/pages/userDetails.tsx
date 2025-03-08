import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfileData {
  fullName: string;
  age: string;
  gender: string;
  location: string;
  occupation: string;
  phoneNumber: string;
  interests: string[];
}

export default function UserProfileDetails() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [availableInterests] = useState([
    "Technology", "Sports", "Music", "Movies", "Books", 
    "Travel", "Food", "Fashion", "Art", "Gaming"
  ]);

  // User profile data
  const [profileData, setProfileData] = useState<UserProfileData>({
    fullName: "",
    age: "",
    gender: "",
    location: "",
    occupation: "",
    phoneNumber: "",
    interests: []
  });

  // Get user email from token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // This is a simplified example - in production, properly decode the JWT
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      setEmail(payload.email);
      
      // Check if user already has profile data
      fetchUserProfile(payload.email);
    } catch (err) {
      console.error("Error decoding token:", err);
      navigate("/login");
    }
  }, [navigate]);

  // Fetch existing user profile if available
  const fetchUserProfile = async (userEmail: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/users/profile?email=${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setProfileData(data.user);
        }
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  // Handle interest selection
  const handleInterestToggle = (interest: string) => {
    if (profileData.interests.includes(interest)) {
      setProfileData({
        ...profileData,
        interests: profileData.interests.filter(item => item !== interest)
      });
    } else {
      setProfileData({
        ...profileData,
        interests: [...profileData.interests, interest]
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          email,
          ...profileData
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to save profile data");
      }

      console.log("Profile data saved successfully:", data);
      setSuccess(true);
      
      // Redirect to dashboard after successful profile save
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (err: any) {
      console.error("Profile save error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
            </div>
            <h1 className="text-2xl font-bold text-slate-800">ShopMart</h1>
          </div>
        </div>

        {/* Profile Details Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Profile</h2>
            <p className="text-gray-500 mb-6">Please provide your details to enhance your shopping experience</p>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                Profile saved successfully! Redirecting to dashboard...
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="1"
                      max="120"
                      value={profileData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Age"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={profileData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={profileData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="+91 12345-67891"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="City, Country"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                    Occupation
                  </label>
                  <input
                    id="occupation"
                    name="occupation"
                    type="text"
                    value={profileData.occupation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableInterests.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          profileData.interests.includes(interest)
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : 'bg-gray-100 text-gray-800 border-gray-200'
                        } border`}>
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      Save Profile
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
              By completing your profile, you help us provide a more personalized shopping experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
