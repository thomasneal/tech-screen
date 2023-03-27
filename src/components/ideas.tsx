import { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import { Button } from "@mui/material";
import { Idea } from "@/types/Idea";
import IdeaCard from "./idea";

export default function Ideas() {
  const [ideasLoaded, setIdeasLoaded] = useState(false);
  const [creatingNewIdea, setCreatingNewIdea] = useState(false);
  const [newIdea, setNewIdea] = useState<Idea>({
    id: uuidv4(),
    title: 'title',
    description: "description",
    lastUpdated: new Date().toString(),
  });

  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const stringToParse = localStorage.getItem("ideas");
    if (stringToParse) {
      const itemsArray = JSON.parse(stringToParse);
      setIdeas(itemsArray);
      setIdeasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (ideasLoaded) {
      localStorage.setItem("ideas", JSON.stringify(ideas));
    }
    
  }, [ideas, ideasLoaded]);

  function NewIdea() {
    
    return (
      <>
       <IdeaCard key={newIdea.id} idea={newIdea} handleDelete={() => handleDelete(newIdea.id)} />
      </> 
    );
  }
  
  const handleNewIdea = () => {
    setCreatingNewIdea(true);
    setIdeas([...ideas, newIdea]); 
    setNewIdea({
      id: uuidv4(),
      title: 'title',
      description: "description",
      lastUpdated: new Date().toString()
    });
    setCreatingNewIdea(false);
  }

  const handleDelete = (id: string) => {
    const filteredIdeas = ideas.filter(i => i.id !== id);
    setIdeas(filteredIdeas);
   }

  return (
    <>
      {ideas && ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} handleDelete={handleDelete} />
      ))}
      {creatingNewIdea ? <NewIdea /> : ""}
      <Button variant="contained" onClick={handleNewIdea}>New Idea</Button>
    </>
  );
}