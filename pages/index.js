import { Avatar, Container, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import nookies from "nookies";
import { useAuth } from "../config/Auth";
import { StudentContext } from "../src/components/Context/StudentContext";
import { AdminContext } from "../src/components/Context/AdminContext";
import { TeacherContext } from "../src/components/Context/TeacherContext";
import { auth } from "../config/firebase";
import Student from "../src/components/Students";
import Teacher from "../src/components/Teacher";
import Admin from "../src/components/Admin";
export default function Home() {
  const { currentUser, user, userData } = useAuth();

  if ((user !== undefined && user.isAdmin) || userData.isAdmin) {
    return (
      <AdminContext.Provider value={{}}>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={3}>
            <IconButton onClick={() => auth.signOut()}>
              <Avatar src={currentUser.photoURL} />
            </IconButton>
            <Typography variant="h5">
              {/* {JSON.stringify(currentUser)} */}
              {currentUser.displayName}
            </Typography>
          </Box>
          <Admin />
        </Container>
      </AdminContext.Provider>
    );
  } else if ((user !== undefined && user.isTeacher) || userData.isTeacher) {
    return (
      <TeacherContext.Provider value={{}}>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={3}>
            <IconButton onClick={() => auth.signOut()}>
              <Avatar src={currentUser.photoURL} />
            </IconButton>
            <Typography variant="h5">
              {/* {JSON.stringify(currentUser)} */}
              {currentUser.displayName}
            </Typography>
          </Box>
          <Teacher />
        </Container>
      </TeacherContext.Provider>
    );
  } else {
    return (
      <StudentContext.Provider value={{}}>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={3}>
            <IconButton onClick={() => auth.signOut()}>
              <Avatar src={currentUser.photoURL} />
            </IconButton>
            <Typography variant="h5">
              {/* {JSON.stringify(currentUser)} */}
              {currentUser.email}
            </Typography>
          </Box>
          <Student />
        </Container>
      </StudentContext.Provider>
    );
  }
}

// export async function getServerSideProps(context) {
//   try {
//     const cookies = nookies.get(context)
//     const token = await vertifyIdToken
//   }
// }
