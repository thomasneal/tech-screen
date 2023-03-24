import { useState, useEffect } from "react";
import Idea from "./idea";
import getIdeas from "@/pages/api/ideas";
import { Button } from "@mui/material";

export default function Ideas() {
  const [creatingNewIdea, setCreatingNewIdea] = useState(false);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetch('/api/ideas')
    .then((res) => res.json())
    .then((data) => {
     setIdeas(data);
    });
  }, [])

  function NewIdea() {
    return (
      <>
       <Idea title="Edit title" description="Edit description" lastUpdated={Date.now()} />
      </> 
    );
  }
  
  const handleNewIdea = () => {
    setCreatingNewIdea(true);
  }

  return (
    <>
      {ideas.map(({title, description, lastUpdated}) => (
        <Idea key={title} title={title} description={description} lastUpdated={lastUpdated} />
      ))}
      {creatingNewIdea ? <NewIdea /> : ""}
      <Button variant="contained" onClick={handleNewIdea}>New Idea</Button>
    </>
  );
}