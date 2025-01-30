import {use, useEffect, useState} from "react";
import {db} from "../Utils/firebaseConfig";
import {collection, addDoc, getDocs, deleteDoc, doc, updateDoc, setDoc,query} from "firebase/firestore";

const Body = ({user}) => {
    const [todo,setTodo] = useState("");
    const [data, setData] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedTodo,setSelectedTodo] = useState(null);
    const [updatedData, setUpdatedData] = useState("");
    // console.log(user)


    const getDataFromBase = async () =>{
        if (!user) return;
        const querySnapshot = await getDocs(collection(db , user));
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),id: doc.id,
        }))
        setData(newData);
    }

    useEffect(() => {
        if (user){
            getDataFromBase()
        }

    }, [user]);

    // console.log(data);

    const deleteElement = async (id) =>{
        await deleteDoc(doc(db, user, id));
        getDataFromBase();
    }

    const handleUpdate = async () => {
        if (!selectedTodo || !updatedData.trim()) return;
        const docRef = doc(db , user, selectedTodo.id);
        await updateDoc(docRef , {todo:updatedData});
        setIsUpdating(false);
        setUpdatedData("");
        getDataFromBase();
    }


    const handleClick = async (e) => {
        e.preventDefault();
        if(!todo.trim()) return;
        const userCollectionRef = collection(db, user);
        const userQuery = query(userCollectionRef);
        const userDocsSnapshot = await getDocs(userQuery);

        if (userDocsSnapshot.empty) {
            // Collection doesn't exist or has no documents, create the first document
            await setDoc(doc(userCollectionRef,"default"), { todo: todo });
        } else {
            // Collection exists, add a new document
            await addDoc(userCollectionRef, { todo: todo });
        }
        setTodo("");
        getDataFromBase();
    }


    return (
        <div>
            <div className="flex flex-col justify-center items-center h-screen">
                <input className="border-2 p-2 "
                       type="text"
                       placeholder="Enter Input" onChange={(e) => setTodo(e.target.value)}/>
                <button onClick={handleClick}
                        className="border-2 p-2"> Submit</button>
                <div>
                    {data.map(todo => (
                        <div className="flex flex-row">
                            <p className="border-2 p-2 m-2 cursor-pointer"
                               onClick={() =>{
                                   setIsUpdating(true);
                                   setSelectedTodo(todo);
                               }}>{todo.todo}
                            </p>
                            <button className="border-2 p-2 m-2 cursor-pointer"
                                    onClick={() => deleteElement(todo.id)}>delete
                            </button>
                        </div>
                    ))}
                </div>
                {
                isUpdating && (
                    <div>
                        <input className="border-2 p-2 m-2 cursor-pointer"
                               placeholder="New Data"
                               onChange={e => setUpdatedData(e.target.value)}/>
                        <button onClick={() => handleUpdate()}
                                className="border-2 p-2 m-2 cursor-pointer">update
                        </button>
                    </div>)
                }

            </div>

        </div>

    )
}
export default Body