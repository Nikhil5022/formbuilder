import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Preview() {
    const [data, setData] = useState(null);
    const [categorizes, setCategorizes] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [answersData, setAnswersData] = useState([]);
    const [clozesData, setClozesData] = useState([]);
    const [comprehensionsData, setComprehensionsData] = useState([]);
    const [categoryData, setCategoryData] = useState([]); // Added state for categoryData
    const [clozeContent, setClozeContent] = useState([]); // State for cloze content


    useEffect(() => {
        axios.get("https://formbuilder-zeta.vercel.app/getFillData")
            .then(res => {
                setData(res.data);
                setCategorizes(res.data?.categorizes || []);
            });
    }, []);

    useEffect(() => {
        const answers = [];
        categorizes.forEach((categorize, categorizeIndex) => {
            answers.push({ question: categorize.question, answer: selectedAnswers[`question-${categorizeIndex}`] });
        });
        setAnswersData(answers);
    }, [selectedAnswers, categorizes]);

    const handleClozesData = () => {
        const clozes = (data?.clozes || []).map((cloze, clozeIndex) => ({
            clozeIndex,
            content: clozeContent[clozeIndex] || '' // Use the content from the state
        }));
        setClozesData(clozes);
    };

    const handleComprehensionsData = () => {
        const comprehensions = (data?.comprehensions || []).map((comprehension, comprehensionIndex) => ({
            comprehensionIndex,
            comprehension: comprehension.comprehension,
            questions: comprehension.questions.map((question, questionIndex) => ({
                questionIndex,
                question: question.question,
                selectedOption: selectedAnswers[`comprehension-${comprehensionIndex}-question-${questionIndex}`] || null
            }))
        }));
        setComprehensionsData(comprehensions);
    };

    const handleCategoryData = () => {
        const categoryDataArray = categorizes.map((categorize, categorizeIndex) => {
            const categoryOptions = categorize.options.map((option, optionIndex) => {
                const key = `question-${categorizeIndex}-${optionIndex}`;
                return {
                    optionIndex,
                    option: option.option,
                    selectedAnswer: selectedAnswers[key] || null
                };
            });
    
            return {
                question: categorize.question,
                options: categoryOptions
            };
        });
        setCategoryData(categoryDataArray);
    };
    
    

    const handleCollectData = () => {
        handleClozesData();
        handleComprehensionsData();
        handleCategoryData();
        // Now you can use answersData, clozesData, and comprehensionsData as needed.
        const collectedData = {
            categoryData,
            clozesData,
            comprehensionsData
        };
        console.log(collectedData);
        axios.post("https://formbuilder-zeta.vercel.app/postSubmitData", collectedData)
        alert('Data submitted successfully');
    };

    return (
        <>
            <h2 className='text-xl p-5'>CATEGORIZE</h2>
            {categorizes.map((categorize, categorizeIndex) => (
                <div key={categorizeIndex} className='border border-gray-500 m-3 rounded-lg shadow-lg'>
                    <p className='border-2 border-gray-500 p-3 m-3 w-3/4'>{categorize.question}</p>
                    <div className='ml-5'>
                        <h3>Options:</h3>
                        <ul className='p-2'>
                            {categorize.options.map((option, optionIndex) => (
                                <li key={optionIndex}>
                                    <p>{option.option}</p>
                                    {/* Display answerData inside a dropdown menu */}
                                    <select
                                        name={`question-${categorizeIndex}-${optionIndex}`}
                                        value={selectedAnswers[`question-${categorizeIndex}-${optionIndex}`] || ''}
                                        onChange={(e) => {
                                            const updatedAnswers = { ...selectedAnswers };
                                            updatedAnswers[`question-${categorizeIndex}-${optionIndex}`] = e.target.value;
                                            setSelectedAnswers(updatedAnswers);
                                        }}
                                    >
                                        <option value="">Select Answer</option>
                                        {categorize.options.map((opt, idx) => (
                                            <option key={idx} value={opt.category}>{opt.category}</option>
                                        ))}
                                    </select>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}



            <h2 className='text-xl p-5'>CLOZE</h2>
            {data?.clozes?.map((cloze, clozeIndex) => (
                <div key={clozeIndex}>
                    <div
                        contentEditable={true}
                        dangerouslySetInnerHTML={{
                            __html: cloze.cloze.replace(/__([^_]*)__/g, '<span contenteditable="false">__________</span>')
                        }}
                    />
                    
                </div>
                
            ))}

            <h2 className='text-xl p-5'>COMPREHENSION</h2>
            {data?.comprehensions?.map((comprehension, comprehensionIndex) => (
                <div key={comprehensionIndex} className='border border-gray-500 m-3 rounded-lg shadow-lg'>
                    <p className='border-2 border-gray-500 p-3 m-3 w-3/4'>{comprehension.comprehension}</p>
                    <div className='ml-5'>
                        <h3>Questions:</h3>
                        <ul className='p-2'>
                            {comprehension.questions.map((question, questionIndex) => (
                                <li key={questionIndex}>
                                    <p>{question.question}</p>
                                    {question.options.map((option, optionIndex) => (
                                        // radio button group
                                        <div key={optionIndex}>
                                            <input
                                                type="radio"
                                                name={`comprehension-${comprehensionIndex}-question-${questionIndex}`}
                                                value={option}
                                                onChange={(e) => {
                                                    const updatedAnswers = { ...selectedAnswers };
                                                    updatedAnswers[`comprehension-${comprehensionIndex}-question-${questionIndex}`] = e.target.value;
                                                    setSelectedAnswers(updatedAnswers);
                                                }}
                                            />

                                            <label>{option}</label>
                                        </div>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
            <button onClick={handleCollectData}>Submit</button>

        </>
    );
}
