import { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import { Button } from "@mui/material";
import Idea from "./idea";
import IdeaProps from "@/interfaces/Idea";
import getIdeas from "@/pages/api/ideas";
import { formatRelativeTime } from "../utils/helpers";


export default function Ideas() {
  const [creatingNewIdea, setCreatingNewIdea] = useState(false);
  const [newIdea, setNewIdea] = useState<IdeaProps>({
    id: uuidv4(),
    title: 'title',
    description: "description",
    lastUpdated: new Date().toString()
  });
  const [ideas, setIdeas] = useState<IdeaProps[]>([]);

  useEffect(() => {
    fetch('/api/ideas')
    .then((res) => res.json())
    .then((data) => {
     //setIdeas(data);
    });
  }, [])

  function NewIdea() {
    
    return (
      <>
       <Idea key={newIdea.id} id={newIdea.id} title={newIdea.title} description={newIdea.description} lastUpdated={formatRelativeTime(newIdea.lastUpdated)}  />
      </> 
    );
  }
  
  const handleNewIdea = () => {
    setCreatingNewIdea(true);
    setIdeas(ideas => [...ideas, newIdea]);
    setNewIdea({
       id: uuidv4(),
    title: 'title',
    description: "description",
    lastUpdated: new Date().toString()
    });
    setCreatingNewIdea(false);
  }

  return (
    <>
      {ideas && ideas.map(({id, title, description, lastUpdated}) => (
        <Idea key={id} id={id} title={title} description={description} lastUpdated={lastUpdated} />
      ))}
      {creatingNewIdea ? <NewIdea /> : ""}
      <Button variant="contained" onClick={handleNewIdea}>New Idea</Button>
    </>
  );
}