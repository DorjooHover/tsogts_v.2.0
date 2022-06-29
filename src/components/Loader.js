import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { Box } from "@mui/material";
const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Box
          width={"100vw"}
          height={"100vh"}
          position="absolute"
          zIndex={"100"}
          top={"0px"}
          left={"-240px"}
        >
          <HashLoader size={10} loading={loading} />
        </Box>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default Loader;
