
import { GetServerSideProps } from 'next';

let urlDatabase: Record<string, string> = {};

// Example usage
const shortCode = 'abc123';
const originalUrl = 'https://example.com';

// Store the mapping
urlDatabase[shortCode] = originalUrl;

// Retrieve the original URL using the short code
const storedUrl = urlDatabase[shortCode];
console.log(storedUrl); // Outputs: https://example.com

  

interface RedirectProps {
  url: string;
}

const RedirectPage: React.FC<RedirectProps> = ({ url }) => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // let urlDatabase: Record<string, string> = {};


    const  {shortCode}  = context.params;
  const url = urlDatabase[shortCode];

  if (!url) {
    return { notFound: true };
  }

  return {
    redirect: {
      destination: url,
      permanent: false,
    },
  };
};

export default RedirectPage;
