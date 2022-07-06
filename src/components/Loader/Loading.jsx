import { Grid } from "@mui/material";
import ReactLoading from "react-loading";
// import HashLoader from 'react-spinners/HashLoader';
import { HashLoader } from "react-spinners";
import { css } from "@emotion/react";
const Loading = ({ type, color, loading }) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems={"center"}
      justifyContent="center"
      width={"100vw"}
      height={"100vh"}
      position="absolute"
      zIndex={"100"}
      top={"0px"}
      left={"0px"}
    >
      <HashLoader
        color={"#11101b"}
        loading={loading}
        css={override}
        size={50}
      />
    </Grid>
  );
};

export default Loading;
