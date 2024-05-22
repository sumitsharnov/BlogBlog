import { useSelector, useDispatch } from "react-redux";
import { Button, Navbar, TextInput } from "flowbite-react";
const Communication = () => {
  const { currentUser, signInSuccess } = useSelector((state) => state.user);
  const displayImage = (currentUser && currentUser.photoURL) || anonuser;
  return (
    <div className="">
      <div className="flex justify-around">
        <h2 className="p-4 font-bold text-[2rem] text-gray-600">Messages</h2>
        <div className="flex justify-centre items-center gap-2">
          <img
            src={displayImage}
            alt="profile"
            className="w-16 h-10 rounded-full transition duration-300 transform hover:scale-110 m-4 border border-violet-400"
          />
          <textarea type="text" placeholder="Write your message here..." className="w-[100%] border border-gray-200 p-2 rounded-lg" />

          <button className="mr-12 ml-2">Post</button>
        </div>
      </div>
      <hr class="w-full border border-gray-300"></hr>
      <div className="flex justify-center border border-green-300 rounded-lg m-12 p-[10rem]">
        Communication has not been started yet
      </div>
    </div>
  );
};

export default Communication;
