import Link from "next/link";

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
import Head from "next/head";
export default function Home() {
  const { currentUser, user, userData } = useAuth();

  if ((user !== undefined && user.isAdmin) || userData.isAdmin) {
    return (
      <AdminContext.Provider value={{}}>
        <Head>
          <title>Админ</title>
          <link
            rel="icon"
            href={"./images/tsogts.jpg"}
            type="image/gif"
            sizes="16x16"
          />
        </Head>

        <Admin />
      </AdminContext.Provider>
    );
  } else if ((user !== undefined && user.isTeacher) || userData.isTeacher) {
    return (
      <TeacherContext.Provider value={{}}>
        <Head>
          <title>Багш</title>
          <link
            rel="icon"
            href={"./images/tsogts.jpg"}
            type="image/gif"
            sizes="16x16"
          />
        </Head>
        <Teacher />
      </TeacherContext.Provider>
    );
  } else {
    return (
      <StudentContext.Provider value={{}}>
        <Head>
          <title>Сурагч</title>
          <link
            rel="icon"
            href={"./images/tsogts.jpg"}
            type="image/gif"
            sizes="16x16"
          />
        </Head>
        <Student />
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
