import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar"
import QuestionForm from "./QuestionForm"
import QuestionList from "./QuestionList"

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleUpdateQuestion = (updatedQuestion) => {
    console.log("Updating question with ID:", updatedQuestion.id); 
    const updatedQuestions = questions.map(question => 
      question.id === updatedQuestion.id ? updatedQuestion : question);
    
    console.log("Updated questions array:", updatedQuestions);
    setQuestions(updatedQuestions);
  };

  const fetchQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then(setQuestions)
      .catch((error) => console.error("Error:", error));
  };

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
        <QuestionForm onAddQuestion={handleAddQuestion} /> : 
        <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onUpdateQuestion={handleUpdateQuestion}/>}
    </main>
  );
}

export default App;
