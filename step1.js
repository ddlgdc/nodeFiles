import fs from 'fs'
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${path}:`);
        console.error(`  ${err.message}`);
        process.exit(1); 
      }
      console.log(data);
    });
  }

  async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    }
    catch (err) {
        console.error(`Error fetching ${url}:`);
        console.error(`  ${err.message}`);
        process.exit(1);
    }
  }

  const arg = process.argv[2]

  if (!arg) {
    console.error('Please provide a filename or URL as an argument.');
    process.exit(1);
  }

  if (arg.startsWith('http://') || arg.startsWith('https://')) {
    webCat(arg);
  }
  else {
    cat(arg);
  }