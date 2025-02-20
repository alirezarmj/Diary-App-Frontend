import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../api/api";
import { DiaryItem } from "../components";

const Diaries = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data.posts.reverse() || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [dispatch]);

  const handleDelete = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  };

  return (
    <Box padding={3} justifyContent="center" display="flex" flexDirection="column" alignItems="center">
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress color="info" size={50} />
        </Box>
      ) : (
        <>
          {posts.length > 0 ? (
            posts.map((item) => (
              <DiaryItem
                key={item._id}
                onDelete={handleDelete}
                user={item.user._id}
                name={item.user.name}
                date={new Date(item.date).toLocaleDateString()}
                title={item.title}
                description={item.description}
                id={item._id}
                image={item.image}
                location={item.location}
              />
            ))
          ) : (
            <Typography variant="h5" color="info" padding={4}>
              No posts to display
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Diaries;
