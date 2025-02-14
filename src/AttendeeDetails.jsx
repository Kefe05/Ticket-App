import  { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AttendeeDetails() {
  const navigate = useNavigate();

  // State to store attendee details
  const [attendeeDetails, setAttendeeDetails] = useState({
    name: '',
    email: '',
    specialRequest: '',
    profilePhoto: '', // Store the Cloudinary image URL here
  });

  // State to store validation errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    profilePhoto: '',
  });

  // State to track image upload progress
  const [isUploading, setIsUploading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendeeDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when the user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: 'Please upload a valid image file.',
      }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setErrors((prev) => ({
        ...prev,
        profilePhoto: 'File size must be less than 5MB.',
      }));
      return;
    }
  
    // Prepare form data for Cloudinary upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', "Peenlyy");
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
  
    try {
      setIsUploading(true);
      console.log("formData", formData);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${"dyzanjli6"}/image/upload`,
        formData
      );
  
      // Save the image URL to state
      setAttendeeDetails((prev) => ({
        ...prev,
        profilePhoto: response.data.secure_url,
      }));
      setErrors((prev) => ({
        ...prev,
        profilePhoto: '',
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrors((prev) => ({
        ...prev,
        profilePhoto: 'Failed to upload image. Please try again.',
      }));
    } finally {
      setIsUploading(false);
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!attendeeDetails.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!attendeeDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendeeDetails.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Profile photo validation
    if (!attendeeDetails.profilePhoto) {
      newErrors.profilePhoto = 'Profile photo is required';
    }

    // Set errors
    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle "Back" button click
  const handleBack = () => {
    navigate('/');
  };

  // Handle "Next" button click
  const handleNext = () => {
    // Validate the form
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    // Retrieve ticketDetails from localStorage
    const ticketDetails = JSON.parse(localStorage.getItem('ticketDetails'));

    // Add attendee details to the ticketDetails object
    const updatedTicketDetails = {
      ...ticketDetails,
      attendeeDetails,
    };

    // Save the updated object back to localStorage
    localStorage.setItem('ticketDetails', JSON.stringify(updatedTicketDetails));

    // Navigate to the next step
    navigate('/ticket');
  };

  return (
    <div className=" border-none p-3  sm:border  sm:border-solid sm:border-[#0E464F] 
      w-[95vw] sm:w-[650px] mx-auto sm:p-5 rounded-xl bg-[#041E23] flex flex-col gap-5">
      <div className="card-header flex justify-between items-center">
        <h2 className="jeju text-xl">Attendee Details</h2>
        <div className="roboto text-xs">Step 2/3</div>
      </div>
      <div className='bg-[#0E464F] w-full h-[2px] rounded-xl'>
        <div className="bg-[#24A0B5] w-[45%] h-full"></div>
      </div>
      <div className="border border-[#0E464F] bg-[#08252B] p-6 rounded-xl flex flex-col gap-3">
        <div className="border border-[#07373F] bg-[#052228] p-6 rounded-xl intro flex flex-col gap-3">
          <p>Upload Profile Photo</p>
          <div className="bg-black/20 h-40 relative">
            <div className="bg-[#0E464F] border-2 h-[175px] border-[#24A0B5] sm:w-[50%]  rounded-xl absolute -top-2 min-[430px]:left-[25%] mx-auto flex items-center justify-center text-gray-50 text-center p-2">
              {isUploading ? (
                <p>Uploading...</p>
              ) : attendeeDetails.profilePhoto ? (
                <img
                  src={attendeeDetails.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <label htmlFor="profilePhoto" className="cursor-pointer flex flex-col gap-2 justify-center items-center">
                  <IoCloudUploadOutline className='text-2xl'/>
                  <span> Drag & drop or click to <br />upload image</span>
                  <input
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
          {errors.profilePhoto && (
            <p className="text-red-500 text-sm">{errors.profilePhoto}</p>
          )}
        </div>

        <hr className="border-[#07373F] border-2" />

        <div className="flex flex-col gap-2">
          <label>Enter your name</label>
          <input
            type="text"
            name="name"
            value={attendeeDetails.name}
            onChange={handleInputChange}
            className={`border ${
              errors.name ? 'border-red-500' : 'border-[#197686]'
            } rounded-lg py-1`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label>Enter your email*</label>
          <input
            type="text"
            name="email"
            value={attendeeDetails.email}
            onChange={handleInputChange}
            className={`border ${
              errors.email ? 'border-red-500' : 'border-[#197686]'
            } rounded-lg py-1`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label>Special request?</label>
          <textarea
            name="specialRequest"
            value={attendeeDetails.specialRequest}
            onChange={handleInputChange}
            className="border border-[#197686] rounded-lg py-1 h-10"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="w-[45%] border rounded-xl border-[#197686] p-2" onClick={handleBack}>
          Back
        </button>
        <button className="w-[45%] bg-[#197686] rounded-xl" onClick={handleNext}>
          Get My Free Ticket
        </button>
      </div>
    </div>
  );
}

export default AttendeeDetails;