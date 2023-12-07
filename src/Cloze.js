import React from 'react';

export default function Cloze({ clozes, onClozeChange }) {

  const handleInputChange = (clozeIndex, value) => {
    const updatedClozes = [...clozes];
    updatedClozes[clozeIndex].cloze = value;

    // Use a regular expression to find underlined words and update options
    const underlinedWords = value.match(/__(.*?)__/g);
    updatedClozes[clozeIndex].options = underlinedWords ? underlinedWords.map(word => word.replace(/__/g, '')) : [];

    onClozeChange(updatedClozes);
  };

  const handleAddQuestion = () => {
    const updatedClozes = [...clozes, { cloze: '', options: [] }];
    onClozeChange(updatedClozes);
  };

  const handleDeleteQuestion = (clozeIndex) => {
    const updatedClozes = [...clozes];
    updatedClozes.splice(clozeIndex, 1);
    onClozeChange(updatedClozes);
  };

  return (
    <>
      <h2 className='text-xl p-5'>CLOZE</h2>
      {clozes.map((cloze, clozeIndex) => (
        <div key={clozeIndex} className='border border-gray-500 m-3 rounded-lg shadow-lg'>
          <input
            type="text"
            value={cloze.cloze}
            onChange={(e) => handleInputChange(clozeIndex, e.target.value)}
            placeholder={`Enter Cloze ${clozeIndex + 1} and keep underlined words in double underscores like __this__`}
            className='border-2 border-gray-500 p-3 m-3 w-3/4'
          />
          <button onClick={() => handleDeleteQuestion(clozeIndex)} className='border-2 border-red-500 p-2'>Delete Question</button>

          <div className='ml-5'>
            <h3>Underlined Words:</h3>
            <ul className=' p-2'>
              {cloze.options.map((word, wordIndex) => (
                <li key={wordIndex}>{word}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <button onClick={handleAddQuestion} className='border-2 border-gray-500 p-2 m-2'>Add Cloze Question</button>
    </>
  );
}
