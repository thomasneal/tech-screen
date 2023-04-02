import { useState } from 'react';
import { Button, Card, CardActions, CardContent, Input, Typography, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import  { Idea } from '@/types/Idea';
import { formatRelativeTime } from "../utils/helpers";

type IdeaProps = {
  idea: Idea,
  handleDelete: (id: string) => void,
  handleUpdate: (id: string, title: string, description: string) => void
}

export default function IdeaCard(props: IdeaProps) {
  const [title, setTitle] = useState(props.idea.title);
  const [editTitle, setEditTitle] = useState(false);
  const [desc, setDesc] = useState(props.idea.description);
  const [editDesc, setEditDesc] = useState(false);

  const checkWordCount = (val: number) => {
    console.log("checking....");
    setWordCount(val);
  }

  const updateTitle = (newTitle: string) => {
    (newTitle === '') ? setTitle("Title") : setTitle(newTitle); 
    // setEditTitle(false);
    props.handleUpdate(props.idea.id, newTitle, desc);
  }

  const updateDesc = (newDesc: string) => {
    //(newDesc === '') ? setDesc("Description") : setDesc(newDesc); 
    if (newDesc === '') {
      newDesc = "Description"; // mutating
    }
    setDesc(newDesc);
    setEditDesc(false);
    props.handleUpdate(props.idea.id, title, newDesc);
  }

  return (
    <Card variant="outlined" sx={{ width: 275, height: 275 }}>
      <CardContent>
        {editTitle ? <Input autoFocus type="text" name="title" onChange={(e) => updateTitle(e.target.value)} onBlur={() => setEditTitle(false)} defaultValue={title} /> : <Typography variant="h2" sx={{ fontSize: 20 }} gutterBottom onClick={editTitle => setEditTitle(true)}>{title}</Typography>}
        
        {editDesc ? 
        <>
          <TextField
          name="description"
          //autoFocus={true}
          rows={3}
          inputProps={{ maxLength: 140 }}
          onBlur={(e) => updateDesc(e.target.value)}
          defaultValue={desc}
          multiline
          onChange={(e) => setDesc(e.target.value)}
        />
        <p>{140 - desc.length} characters remaining</p>
        </>
        : 
        <Typography variant="body1" component="div" color="text.secondary" sx={{ mb: 1.5 }} onClick={editDesc => setEditDesc(true)}>desc</Typography>}
        
        <Typography variant="body2" color="text.secondary">
          Last Updated: {formatRelativeTime(props.idea.lastUpdated)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined" startIcon={<DeleteIcon />}
          onClick={(e) => props.handleDelete(props.idea.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}