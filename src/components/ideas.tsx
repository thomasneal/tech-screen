import { useEffect, useReducer } from "react";
import {v4 as uuidv4} from 'uuid';
import { Idea } from "@/types/Idea";
import IdeaCard from "./idea";
import styles from "@/styles/Ideas.module.scss";


type SortOptions = "alpha" | "updated";

type State = {
  ideasLoaded: boolean,
  newIdea: Idea,
  sort: SortOptions,
  ideas: Idea[]
}

type CreateAction = {
  type: "CREATE_IDEA"
};

type HydrateAction = {
  type: "HYDRATE_IDEAS",
  ideas: Idea[];
};

type UpdateAction = {
  type: "UPDATE_IDEA",
  id: string,
  title: string,
  description: string,
};

type DestroyAction = {
  type: "DELETE_IDEA",
  id: string
};

type SortAction = {
  type: "SORT_IDEAS",
  sort: SortOptions
};

type Actions = 
  CreateAction 
  | HydrateAction
  | UpdateAction
  | DestroyAction
  | SortAction;

const generateNewIdea = (): Idea => ({
  id: uuidv4(),
  title: "",
  description: "description",
  lastUpdated: new Date().toString(),
});

const initialState = {
  ideasLoaded: false,
  newIdea: generateNewIdea(),
  sort: "updated" as const,
  ideas: []
}

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'CREATE_IDEA': {
      return {
       ...state,
        ideas: [...state.ideas, state.newIdea],
        newIdea: generateNewIdea()
      };
    }
    case "HYDRATE_IDEAS": {
      return {
        ...state,
        ideas: action.ideas,
        ideasLoaded: action.ideas.length > 0 ? true : false,
      };
    }
    case "UPDATE_IDEA": {
      const updatedIdeas = [...state.ideas];
      const ideaToUpdate = updatedIdeas.find(
        (idea) => idea.id === action.id
      )

      if (ideaToUpdate) {
        ideaToUpdate.title = action.title;
        ideaToUpdate.description = action.description;
        ideaToUpdate.lastUpdated = new Date().toString();
      }  
      return {
        ...state,
        ideas: updatedIdeas
      };
    }
    case "DELETE_IDEA": {
      return {
        ...state,
        ideas: state.ideas.filter((idea) => idea.id !== action.id)
      }
    }
    case "SORT_IDEAS": {
      let sortedIdeas = state.ideas;

      if (action.sort === 'alpha') {
        sortedIdeas = state.ideas.sort((a, b) => (a.title > b.title) ? 1 : -1);
      }
      
      if (action.sort === 'updated') {
        sortedIdeas = state.ideas.sort((a, b) => (new Date(a.lastUpdated) < new Date(b.lastUpdated)) ? 1 : -1);     
      }

      return {
        ...state,
        sort: action.sort,
        ideas: sortedIdeas
      }
    }
    default:
      return state;
  }
}

export default function Ideas() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stringToParse = localStorage.getItem("ideas");
    if (stringToParse) {
      const itemsArray = JSON.parse(stringToParse);
      dispatch({ type: "HYDRATE_IDEAS", ideas: itemsArray})
    }
  }, []);

  useEffect(() => {
    if (state.ideasLoaded || state.ideas.length > 0) {
      localStorage.setItem("ideas", JSON.stringify(state.ideas));
    }
    
  }, [state.ideas, state.ideasLoaded]);
  
  const handleNewIdea = () => dispatch({ type: "CREATE_IDEA" });

  const handleDelete = (id: string) => dispatch({ type: "DELETE_IDEA", id });

  const handleUpdate = (id: string, title: string, description: string) => {
    dispatch({ type: "UPDATE_IDEA", id, title, description })
  };

  const handleSort = (sort: SortOptions) => dispatch({ type: "SORT_IDEAS", sort});

  return (
    <section>
        <label className={styles.sortLabel}>Sort</label>
        <select className={styles.sortSelect}
          id="sort"
          value={state.sort}
          onChange={(e) => handleSort(e.target.value as SortOptions)}
        >
          <option value={"updated"}>Last Updated</option>
          <option value={"alpha"}>Alphabetically</option>
        </select>
      <section className={styles.ideasContainer}>
        {state.ideas && state.ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        ))}
      </section>
      <button className={styles.primary} onClick={handleNewIdea}>New Idea</button>
    </section>
  );
}