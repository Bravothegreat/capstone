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
import { firestore } from "../firebase/firebase"; // Ensure Firebase is properly configured
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectPage = ({ originalUrl }) => {
  const router = useRouter();

  useEffect(() => {
    if (originalUrl) {
      // Client-side redirection as a fallback
      router.replace(originalUrl);
    }
  }, [originalUrl, router]);

  return null; // Optionally, you can return a loading spinner or similar UI
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    // Access Firestore document based on the slug
    const docRef = doc(firestore, "urls", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const { originalUrl } = data;

      // Redirect to the original URL
      return {
        redirect: {
          destination: originalUrl,
          permanent: false, // Indicates the redirect is not permanent
        },
      };
    } else {
      return {
        notFound: true, // Show 404 page if the slug does not exist
      };
    }
  } catch (error) {
    console.error("Error fetching document from Firestore:", error);
    return {
      notFound: true, // Show 404 page in case of error
    };
  }
}

export default RedirectPage;
