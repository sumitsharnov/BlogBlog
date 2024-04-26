
import { UserCard } from '../components/userCard'
import '../../styles.css'
import { useSelector } from "react-redux";
import anonuser from "../images/home/anonuser.png";
export default function About() {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser.firstName === "Guest" ? {...currentUser, photoURL: anonuser} : currentUser;
 console.log(user);
  return (
    <div className='flex justify-center items-center mt-[10rem]'><UserCard user = {user}/></div>
  )
}
