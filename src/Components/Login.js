import React, {useState} from 'react';
import {auth, db} from "../Utils/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Body from "./Body";
import {addDoc, collection} from "firebase/firestore";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [userId, setUserId] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const handleButtonClick = async (e) => {
        e.preventDefault(); // Prevent default form submission
        let userCred;
        try{
            if(isLogin){
                userCred = await signInWithEmailAndPassword(auth, email, password);
            }else{
                userCred = await createUserWithEmailAndPassword(auth, email, password);
            }
            const uid = userCred.user.uid;
            setUserId(uid);
        }catch(error){
            console.error("Authentication error:", error.message);

            // Map Firebase error codes to user-friendly messages
            if (error.code === "auth/user-not-found") {
                setErrorMessage((prev) => ({ ...prev, email: "No account found with this email." }));
            } else if (error.code === "auth/wrong-password") {
                setErrorMessage((prev) => ({ ...prev, password: "Incorrect password. Please try again." }));
            } else if (error.code === "auth/email-already-in-use") {
                setErrorMessage((prev) => ({ ...prev, email: "This email is already in use." }));
            } else {
                setErrorMessage((prev) => ({ ...prev, general: error.message }));
            }
        }
    };



    return (
        <div className="relative flex justify-center top-[4rem] ">
            <div className="w-4/12 backdrop-blur">
                <form className="flex flex-col border-2 bg-opacity-100 p-10 rounded-xl ">
                    <h1 className="font-bold text-3xl py-3 my-2 text-black">{(isLogin) ? "Log in" : "Sign In"}</h1>

                    <input type="email"
                           value={email}
                           className="p-3 my-3 "
                           placeholder="Email Id"
                           onChange={(e) => setEmail(e.target.value)}/>

                    <input type="password"
                           value={password}
                           placeholder="Password"
                           className="p-3 my-3"
                           onChange={(e) => setPassword(e.target.value)}/>


                    <button type="submit"
                            onClick={handleButtonClick}
                            className="p-3 my-3 w-full bg-red-700 text-white rounded-lg"> {(isLogin) ? "Log in" : "Sign In"}</button>

                    {errorMessage && <p className="text-red-500" >{errorMessage}</p>}

                    <p onClick={()=>setIsLogin(!isLogin)}
                       className="cursor-pointer">{(!isLogin) ? "wanna Log in ?....click here" : " wanna Sign In ?....click here"}</p>
                </form>

                {userId && <Body user={userId}/>}

            </div>
        </div>

    )
        ;
}
export default Login;