
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleShorten = async () => {
    try {
      const response = await axios.post('/api/shorten', {
        url: longUrl,
        customAlias,
      });
      setShortUrl(response.data.shortUrl);
      setQrCodeUrl(response.data.qrCodeUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div>
      <h1>Scissor URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Custom Alias (optional)"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
      />
      <button onClick={handleShorten}>Shorten</button>
      {shortUrl && (
        <div>
          <p>Short URL: <a href={shortUrl}>{shortUrl}</a></p>
          {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
        </div>
      )}
    </div>
  );
};

export default Home;
