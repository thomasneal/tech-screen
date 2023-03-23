import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

export default function Idea(props: any) {
  const [title, setTitle] = useState(props.title);
  const [editTitle, setEditTitle] = useState(false);

  function TitleInput(props: any) {
    return (
      <>
      <input type="text" name="title" onBlur={(e) => setTitle(e.target.value)} value={props.title} />
      </>
    );
  }

  const handleEdit = () => {
    console.log("Edit title");
    setEditTitle(true);
  }

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h2" sx={{ fontSize: 20 }} gutterBottom onClick={handleEdit}>
          {/* {editTitle ? <TitleInput title={title} /> : title} */}
          {title}
        </Typography>
        <Typography variant="body1" component="div" color="text.secondary" sx={{ mb: 1.5 }} >
          {props.description}
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