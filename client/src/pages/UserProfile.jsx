import { UserCard } from '../components/userCard';
import '../../styles.css';
import { useSelector } from 'react-redux';
import anonuser from '../images/home/anonuser.png';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';

export default function UserProfile() {
  const { currentUser, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  // Determine user object based on currentUser data
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
  console.log(user);
  return (
    <>
      {loading ? (
        // Display Loader component while data is loading
        <div className=" flex flex-col justify-center items-center h-screen"><Loader /></div>
      ) : (
        // Display UserCard component with user data once loading is complete
        <div className='flex justify-center items-center mt-[10rem]'>
          <UserCard user={user} token={token} />
        </div>
      )}
    </>
  );
}
