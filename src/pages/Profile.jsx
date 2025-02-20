import { useEffect, useState } from "react";
import { getUserDetails } from "../api/api";
import { Box, Button, CircularProgress, Typography, Container, Avatar, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DiaryItem from "../components/DiaryItem";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails();
        setUser(data.user || {});
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch user details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, [dispatch]);

  const handleClick = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userId");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="info" size={50} />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            margin: "0 auto",
            bgcolor: "primary.main",
            fontSize: "3rem",
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h3" fontFamily="Quicksand" mt={2} mb={1}>
          {user?.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {user?.email}
        </Typography>
        <Button onClick={handleClick} variant="contained" color="warning" sx={{ mt: 2, width: { xs: "100%", sm: "auto" } }}>
          Logout
        </Button>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" fontFamily="Quicksand" textAlign="center" mb={4}>
          My Posts
        </Typography>
        <Grid container spacing={4}>
          {user?.posts?.length > 0 ? (
            user.posts.map((post, index) => (
              <Grid size={{ xs: 12 }} key={index}>
                <DiaryItem
                  onDelete={() => {}}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  id={post._id}
                  image={post.image}
                  user={post.user._id}
                  name={user.name}
                  location={post.location}
                />
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" color="textSecondary" textAlign="center">
                    No posts to display
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
