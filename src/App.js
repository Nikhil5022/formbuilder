import './App.css';
import React from 'react';
import Categorize from './Categorize';
import Cloze from './Cloze';
import Comprehension from './Comprehension';
import { useState } from 'react';
import axios from 'axios';


function App() {

  const [clozes, setClozes] = useState([{ cloze: '', options: []}]);
  const handleClozeChange = (updatedClozes) => {
    setClozes(updatedClozes);
  };

  const [categorizes, setCategorizes] = useState([{ question: "", options: [{ option: "", category: "" }] }]);
  const handleCategorizeChange = (updatedCategorizes) => {
    setCategorizes(updatedCategorizes);
  };

  const [comprehensions, setComprehensions] = useState([
    { comprehension: '', questions: [{ question: '', options: ['', '', '', ''] }] }
  ]);

  const handleComprehensionChange = (updatedComprehensions) => {
    setComprehensions(updatedComprehensions);
  }

  const saveData = () => {
    const data = {
      clozes,
      categorizes,
      comprehensions
    };
    axios.post("https://formbuilder-zeta.vercel.app/postFillData", data)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    alert('Data saved successfully');
  };
 
  return (
    <>
      <Categorize categorizes={categorizes} setCategorizes ={handleCategorizeChange}/>
      <Cloze clozes={clozes} onClozeChange={handleClozeChange}/>
      <Comprehension comprehensions={comprehensions} setComprehensions={handleComprehensionChange} />

      <button className='border-2 border-gray-500 p-2 m-2' onClick={saveData} >Save</button>
      <a href="/preview" className='border-2 border-gray-500 p-2 m-2'>Preview</a>
    </>
  );
}


export default App;
