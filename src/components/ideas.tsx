import { useState, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Idea } from "@/types/Idea";
import IdeaCard from "./idea";
import styles from "@/styles/Ideas.module.css";

type SortOptions = "alpha" | "created";

const generateNewIdea = (): Idea => ({
  id: uuidv4(),
  title: "title",
  description: "description",
  lastUpdated: new Date().toString(),
});

const initialState = {
  ideasLoaded: false,
  creatingNewIdea: false,
  newIdea: generateNewIdea(),
  sort: "created" as const,
  ideas: [],
};

type AddAction = {
  type: "ADD_IDEA";
};

type DeleteAction = {
  type: "DELETE_ACTION";
  id: string;
};

type HydrateAction = {
  type: "HYDRATE_ACTION";
  ideas: Idea[];
};

type UpdateAction = {
  type: "UPDATE_ACTION";
  id: string;
  title: string;
  description: string;
};

type ResetAction = {
  type: "RESET";
};

type Actions =
  | AddAction
  | DeleteAction
  | ResetAction
  | UpdateAction
  | HydrateAction;

type State = {
  ideasLoaded: boolean;
  creatingNewIdea: boolean;
  newIdea: Idea;
  sort: SortOptions;
  ideas: Idea[];
};

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case "ADD_IDEA": {
      return {
        ...state,
        ideas: [...state.ideas, state.newIdea],
        newIdea: generateNewIdea(),
        creatingNewIdea: false,
      };
    }

    case "DELETE_ACTION": {
      return {
        ...state,
        ideas: state.ideas.filter((idea) => idea.id !== action.id),
      };
    }

    case "HYDRATE_ACTION": {
      return {
        ...state,
        ideas: action.ideas,
        ideasLoaded: false,
      };
    }

    case "UPDATE_ACTION": {
      const updatedIdeas = [...state.ideas];
      const ideaToUpdate = updatedIdeas.find((idea) => idea.id === action.id);

      if (ideaToUpdate) {
        ideaToUpdate.title = action.title;
        ideaToUpdate.description = action.description;
        ideaToUpdate.lastUpdated = new Date().toString();
      }

      return {
        ...state,
        ideas: updatedIdeas,
      };
    }
    default:
      return state;
  }
}

export default function Ideas() {
  const [ideasLoaded, setIdeasLoaded] = useState(false);
  const [creatingNewIdea, setCreatingNewIdea] = useState(false);
  const [newIdea, setNewIdea] = useState<Idea>();
  const [sort, setSort] = useState<SortOptions>("created");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stringToParse = localStorage.getItem("ideas");
    if (stringToParse) {
      const itemsArray = JSON.parse(stringToParse);
      dispatch({ type: "HYDRATE_ACTION", ideas: itemsArray });
    }
  }, []);

  useEffect(() => {
    if (ideasLoaded) {
      localStorage.setItem("ideas", JSON.stringify(ideas));
    }
  }, [ideas, ideasLoaded]);

  const handleNewIdea = () => dispatch({ type: "ADD_IDEA" });

  const handleDelete = (id: string) => dispatch({ type: "DELETE_ACTION", id });

  const handleUpdate = (id: string, title: string, description: string) => {
    dispatch({ type: "UPDATE_ACTION", id, title, description });
  };

  const handleSort = (sort: SortOptions) => {
    setSort(sort);
    if (sort === "alpha") {
      setIdeas(ideas.sort((a, b) => (a.title > b.title ? 1 : -1)));
    }

    if (sort === "created") {
      setIdeas(
        ideas.sort((a, b) =>
          new Date(a.lastUpdated) > new Date(b.lastUpdated) ? 1 : -1
        )
      );
    }
  };

  return (
    <section>
      <FormControl sx={{ width: 150, display: "block" }}>
        <InputLabel id="sort-label">Sort</InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          value={sort}
          label="Sort"
          onChange={(e) => handleSort(e.target.value as SortOptions)}
        >
          <MenuItem value={"created"}>Date Created</MenuItem>
          <MenuItem value={"alpha"}>Alphabetically</MenuItem>
        </Select>
      </FormControl>
      <section className={styles.ideasContainer}>
        {ideas &&
          ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        {/* {creatingNewIdea && (
          <IdeaCard
            key={newIdea.id}
            idea={newIdea}
            handleDelete={() => handleDelete(newIdea.id)}
            handleUpdate={handleUpdate}
          />
        )} */}
      </section>
      <Button variant="contained" onClick={handleNewIdea}>
        New Idea
      </Button>
    </section>
  );
}
