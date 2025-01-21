import {doc, updateDoc} from "firebase/firestore";
import {db} from "../Utils/firebaseConfig";
import {useState} from "react";

const SingleTodo = (id) => {
    const [updatedData, setUpdatedData] = useState("");

    const handleUpdate = async (id) => {
        try{
            const docRef = doc(db , "todos", id);
            await updateDoc(docRef , updatedData);
        }catch(error){
            console.log(error)
        }
    }


    return(
        <div>
            <input className="border-2 p-2 m-2 cursor-pointer"
                   onChange={e => setUpdatedData(e.target.value)} />
            <button onClick={handleUpdate} className="border-2 p-2 m-2 cursor-pointer">update</button>
        </div>
    )
}
export default SingleTodo