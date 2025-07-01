const crypto = require('crypto');

const tripleDesKey = Buffer.from('123456789012345678901234', 'utf8'); // 24 bytes
const aesKey = crypto.createHash('sha256').update('my_aes_secret').digest();

exports.encryptTripleDES = (text) => {
  const cipher = crypto.createCipheriv('des-ede3', tripleDesKey, null);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
};

exports.decryptTripleDES = (encrypted) => {
  const decipher = crypto.createDecipheriv('des-ede3', tripleDesKey, null);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

exports.encryptAES = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return iv.toString('base64') + ':' + encrypted;
};

exports.decryptAES = (encrypted) => {
  const [ivStr, data] = encrypted.split(':');
  const iv = Buffer.from(ivStr, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
  let decrypted = decipher.update(data, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};