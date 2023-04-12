import { useState } from 'react';
import  { Idea } from '@/types/Idea';
import { formatRelativeTime } from "../utils/helpers";
import styles from "@/styles/Idea.module.scss"

type IdeaProps = {
  idea: Idea,
  handleDelete: (id: string) => void,
  handleUpdate: (id: string, title: string, description: string) => void
}

export default function IdeaCard({idea, handleDelete, handleUpdate}: IdeaProps) {
  const [title, setTitle] = useState(idea.title);
  const [editTitle, setEditTitle] = useState(false);
  const [desc, setDesc] = useState(idea.description);
  const [editDesc, setEditDesc] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const updateTitle = (newTitle: string) => {
    (newTitle === '') ? setTitle("Title") : setTitle(newTitle); 
    handleUpdate(idea.id, newTitle, desc);
    setShowAlert(true);
  }

  const updateDesc = (newDesc: string) => {
    if (newDesc === '') {
      newDesc = "Description";
    }
    setDesc(newDesc); 
    handleUpdate(idea.id, title, newDesc);
    setShowAlert(true);
  }

  return (
    <div className={styles.idea}>
        {editTitle ? 
          <input autoFocus type="text" name="title" onChange={(e) => updateTitle(e.target.value)} onBlur={(e) => setEditTitle(false)} defaultValue={title} /> : <h2 onClick={() => setEditTitle(true)}>{title}</h2>
        }
        {editDesc ? 
          <>
            <textarea
              name="description"
              autoFocus
              rows={3}
              //inputProps={{ maxLength: 140 }}
              onBlur={() => setEditDesc(false)}
              defaultValue={idea.description}
              //multiline
              onChange={(e) => updateDesc(e.target.value)}
            ></textarea>
            <p>{140 - desc.length} characters remaining</p>
          </> : 
          <p className={styles.desc} onClick={() => setEditDesc(true)}>{desc}</p>
        }
        <p className={styles.updated}>
          Last Updated: {formatRelativeTime(idea.lastUpdated)}
        </p>
        <button className={styles.delete}
          onClick={() => handleDelete(idea.id)}>
          Delete
        </button>
      { showAlert &&
        <div className={styles.alert} onClick={() => setShowAlert(false)}>
          <p>Idea updated successfully</p>
        </div>
      }
    </div>
  );
}