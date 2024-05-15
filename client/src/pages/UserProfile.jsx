import { UserCard } from '../components/userCard';
import '../../styles.css';
import { useSelector } from 'react-redux';
import anonuser from '../images/home/anonuser.png';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import {
  updateProfilePhoto,
  updateProfilePhotoURL,
} from "../services/userphotoupdate";
import { signInSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { clearSignInSuccess } from "../redux/user/userSlice";

import Cookies from "js-cookie";
export default function UserProfile() {
  const { currentUser, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  // Determine user object based on currentUser data 
  const displayImage = currentUser.photoURL || anonuser;
  const [file, setFile] = useState(null);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [updateClicks, setUpdateClicks] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [options, setOptions] = useState(false);
  const dispatch = useDispatch();
  const handleFileSelection = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setUpdateBtn(true);
  };
  const handleCancel = async () => {
    setOptions(false);
    setFile(null);
  };

  const handleOptions = () => {
    setOptions(true);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        userId: user._id ? user._id : null,
        authorization: token,
      },
    };
    try {
      await updateProfilePhoto(requestOptions);
      setUploading(false);
      setUpdating(true);
      findAndSetProfilePhoto();
    } catch (error) {
      setUploading(false);
      if (error.message === "403") {
        dispatch(clearSignInSuccess());
        Cookies.set("timeout", "You have been logged out");
      }
      setErrorMessage("Couldn't update profile photo");
    }
    setFile(null);
    setOptions(false);
  };

  const findAndSetProfilePhoto = async () => {
    try {
      const res = await updateProfilePhotoURL({ userId: user._id });
      const photoURL = await res.json();
      dispatch(signInSuccess({ ...currentUser, photoURL: photoURL }));
      setUpdateBtn(false);
      setTimeout(() => {
        setUpdating(false); // Set loading state to false after 3 seconds (simulating data loading)
      }, 3000);
      setErrorMessage(null);
    } catch (error) {
      setUpdating(false);
      setUpdateClicks((prev) => prev + 1);
      setErrorMessage("Couldn't update profile photo");
    }
  };

  // Function to truncate file name if it exceeds 20 characters
  const truncateFileName = (fileName, maxLength) => {
    if (fileName.length > maxLength) {
      return fileName.slice(0, maxLength) + "...";
    }
    return fileName;
  };
  const user =
    currentUser.firstName === 'Guest' || !currentUser.photoURL
      ? { ...currentUser, photoURL: anonuser }
      : currentUser;

  useEffect(() => {
    // Set loading state to true when component mounts
    setLoading(true);

    // Simulate asynchronous data loading with setTimeout
    setTimeout(() => {
      setLoading(false); // Set loading state to false after 3 seconds (simulating data loading)
    }, 3000); // 3000 milliseconds (3 seconds)

    // Specify dependencies for useEffect (empty array means it runs only on mount)
  }, []);
  
  return (
    <>
      {loading ? (
        // Display Loader component while data is loading
        <div className=" flex flex-col justify-center items-center h-screen"><Loader /></div>
      ) : uploading ? <div className=" flex flex-col justify-center items-center h-screen"><Loader /><div className='text-2xl text-violet-600'>Uploading...</div></div> : updating 
      ? <div className=" flex flex-col justify-center items-center h-screen"><Loader /><div className='text-2xl text-green-600'>Setting up your new Avatar...</div></div> : (
        // Display UserCard component with user data once loading is complete
        <div className='flex justify-center items-center mt-[10rem]'>
          <UserCard user={user} token={token} truncateFileName={truncateFileName} 
          findAndSetProfilePhoto={findAndSetProfilePhoto} handleUpload={handleUpload}
          handleFileSelection={handleFileSelection} handleCancel={handleCancel}
          displayImage={displayImage} updateBtn={updateBtn} errorMessage={errorMessage} updateClicks={updateClicks} file={file}
          handleOptions={handleOptions} options={options}/>
        </div>
      )}
    </>
  );
}
