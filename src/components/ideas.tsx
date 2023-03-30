import { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import { Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Idea } from "@/types/Idea";
import IdeaCard from "./idea";
import styles from "@/styles/Ideas.module.css";

export default function Ideas() {
  const [ideasLoaded, setIdeasLoaded] = useState(false);
  const [creatingNewIdea, setCreatingNewIdea] = useState(false);
  const [newIdea, setNewIdea] = useState<Idea>({
    id: uuidv4(),
    title: 'title',
    description: "description",
    lastUpdated: new Date().toString(),
  });
  const [sort, setSort] = useState("created");
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
       <IdeaCard key={newIdea.id} idea={newIdea} handleDelete={() => handleDelete(newIdea.id)} handleUpdate={handleUpdate} />
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

   const handleUpdate = (id: string, title: string, description: string) => {
    
    const updatedIdeas = [...ideas];
    const ideaToUpdate = updatedIdeas.find(
      (idea) => idea.id === id
    )

    if (ideaToUpdate) {
      ideaToUpdate.title = title;
      ideaToUpdate.description = description;
      ideaToUpdate.lastUpdated = new Date().toString();
    }  
    setIdeas(updatedIdeas);
   }

  const handleSort = (sort: string) => {
    setSort(sort);
    if (sort === 'alpha') {
      setIdeas(ideas.sort((a, b) => (a.title > b.title) ? 1 : -1));
    }
    
    if (sort === 'created') {
      setIdeas(ideas.sort((a, b) => (new Date(a.lastUpdated) > new Date(b.lastUpdated)) ? 1 : -1));
    }
  }

  return (
    <section>
      <FormControl sx={{width: 150, display: 'block'}}>
        <InputLabel id="sort-label">Sort</InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          value={sort}
          label="Sort"
          onChange={(e) => handleSort(e.target.value)}
        >
          <MenuItem value={"created"}>Date Created</MenuItem>
          <MenuItem value={"alpha"}>Alphabetically</MenuItem>
        </Select>
      </FormControl>
      <section className={styles.ideasContainer}>
        {ideas && ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        ))}
        {creatingNewIdea ? <NewIdea /> : ""}
      </section>
      <Button variant="contained" onClick={handleNewIdea}>New Idea</Button>
    </section>
  );
}