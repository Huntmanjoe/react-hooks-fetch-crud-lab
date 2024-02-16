import React from "react";

function QuestionItem({ question, onUpdate, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        onDelete(id);
      }
    })
    .catch(error => console.error('Error:', error));
  };


  const handleCorrectIndexChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value, 10);
  
    console.log(`Attempting to update question ID ${id} with new correctIndex:`, newCorrectIndex);
  
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
    .then(response => response.json())
    .then(updatedQuestion => {
      console.log("Successfully updated question:", updatedQuestion); 
      onUpdate(updatedQuestion);
    })
    .catch(error => console.error('Error:', error));
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>{answer}</option> 
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleCorrectIndexChange} value={correctIndex}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button> 
    </li>
  );
}

export default QuestionItem;
