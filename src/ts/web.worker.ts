import crypto from 'crypto-js';

interface DataFile {
  data: File;
  selectElText: string;
}

async function hash(file: DataFile) {
  if (file.data === undefined) {
    throw new Error("No selected file");
  }

  try {
    console.log('data', file.data)
    const response = await fetch(URL.createObjectURL(file.data));
    console.log('response', response)
    const arrayBuffer = await response.arrayBuffer();
    console.log('arrayBuffer', arrayBuffer)
    const byteArray = Array.from(new Uint8Array(arrayBuffer));
    const wordArray = crypto.lib.WordArray.create(byteArray);
    let hashValue;
    console.log('file', file);
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
  } catch (error) {
    throw error;
  }
}

self.addEventListener('message', async (event) => {
  try {
    console.log('worker');
    const result = await hash(event.data as DataFile);
    self.postMessage(result);
  } catch (error) {
    console.error(error);
  }
});

