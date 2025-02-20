/* eslint-disable react/prop-types */
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router"; // Fixed import

import { deletePost } from "../api/api";
import { toast } from "react-toastify";

const DiaryItem = ({ title, location, description, date, image, user, id, onDelete, name }) => {
  const handleDelete = async () => {
    try {
      await deletePost(id);
      onDelete(id); // Notify parent to update the list
      toast.success("Post deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  const isLoggedIn = () => user === localStorage.getItem("userId");

  return (
    <Card
      sx={{
        width: { xs: "90%", sm: "75%", md: "60%", lg: "50%" }, // Responsive widths
        display: "flex",
        flexDirection: "column",
        margin: "1rem auto",
        padding: 1,
        boxShadow: "5px 5px 10px #ccc",
        borderRadius: 3,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <EditLocationAltIcon />
          </IconButton>
        }
        title={location}
        subheader={date}
      />
      <img src={image} height={300} alt={title} style={{ objectFit: "cover" }} />
      <CardContent>
        <Typography variant="h6" paddingBottom={1} sx={{ color: "text.secondary" }}>
          {title}
        </Typography>
        <hr />

        <Box paddingTop={1} display="flex" justifyContent="flex-start" alignItems="flex-start">
          <Typography
            width="15%" // Fixed width for the name
            fontWeight="bold"
            sx={{ color: "text.secondary", fontSize: "15px", flexShrink: 0 }}
          >
            {name}:
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "15px", // Matching font size
              marginRight: "auto",
              overflowWrap: "break-word", // Wrap long text
              paddingLeft: "5px",
              flexGrow: 1,
            }}
          >
            {description}
          </Typography>
        </Box>
      </CardContent>

      {isLoggedIn() && (
        <CardActions sx={{ marginLeft: "auto" }}>
          <IconButton component={Link} to={`/post/${id}`} color="warning">
            <ModeEditIcon sx={{ fontSize: "30px" }} />
          </IconButton>
          <IconButton onClick={handleDelete} color="error">
            <DeleteForeverIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default DiaryItem;
