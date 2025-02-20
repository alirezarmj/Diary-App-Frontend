import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { sendAuthRequest } from "../api/api";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Auth = () => {
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storageHandle = (data) => {
    if (isSignup) {
      localStorage.setItem("userId", data.user._id);
      toast.success("Signed up successfully!");
    } else {
      localStorage.setItem("userId", data.id);
      toast.success("Logged in successfully!");
    }
    dispatch(authActions.login());
    navigate("/diaries");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    if (isSignup) {
      sendAuthRequest(true, inputs)
        .then(storageHandle)
        .catch((err) => {
          console.log(err);
          toast.error("Signup failed. Please try again");
        });
    } else {
      sendAuthRequest(false, inputs)
        .then(storageHandle)
        .catch((err) => {
          console.log(err);
          toast.error("Login failed");
        });
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Box margin={"auto"} sx={{ border: "1px solid lightGray", width: { xs: "90%", sm: "75%", md: "60%", lg: "50%" } }} borderRadius={10} marginTop={10} boxShadow={"5px 5px 10px #ccc"}>
      <form onSubmit={handleSubmit}>
        <Box width={"60%"} padding={5} margin={"auto"} display={"flex"} flexDirection={"column"}>
          <Typography variant="h4" textAlign={"center"}>
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <>
              <FormLabel>Name</FormLabel>
              <TextField type="text" onChange={handleChange} value={inputs.name} name="name" margin="normal" />
            </>
          )}
          <FormLabel>Email</FormLabel>
          <TextField type="email" onChange={handleChange} value={inputs.email} name="email" margin="normal" />
          <FormLabel>Password</FormLabel>
          <TextField type="password" onChange={handleChange} value={inputs.password} name="password" margin="normal" />
          <Button sx={{ mt: 2, borderRadius: 5 }} type="submit" variant="contained">
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button onClick={() => setIsSignup((prev) => !prev)} sx={{ mt: 2, borderRadius: 5 }} variant="outlined">
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Auth;
