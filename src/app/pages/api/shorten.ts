
import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
// import QRCode from 'qrcode';
import QRCode from 'qrcode';

interface ShortenRequest {
  url: string;
  customAlias?: string;
}

interface ShortenResponse {
  shortUrl: string;
  qrCodeUrl?: string;
}

let urlDatabase: Record<string, string> = {};

const generateShortCode = (customAlias?: string): string => {
  return customAlias ? customAlias : nanoid(6);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShortenResponse>
) {
  const { url, customAlias } = req.body as ShortenRequest;
  const shortCode = generateShortCode(customAlias);

  urlDatabase[shortCode] = url;

  const shortUrl = `${req.headers.host}/${shortCode}`;
  const qrCodeUrl = await QRCode.toDataURL(shortUrl);

  res.status(200).json({ shortUrl, qrCodeUrl });
}
