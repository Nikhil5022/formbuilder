import React from 'react';

export default function Comprehension({comprehensions, setComprehensions}) {
  const handleAddQuestion = (comprehensionIndex) => {
    const updatedComprehensions = [...comprehensions];
    updatedComprehensions[comprehensionIndex].questions.push({ question: '', options: ['', '', '', ''] });
    setComprehensions(updatedComprehensions);
  };

  const handleDeleteQuestion = (comprehensionIndex, questionIndex) => {
    const updatedComprehensions = [...comprehensions];
    updatedComprehensions[comprehensionIndex].questions.splice(questionIndex, 1);
    setComprehensions(updatedComprehensions);
  };

  const handleDeleteComprehension = (comprehensionIndex) => {
    const updatedComprehensions = [...comprehensions];
    updatedComprehensions.splice(comprehensionIndex, 1);
    setComprehensions(updatedComprehensions);
  };

  const handleComprehensionChange = (comprehensionIndex, value) => {
    const updatedComprehensions = [...comprehensions];
    updatedComprehensions[comprehensionIndex].comprehension = value;
    setComprehensions(updatedComprehensions);
  };

  const handleInputChange = (comprehensionIndex, questionIndex, field, value) => {
    const updatedComprehensions = [...comprehensions];
    updatedComprehensions[comprehensionIndex].questions[questionIndex][field] = value;
    setComprehensions(updatedComprehensions);
  };

  return (
    <> 
      <h2 className='text-xl p-5'>COMPREHENSION</h2>
      {comprehensions.map((comprehension, comprehensionIndex) => (
        <div key={comprehensionIndex} className='flex justify-center p-5'>
          <textarea
            name={`comprehension-${comprehensionIndex}`}
            value={comprehension.comprehension}
            onChange={(e) => handleComprehensionChange(comprehensionIndex, e.target.value)}
            cols="100"
            rows="10"
            placeholder="Enter Comprehension"
            className='border-2 border-gray-500'
          ></textarea>
          {comprehension.questions.map((question, questionIndex) => (
            <div key={questionIndex} className='border border-black w-96'>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleInputChange(comprehensionIndex, questionIndex, 'question', e.target.value)}
                placeholder="Enter Question"
                className='border-2 border-gray-500 p-3 m-3 '
              />
              <br />
              <div className='flex flex-col '>
                {question.options.map((option, optionIndex) => (
                  <div className='flex flex-col m-2 p-2 '>
                    <input
                      key={optionIndex}
                      type="text"
                      value={option}
                      onChange={(e) => handleInputChange(comprehensionIndex, questionIndex, 'options', [
                        ...question.options.slice(0, optionIndex),
                        e.target.value,
                        ...question.options.slice(optionIndex + 1)
                      ])}
                      placeholder={`Enter Option ${optionIndex + 1}`}
                      className='border-2 border-gray-500'
                    />
                  </div>
                ))}
                <button onClick={() => handleDeleteQuestion(comprehensionIndex, questionIndex)} className='flex flex-row justify-center border border-red-500 w-52 m-3'>Delete Question</button>
              </div>
            </div>
          ))}
          <button onClick={() => handleAddQuestion(comprehensionIndex)} className='border border-gray-500 p-2'>Add Question</button>
          <button onClick={() => handleDeleteComprehension(comprehensionIndex)} className='border border-red-500 p-2'>Delete Comprehension</button>
        </div>
      ))}
      <button onClick={() => setComprehensions([...comprehensions, { comprehension: '', questions: [{ question: '', options: ['', '', '', ''] }] }])} className='border-2 border-gray-500 p-2 m-2'>
        Add Comprehension
      </button>
      
    </>
  );
}
