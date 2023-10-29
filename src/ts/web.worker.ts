import crypto from 'crypto-js';
import { FileData } from './types';

async function hash(file: FileData): Promise<string> {
  const objectURL = URL.createObjectURL(file.data);
  try {
    const response = await fetch(objectURL);
    const arrayBuffer = await response.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer);
    const wordArrayFromBuffer = crypto.lib.WordArray.create(Array.from(byteArray));

    const hashFunctions: {
      [key: string]: (wordArray: any) => crypto.lib.WordArray;
    } = {
      MD5: crypto.MD5,
      SHA1: crypto.SHA1,
      SHA256: crypto.SHA256,
      SHA512: crypto.SHA512,
    };

    const hashFunction = hashFunctions[file.selectElText] || crypto.SHA512;
    const hashValue = hashFunction(wordArrayFromBuffer).toString(crypto.enc.Hex);

    return hashValue;
  } finally {
    URL.revokeObjectURL(objectURL);
  }
}
// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', async (event: MessageEvent<FileData>) => {
  try {
    const result = await hash(event.data);
    // eslint-disable-next-line no-restricted-globals
    (self as any).postMessage(result);
  } catch (error) {
    console.error(error);
    // eslint-disable-next-line no-restricted-globals
    (self as any).postMessage({
      error: 'An error occurred while calculating the hash.',
    });
  }
});
