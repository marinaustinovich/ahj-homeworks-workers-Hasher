import crypto from 'crypto-js';
/* eslint-disable */
import { DataFile } from './types';

async function hash(file : DataFile) {
  if (file.data === undefined) {
    throw new Error('No selected file');
  }

  const response = await fetch(URL.createObjectURL(file.data));
  const arrayBuffer = await response.arrayBuffer();
  const byteArray = Array.from(new Uint8Array(arrayBuffer));
  const wordArray = crypto.lib.WordArray.create(byteArray);
  let hashValue;
  switch (file.selectElText) {
    case 'MD5':
      hashValue = crypto.MD5(wordArray).toString(crypto.enc.Hex);
      break;
    case 'SHA1':
      hashValue = crypto.SHA1(wordArray).toString(crypto.enc.Hex);
      break;
    case 'SHA256':
      hashValue = crypto.SHA256(wordArray).toString(crypto.enc.Hex);
      break;
    case 'SHA512':
      hashValue = crypto.SHA512(wordArray).toString(crypto.enc.Hex);
      break;
    default:
      hashValue = crypto.SHA512(wordArray).toString(crypto.enc.Hex);
  }
  return hashValue;
}

self.addEventListener('message', async (event) => {
  try {
    const result = await hash(event.data);
    self.postMessage(result);
  } catch (error) {
    console.error(error);
  }
});
