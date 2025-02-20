/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Typography } from "@mui/material";

const LazyImage = ({ src, alt, width, height }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <Box width={width} height={height} display="flex" justifyContent="center" alignItems="center" bgcolor="#f0f0f0">
          <Typography>Loading...</Typography>
        </Box>
      )}
      <img src={src} alt={alt} width={width} height={height} style={{ display: loaded ? "block" : "none" }} onLoad={() => setLoaded(true)} />
    </>
  );
};

export default LazyImage;
