import { useEffect, useState } from "react"
import { getDatabase, push, ref, set ,onValue } from "firebase/database";


function App() {
  const db = getDatabase();
   let [input, setInput] = useState("")
   let [allData, setAllData] = useState([])

   let handleButton = () =>{
    set(push(ref(db, 'allData/')), {
      name: input,
    }).then(()=>{
      console.log("done");  
    }) 

   }
   

   useEffect(()=>{
    const starCountRef = ref(db, 'allData/');
    onValue(starCountRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push(item.val())
        console.log(item.val());
        
      })
      setAllData(arr)
      
    });
   },[])

  return (
    <>
    <input onChange={(e)=>setInput(e.target.value)} type="text" placeholder='Enterb a messege' />
    <button onClick={handleButton}>Add todo</button>
    {
      allData.map((item)=>(
        <li>{item.name}</li>
      ))
    }

    </>
  )
}

export default App
