import {useEffect, useRef, useState} from "react";
import {addDoc, collection, doc, getDoc, setDoc, updateDoc, arrayUnion, getDocs, deleteDoc} from "firebase/firestore";
import {db} from "../Utils/firebaseConfig";

const NewBody = ({userId}) => {
    const [todoId,setTodoId] = useState();
    const [todo , setTodo] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [data , setData] = useState([]);
    const [selectedTodo,setSelectedTodo] = useState("");

    useEffect(() => {
        if (userId){
            getData();
        }
    }, [userId]);

    const getData = async () => {
        if (!userId) return;
        const todosArray = (await getDoc(doc(db, "users", userId))).data()?.todos || [];

        const todosData = await Promise.all(
            todosArray.map(async (id) => {
                const todoSnapshot = await getDoc(doc(db, "todos", id));
                return todoSnapshot.exists() ? todoSnapshot.data()?.todo : null;
            })
        );
        const filteredTodos = todosData.filter((todo) => todo !== null);
        setData(filteredTodos);
    }

    const addTodo = async (e) =>{
        e.preventDefault();
        if(!todo.trim()) return;
        await addDoc(collection(db,"todos"),{todo: todo})
        setTodo("");
        getData();
    }

    const deleteTodo =async (id)=>{
        await deleteDoc(doc(db, "todos", id));
        getData();
    }


    return (
        <div>
            <div>
                <div className="flex flex-col justify-center items-center h-screen">
                    <input className="border-2 p-2 "
                           type="text"
                           placeholder="Enter Input" onChange={(e) => setTodo(e.target.value)}/>
                    <button onClick={() => addTodo}
                            className="border-2 p-2"> Submit
                    </button>
                    <div>
                        // {data.map(todo => (
                        //     <div className="flex flex-row">
                        //         <p className="border-2 p-2 m-2 cursor-pointer"
                        //            onClick={() => {
                        //                setIsUpdating(true);
                        //                setSelectedTodo(todo);
                        //            }}>{todo.todo}
                        //         </p>
                        //         <button className="border-2 p-2 m-2 cursor-pointer"
                        //                 onClick={() => deleteTodo(todo.id)}>delete
                        //         </button>
                        //     </div>
                        // ))}
                        

                    </div>
                    {/*{*/}
                    {/*    isUpdating && (*/}
                    {/*        <div>*/}
                    {/*            <input className="border-2 p-2 m-2 cursor-pointer"*/}
                    {/*                   placeholder="New Data"*/}
                    {/*                   onChange={e => setUpdatedData(e.target.value)}/>*/}
                    {/*            <button onClick={() => handleUpdate()}*/}
                    {/*                    className="border-2 p-2 m-2 cursor-pointer">update*/}
                    {/*            </button>*/}
                    {/*        </div>)*/}
                    {/*}*/}

                </div>

            </div>

        </div>
    )
}
export default NewBody;