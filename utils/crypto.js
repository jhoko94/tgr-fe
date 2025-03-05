import CryptoJS from 'crypto-js';

const SECRET_KEY = 'e4928505c2195b44ca180554c1bdf3f462338e2d862d09bc4d9cfb3f7cab2545';

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error decrypting:', error);
    return null;
  }
};
