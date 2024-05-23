import { useState } from "react";

export const useSendMessage = async (token, userId, postMessge, message) =>{
    // const [send, setSend] = useState(false)
    const [error, setError] = useState(null)
    const [res, setRes] = useState(null);

    const handleSubmit = async () =>{
        console.log("Submit")
        try{
       
            const res = await postMessge(userId, message, token);
            const data = await res.json();
            console.log(data);
         }catch(error){
            setError(error.message)
            // setSend(false)
         }
    }
   

     return {
        // send,
        error,
        // setSend,
        setError,
        res,
       handleSubmit

     }
    
}
