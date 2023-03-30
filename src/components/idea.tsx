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
  const [wordCount, setWordCount] = useState(0);

  function TitleInput(props: any) {
    return (
      <>
      <Input autoFocus={true} type="text" name="title" onBlur={(e) => updateTitle(e.target.value)} defaultValue={title} />
      </>
    );
  }

  function DescriptionInput(props: any) {
    return (
      <>
      <TextField name="description" onBlur={(e) => updateDesc(e.target.value)} defaultValue={props.desc} multiline />
      </>
    );
  }

  const checkWordCount = (val: any) => {
    console.log("count", val.length);
    setWordCount(val);
    
  }

  const updateTitle = (newTitle: string) => {
    setTitle(newTitle);
    setEditTitle(false);
    props.handleUpdate(props.idea.id, newTitle, desc);
  }

  const updateDesc = (newDesc: string) => {
    setDesc(newDesc);
    setEditDesc(false);
    props.handleUpdate(props.idea.id, title, newDesc);
  }

  return (
    <Card variant="outlined" sx={{ width: 275, height: 275 }}>
      <CardContent>
        <Typography variant="h2" sx={{ fontSize: 20 }} gutterBottom onClick={editTitle => setEditTitle(true)}>
          {editTitle ? <TitleInput title={title} /> : title}
        </Typography>
        <Typography variant="body1" component="div" color="text.secondary" sx={{ mb: 1.5 }} onClick={editDesc => setEditDesc(true)}>
        {editDesc ? <DescriptionInput desc={desc} /> : desc}
        </Typography>
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