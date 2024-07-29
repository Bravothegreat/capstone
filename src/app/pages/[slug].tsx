// "use client"

// import { GetServerSideProps } from "next";
// import { firestore } from "../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";


// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { slug } = context.params as { slug: string };
//   const docRef = doc(firestore, "urls", slug);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     return {
//       redirect: {
//         destination: docSnap.data().originalUrl,
//         permanent: false,
//       },
//     };
//   } else {
//     return {
//       notFound: true
//       // redirect: {
//       //   destination: "/",
//       //   permanent: false,
//       // },
//     };
//   }
// };

// export default function Redirect() {
//   return <div>Redirecting...</div>;
// }



// pages/[slug].js
import { firestore } from "../firebase/firebase"; // Make sure to configure Firebase
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/router';

const Redirect = ({ originalUrl }) => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    // Redirect to the original URL
    router.replace(originalUrl);
  }

  return null; // Or you can return a loading state
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const docRef = doc(firestore, "urls", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const { originalUrl } = data;

      return {
        props: { originalUrl }, // Pass originalUrl to the component
        redirect: {
          destination: originalUrl,
          permanent: false,
        },
      };
    } else {
      return {
        notFound: true, // Redirect to a 404 page if the slug does not exist
      };
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return {
      notFound: true, // Handle error gracefully
    };
  }
}

export default Redirect;
