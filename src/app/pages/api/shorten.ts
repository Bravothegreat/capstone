import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
// import QRCode from 'qrcode';

interface ShortenRequest {
  url: string;
  customAlias?: string;
}

interface ShortenResponse {
  shortUrl: string;
  qrCodeUrl?: string;
}

let urlDatabase: Record<string, string> = {};

// Function to validate URLs
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const generateShortCode = (customAlias?: string): string => {
  return customAlias ? customAlias : nanoid(6);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShortenResponse | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { url, customAlias } = req.body as ShortenRequest;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ message: 'Invalid URL' });
  }

  if (customAlias && urlDatabase[customAlias]) {
    return res.status(409).json({ message: 'Custom alias already exists' });
  }

  let shortCode = customAlias || generateShortCode();

  if (urlDatabase[shortCode]) {
    // In case of collision, generate a new code
    shortCode = generateShortCode();
  }

  urlDatabase[shortCode] = url;

  const shortUrl = `${req.headers.host}/${shortCode}`;

  // let qrCodeUrl;
  // try {
  //   qrCodeUrl = await QRCode.toDataURL(shortUrl);
  // } catch (error) {
  //   console.error('QR Code generation failed:', error);
  //   return res.status(500).json({ message: 'Failed to generate QR Code' });
  // }

  res.status(200).json({ shortUrl });
}
