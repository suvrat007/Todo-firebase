import {doc, collection , getDocs ,deleteDoc ,updateDoc} from "firebase/firestore";
import {db} from "../Utils/firebaseConfig";
import {useEffect, useState} from "react";


const GetData = () => {

    const [data, setData] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedTodo,setSelectedTodo] = useState(null);
    const [updatedData, setUpdatedData] = useState("");

    const getDataFromBase = async () =>{
        const querySnapshot = await getDocs(collection(db , "todos"));
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
        await deleteDoc(doc(db, "todos", id));
        getDataFromBase();
    }

    const update = (todo) => {
        setIsUpdating(true);
        setSelectedTodo(todo);
    };

    const handleUpdate = async (id) => {
        try{
            const docRef = doc(db , "todos", id);
            // console.log(docRef);
            await updateDoc(docRef , {todo:updatedData});
            setIsUpdating(false);
            setUpdatedData("");
            getDataFromBase();
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="flex flex-row">
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
            {/*<div>*/}
            {/*    {(isUpdating && <SingleTodo id={selectedTodo.id}/>)}*/}
            {/*</div>*/}

            {
                isUpdating && (
                    <div>
                        <input className="border-2 p-2 m-2 cursor-pointer"
                               onChange={e => setUpdatedData(e.target.value)}/>
                        <button onClick={()=>handleUpdate(selectedTodo.id)} className="border-2 p-2 m-2 cursor-pointer">update</button>
                    </div>)
            }

        </div>
    )
}
export default GetData;



//
// import { doc, collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
// import { db } from "../Utils/firebaseConfig";
// import { useEffect, useState } from "react";
//
// const GetData = () => {
//     const [data, setData] = useState([]);
//     const [isUpdating, setIsUpdating] = useState(false);
//     const [selectedTodo, setSelectedTodo] = useState(null);
//     const [updatedData, setUpdatedData] = useState("");
//
//     // Fetch todos from Firestore
//     const getDataFromBase = async () => {
//         const querySnapshot = await getDocs(collection(db, "todos"));
//         const newData = querySnapshot.docs.map((doc) => ({
//             ...doc.data(),
//             id: doc.id,
//         }));
//         setData(newData);
//     };
//
//     // Run once to fetch data
//     useEffect(() => {
//         getDataFromBase();
//     }, []);
//
//     // Delete a todo
//     const deleteElement = async (id) => {
//         await deleteDoc(doc(db, "todos", id));
//         getDataFromBase(); // Refresh data
//     };
//
//     // Set the todo to update
//     const update = (todo) => {
//         setIsUpdating(true);
//         setSelectedTodo(todo);
//     };
//
//     // Handle the update
//     const handleUpdate = async (id) => {
//         try {
//             const docRef = doc(db, "todos", id);
//             await updateDoc(docRef, { todo: updatedData });
//             setIsUpdating(false); // Close update UI
//             setUpdatedData(""); // Clear input
//             getDataFromBase(); // Refresh data
//         } catch (error) {
//             console.log(error);
//         }
//     };
//
//     return (
//         <div className="flex flex-row">
//             {/* List of todos */}
//             <div>
//                 {data.map((todo) => (
//                     <div className="flex flex-row" key={todo.id}>
//                         <p
//                             className="border-2 p-2 m-2 cursor-pointer"
//                             onClick={() => update(todo)}
//                         >
//                             {todo.todo}
//                         </p>
//                         <button
//                             className="border-2 p-2 m-2 cursor-pointer"
//                             onClick={() => deleteElement(todo.id)}
//                         >
//                             delete
//                         </button>
//                     </div>
//                 ))}
//             </div>
//
//             {/* Update Component */}
//             {isUpdating && selectedTodo && (
//                 <div>
//                     <input
//                         className="border-2 p-2 m-2 cursor-pointer"
//                         value={updatedData}
//                         onChange={(e) => setUpdatedData(e.target.value)}
//                     />
//                     <button
//                         onClick={() => handleUpdate(selectedTodo.id)}
//                         className="border-2 p-2 m-2 cursor-pointer"
//                     >
//                         update
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default GetData;
