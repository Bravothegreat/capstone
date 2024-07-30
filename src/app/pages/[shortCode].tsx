
import { GetServerSideProps } from 'next';

interface RedirectProps {
  url: string;
}

const RedirectPage: React.FC<RedirectProps> = () => {
  return null; // This component doesn't render anything on the page
};

// Mock in-memory URL database for demonstration
const urlDatabase: Record<string, string> = {
  // Example entry: 'abc123': 'https://example.com'
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const shortCode = Array.isArray(context.params?.shortCode)
    ? context.params?.shortCode[0]
    : context.params?.shortCode;

  // Check if shortCode exists and is a string
  if (!shortCode || typeof shortCode !== 'string') {
    return { notFound: true };
  }

  // Look up the original URL from the in-memory database
  const url = urlDatabase[shortCode];

  // If no URL is found, return a 404 page
  if (!url) {
    console.error(`Short code not found: ${shortCode}`);
    return { notFound: true };
  }

  // Redirect to the original URL
  return {
    redirect: {
      destination: url,
      permanent: false,
    },
  };
};

export default RedirectPage;
