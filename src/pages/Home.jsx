import { Suspense } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router"; // Corrected import for react-router-dom
import LazyImage from "../components/LazyImage";

const Home = () => {
  return (
    <Box position={"relative"} width={"100%"} height={"90vh"}>
      <Suspense fallback={<Typography>Loading image...</Typography>}>
        <LazyImage src="/road.jpg" alt="Road" width={"100%"} height={"70%"} />
      </Suspense>
      <Typography
        fontWeight={"bold"}
        fontFamily={"Dancing Script,serif"}
        variant="h3"
        color="#111115de"
        width={"100%"}
        textAlign={"center"}
        sx={{ position: "absolute", top: "0px", background: "#B2cbdf", fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }}
      >
        Dare to live the life you&apos;ve always wanted
      </Typography>
      <Box
        width={"100%"}
        height={"30%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"} // Center content vertically
        alignItems={"center"} // Center content horizontally
      >
        {/* Title */}
        <Typography
          fontFamily={"Quicksand"}
          textAlign={"center"}
          variant="h4"
          padding={4}
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Responsive font size
          }}
        >
          SHARE YOUR TRAVEL DIARIES WITH US
        </Typography>

        {/* Buttons Container */}
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", sm: "row" }} // Stack buttons vertically on small screens, horizontally on larger screens
          gap={2} // Add spacing between buttons
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          maxWidth={"600px"} // Limit maximum width for better readability
        >
          {/* View Diaries Button */}
          <Button
            LinkComponent={Link}
            to="/diaries"
            variant="contained"
            sx={{
              width: { xs: "80%", sm: "auto" }, // Full width on small screens, auto width on larger screens
              fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
            }}
          >
            View Diaries
          </Button>
          {/* Share Your Story Button */}
          <Button
            variant="outlined"
            sx={{
              width: { xs: "80%", sm: "auto" }, // Full width on small screens, auto width on larger screens
              fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
            }}
          >
            Share Your Story
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
