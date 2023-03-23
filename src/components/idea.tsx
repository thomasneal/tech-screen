import { SyntheticEvent, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

export default function Idea(props: any) {
  const [title, setTitle] = useState(props.title);
  const [editTitle, setEditTitle] = useState(false);
  const [desc, setDesc] = useState(props.description);
  const [editDesc, setEditDesc] = useState(false);

  function TitleInput(props: any) {
    return (
      <>
      <input type="text" name="title" onBlur={(e) => updateTitle(e.target.value)} defaultValue={props.title} />
      </>
    );
  }

  function DescriptionInput(props: any) {
    return (
      <>
      <textarea name="description" onBlur={(e) => updateDesc(e.target.value)} defaultValue={props.desc} />
      </>
    );
  }

  const updateTitle = (newTitle: string) => {
    setTitle(newTitle);
    setEditTitle(false);
  }

  const updateDesc = (newDesc: string) => {
    setDesc(newDesc);
    setEditDesc(false);
  }

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
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
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}