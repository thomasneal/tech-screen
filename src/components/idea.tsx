import { SyntheticEvent, useState } from 'react';
import { Button, Card, CardActions, CardContent, Input, Typography, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Idea(props: any) {
  const [title, setTitle] = useState(props.title);
  const [editTitle, setEditTitle] = useState(false);
  const [desc, setDesc] = useState(props.description);
  const [editDesc, setEditDesc] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  function TitleInput(props: any) {
    return (
      <>
      <Input type="text" name="title" onBlur={(e) => updateTitle(e.target.value)} defaultValue={props.title} />
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
  }

  const updateDesc = (newDesc: string) => {
    setDesc(newDesc);
    setEditDesc(false);
  }

  const deleteIdea = () => {
   console.log("Delete this idea!");
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
          Last Updated: {props.lastUpdated}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteIdea}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}