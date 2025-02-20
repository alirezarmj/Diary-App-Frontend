import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useState } from "react";
import { sendAddPostRequest } from "../api/api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddPost = () => {
  const [inputs, setInputs] = useState({ title: "", description: "", imageUrl: "", location: "", date: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!inputs.title.trim()) newErrors.title = "Title is required";
    if (!inputs.description.trim()) newErrors.description = "Description is required";
    if (!inputs.imageUrl.trim()) newErrors.imageUrl = "Image URL is required";
    else if (!/^https?:\/\/.*\.(jpeg|jpg|gif|png)$/.test(inputs.imageUrl)) newErrors.imageUrl = "Enter a valid image URL (jpeg, jpg, gif, png)";
    if (!inputs.location.trim()) newErrors.location = "Location is required";
    if (!inputs.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onHandleData = (data) => {
    console.log(data);
    toast.success("Post Added successfully!");
    navigate("/diaries");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    sendAddPostRequest(inputs)
      .then(onHandleData)
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add post");
      });
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error on change
  };

  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flexDirection={"column"}>
      <Box display={"flex"} margin={"auto"} padding={2} alignItems={"center"}>
        <Typography fontWeight={"bold"} variant="h4" fontFamily={"Dancing Script,serif"}>
          Add Your Travel Diary
        </Typography>
        <TravelExploreIcon sx={{ fontSize: "40px", paddingLeft: 1, color: "lightcoral" }} />
      </Box>
      <form onSubmit={handleSubmit}>
        <Box width={"80%"} padding={3} display={"flex"} margin={"auto"} flexDirection={"column"}>
          <FormLabel sx={{ fontFamily: "Quicksand" }}>Title</FormLabel>
          <TextField value={inputs.title} name="title" onChange={handleChange} variant="standard" margin="normal" error={!!errors.title} helperText={errors.title} />
          <FormLabel sx={{ fontFamily: "Quicksand" }}>Description</FormLabel>
          <TextField value={inputs.description} name="description" onChange={handleChange} variant="standard" margin="normal" error={!!errors.description} helperText={errors.description} />
          <FormLabel sx={{ fontFamily: "Quicksand" }}>Image URL</FormLabel>
          <TextField value={inputs.imageUrl} name="imageUrl" onChange={handleChange} variant="standard" margin="normal" error={!!errors.imageUrl} helperText={errors.imageUrl} />
          <FormLabel sx={{ fontFamily: "Quicksand" }}>Location</FormLabel>
          <TextField value={inputs.location} name="location" onChange={handleChange} variant="standard" margin="normal" error={!!errors.location} helperText={errors.location} />
          <FormLabel sx={{ fontFamily: "Quicksand" }}>Date</FormLabel>
          <TextField type="date" value={inputs.date} name="date" onChange={handleChange} variant="standard" margin="normal" error={!!errors.date} helperText={errors.date} />
          <Button type="submit" color="warning" sx={{ margin: "auto", borderRadius: 7, mt: 2, width: "50%" }} variant="contained">
            Post
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddPost;
