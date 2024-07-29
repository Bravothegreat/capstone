// "use client"

import { GetServerSideProps } from "next";
import { firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getServerSideProps: GetServerSideProps = async (context) => {
 

  const { slug } = context.params as { slug: string };
  const docRef = doc(firestore, "urls", slug);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    return {
      redirect: {
        destination: "https://www.google.com",
        permanent: false,
      },
    };

    // return {
    //   redirect: {
    //     destination: docSnap.data().originalUrl,
    //     permanent: false,
    //   },
    // };
  } else {
    return {
      notFound: true,
    };
  }

};

// export default function Redirect() {
//   return <div>Redirecting...</div>;
// }


