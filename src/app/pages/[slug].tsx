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


// pages/api/shorten.js
import { firestore } from '../firebase/firebase'; // Ensure this path is correct
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url, customSlug } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const slug = customSlug ? customSlug.trim() : nanoid(6);
    const docRef = doc(firestore, 'urls', slug);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return res.status(400).json({ error: 'Slug already in use. Please choose another.' });
      }

      await setDoc(docRef, {
        originalUrl: url,
        slug: slug,
      });

      const shortUrl = `${req.headers.origin}/${slug}`;

      return res.status(200).json({ shortUrl });
    } catch (error) {
      console.error('Error creating shortened URL:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
