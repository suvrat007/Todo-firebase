import {useState} from "react";
import {db} from "../Utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import GetData from "./GetData";

const Body = () => {
    const [todo,setTodo] = useState("");
    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db,"todos"),{
                todo: todo,
            })
        }catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="flex flex-col justify-center items-center h-screen">
                <input className="border-2 p-2 "
                       type="text"
                       placeholder="Enter Input" onChange={(e) => setTodo(e.target.value)}/>
                <button onClick={handleClick} className="border-2 p-2"> Submit</button>
                <GetData/>
            </div>

        </div>

    )
}
export default Body