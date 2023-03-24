import { useState } from "react";
import Idea from "./idea";
import getIdeas from "@/pages/api/ideas";
import { Button } from "@mui/material";

// export async function getStaticProps() {
//   const ideas = getIdeas("/api/ideas", );
//   return {
//     props: {
//       ideas,
//     },
//   };
// }

export default function Ideas() {
  const [creatingNewIdea, setCreatingNewIdea] = useState(false);

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
      <Idea title="Card A" description="Card A's description" lastUpdated="23.03.2023" />
      <Idea title="Card B" description="Card B's description" lastUpdated="22.03.2023" />
      <Idea title="Card C" description="Card C's description" lastUpdated="27.02.2023" />
      <Idea title="Card D" description="Card D's description" lastUpdated="13.03.2023" />
      <Idea title="Card E" description="Card E's description" lastUpdated="18.03.2023" />
      {creatingNewIdea ? <NewIdea /> : ""}
      <Button variant="contained" onClick={handleNewIdea}>New Idea</Button>
    </>
  );
}