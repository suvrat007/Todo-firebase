import {useEffect, useState} from "react";
import {db} from "../Utils/firebaseConfig";
import {collection, addDoc, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";

const Body = ({user}) => {
    const [todo,setTodo] = useState("");
    const [data, setData] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedTodo,setSelectedTodo] = useState(null);
    const [updatedData, setUpdatedData] = useState("");

    const getDataFromBase = async () =>{
        const querySnapshot = await getDocs(collection(db , user));
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),id: doc.id,
        }))
        setData(newData);
    }


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getDataFromBase();
    }, []);

    // console.log(data);

    const deleteElement = async (id) =>{
        await deleteDoc(doc(db, user, id));
        getDataFromBase();
    }

    const update = (todo) => {
        setIsUpdating(true);
        setSelectedTodo(todo);
    };

    const handleUpdate = async (id) => {
        try{
            const docRef = doc(db , user, id);
            // console.log(docRef);
            await updateDoc(docRef , {todo:updatedData});
            setIsUpdating(false);
            setUpdatedData("");
            getDataFromBase();
        }catch(error){
            console.log(error)
        }
    }
    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db,user),{
                todo: todo,
            })
            getDataFromBase()

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
                <div>
                    {data.map(todo => (
                        <div className="flex flex-row">
                            <p className="border-2 p-2 m-2 cursor-pointer"
                               onClick={() => update(todo)}>{todo.todo}
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
                        <button onClick={() => handleUpdate(selectedTodo.id)}
                                className="border-2 p-2 m-2 cursor-pointer">update
                        </button>
                    </div>)
            }

            </div>

        </div>

    )
}
export default Body