import { useState } from 'react';
import { Button, Card, CardActions, CardContent, Input, Typography, TextField, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import  { Idea } from '@/types/Idea';
import { formatRelativeTime } from "../utils/helpers";

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
    <Card variant="outlined" sx={{ width: 275, height: 300 }}>
      <CardContent>
        <Typography variant="h2" sx={{ fontSize: 20 }} gutterBottom onClick={() => setEditTitle(true)}>
          {editTitle ? <Input autoFocus type="text" name="title" onChange={(e) => updateTitle(e.target.value)} onBlur={(e) => setEditTitle(false)} defaultValue={title} /> : title}
        </Typography>
        <Typography variant="body1" component="div" color="text.secondary" sx={{ mb: 1.5 }} onClick={() => setEditDesc(true)}>
        {editDesc ? 
          <>
            <TextField
              name="description"
              autoFocus
              rows={3}
              inputProps={{ maxLength: 140 }}
              onBlur={() => setEditDesc(false)}
              defaultValue={idea.description}
              multiline
              onChange={(e) => updateDesc(e.target.value)}
            />
            <p>{140 - desc.length} characters remaining</p>
          </> : 
          desc
        }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last Updated: {formatRelativeTime(idea.lastUpdated)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined" startIcon={<DeleteIcon />}
          onClick={() => handleDelete(idea.id)}>
          Delete
        </Button>
      </CardActions>
      { showAlert &&
        <Alert onClose={() => setShowAlert(false)}>Idea updated successfully</Alert>
      }
    </Card>
  );
}