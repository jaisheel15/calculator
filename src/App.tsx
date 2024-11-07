import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
const [input, setInput] = useState<string>("");
const [result,setResult] = useState<number>(0.0);
function handleInput(e){
  setInput(e.target.value);
}
function valuing(){
  if(input != ""){
    const matches = input.match(/\d+(?:\.\d+)?/g);
    if (matches) {
      let content = matches.map(Number);
    
    const operations = input.match(/[^0-9.]/g)

    invoke("calculate", {content:content,operations:operations}).then((result: unknown) => {
      if (typeof result === 'number') {
        setResult(result);
      } else {
        console.error('Invalid result type:', result);
      }
    });
}
  }
}


  return (
    <>
    <input type="text" className="m-3 p-3 justify-items-center bg-slate-200 text-neutral-600" onChange={handleInput} />
     <button onClick={valuing}   className="m-2 p-2 rounded bg-slate-400 justify-items-center hover:bg-slate-600">Click Me</button>
    <p>= {result}</p>
    </>
  );
}

export default App;
