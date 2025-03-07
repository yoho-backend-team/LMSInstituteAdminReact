import secureLocalStorage from 'react-secure-storage';


const hashKey = async (key) => {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key));
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
};


const secureStorage = {
  set: async (key, value) => {
    const hashedKey = await hashKey(key); 
    secureLocalStorage.setItem(hashedKey, JSON.stringify(value)); 
  },

  get: async (key) => {
    const hashedKey = await hashKey(key); 
    const data = secureLocalStorage.getItem(hashedKey); 
    return data ? JSON.parse(data) : null; d
  },

  remove: async (key) => {
    const hashedKey = await hashKey(key); 
    secureLocalStorage.removeItem(hashedKey); 
  }
};

export default secureStorage;
