import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPostDetails, updatePost } from "../api/api";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { toast } from "react-toastify";

const DiaryUpdate = () => {
  const [inputs, setInputs] = useState({ title: "", description: "", imageUrl: "", location: "" });
  const [errors, setErrors] = useState({});
  const [post, setPost] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostDetails(id)
      .then((data) => {
        setPost(data.post);
        setInputs({
          title: data.post.title,
          description: data.post.description,
          imageUrl: data.post.image,
          location: data.post.location,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch post details");
      });
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!inputs.title.trim()) newErrors.title = "Title is required";
    if (!inputs.description.trim()) newErrors.description = "Description is required";
    if (!inputs.imageUrl.trim()) newErrors.imageUrl = "Image URL is required";
    else if (!/^https?:\/\/.*\.(jpeg|jpg|gif|png)$/.test(inputs.imageUrl)) newErrors.imageUrl = "Enter a valid image URL (jpeg, jpg, gif, png)";
    if (!inputs.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onHandleData = (data) => {
    console.log(data);
    toast.success("Post updated successfully!");
    navigate("/diaries");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    updatePost(id, inputs)
      .then(onHandleData)
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update post");
      });
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error on input change
  };

  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flexDirection={"column"}>
      <Box display={"flex"} margin={"auto"} padding={2} alignItems={"center"}>
        <Typography fontWeight={"bold"} variant="h4" fontFamily={"Dancing Script,serif"}>
          Update Your Travel Diary
        </Typography>
        <TravelExploreIcon sx={{ fontSize: "40px", paddingLeft: 1, color: "lightcoral" }} />
      </Box>
      {post && (
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

            <Button type="submit" color="warning" sx={{ margin: "auto", borderRadius: 7, mt: 2, width: "50%" }} variant="contained">
              Update Post
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default DiaryUpdate;
