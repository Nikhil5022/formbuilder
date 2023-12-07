import React from 'react';

export default function Categorize({ categorizes, setCategorizes }) {

  const handleInputChange = (categorizeIndex, value) => {
    const updatedCategorizes = [...categorizes];
    updatedCategorizes[categorizeIndex].question = value;
    setCategorizes(updatedCategorizes);
  };

  const handleOptionChange = (categorizeIndex, optionIndex, field, value) => {
    const updatedCategorizes = [...categorizes];
    updatedCategorizes[categorizeIndex].options[optionIndex][field] = value;
    setCategorizes(updatedCategorizes);
  };

  const handleAddOption = (categorizeIndex) => {
    const updatedCategorizes = [...categorizes];
    updatedCategorizes[categorizeIndex].options.push({ option: "", category: "" });
    setCategorizes(updatedCategorizes);
  };

  const handleDeleteQuestion = (categorizeIndex) => {
    const updatedCategorizes = [...categorizes];
    updatedCategorizes.splice(categorizeIndex, 1);
    setCategorizes(updatedCategorizes);
  };

  const handleDeleteOption = (categorizeIndex, optionIndex) => {
    const updatedCategorizes = [...categorizes];
    updatedCategorizes[categorizeIndex].options.splice(optionIndex, 1);
    setCategorizes(updatedCategorizes);
  };

  const handleAddQuestion = () => {
    setCategorizes([...categorizes, { question: "", options: [{ option: "", category: "" }] }]);
  };

  return (
    <>
      <h2 className='text-xl p-5'>CATEGORIZE</h2>
      {categorizes.map((categorize, categorizeIndex) => (
        <div key={categorizeIndex} className='border border-gray-500 m-3 rounded-lg shadow-lg'>
          <input
            type="text"
            value={categorize.question}
            onChange={(e) => handleInputChange(categorizeIndex, e.target.value)}
            placeholder={`Enter Question ${categorizeIndex + 1}`}
            className='border-2 border-gray-500 p-3 m-3 w-3/4'
          />
          <button onClick={() => handleDeleteQuestion(categorizeIndex)} className='border-2 border-red-500 p-2'>Delete Question</button>

          <div className='ml-5'>
            <h3>Options:</h3>
            <ul className='p-2'>
              {categorize.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <input
                    type="text"
                    value={option.option}
                    onChange={(e) => handleOptionChange(categorizeIndex, optionIndex, 'option', e.target.value)}
                    placeholder={`Option ${optionIndex + 1}`}
                    className='border-2 border-gray-500 p-2 m-2'
                  />
                  <input
                    type="text"
                    value={option.category}
                    onChange={(e) => handleOptionChange(categorizeIndex, optionIndex, 'category', e.target.value)}
                    placeholder={`Category ${optionIndex + 1}`}
                    className='border-2 border-gray-500 p-2 m-2'
                  />
                  <button onClick={() => handleDeleteOption(categorizeIndex, optionIndex)} className='border-2 border-red-500 p-2'>Delete Option</button>
                </li>
              ))}
            </ul>
            <button onClick={() => handleAddOption(categorizeIndex)} className='border-2 border-gray-500 p-2 m-2'>Add Option</button>
          </div>
        </div>
      ))}
      <button onClick={handleAddQuestion} className='border-2 border-gray-500 p-2 m-2'>Add Categorize Question</button>
    </>
  );
}
