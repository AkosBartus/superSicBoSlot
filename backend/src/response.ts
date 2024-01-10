import axios from "axios";
import fs from 'fs'

const requestCount = 100;
const responses: unknown[] = [];

async function sendRequest() {
  try {
    const response = await axios.post('http://localhost:8080/api/spin', {});
    responses.push(response.data);
  } catch (error) {
    console.error('Hiba:', error);
  }
}

async function main() {
  for (let i = 0; i < requestCount; i++) {
    await sendRequest();
  }

  const outputPath = '../database/spins.json'; // A menteni kívánt JSON fájl elérési útvonala
  const jsonData = JSON.stringify(responses, null, 2);

  fs.writeFile(outputPath, jsonData, 'utf8', (err: unknown) => {
    if (err) {
      console.error('Hiba a fájl mentése során:', err);
    } else {
      console.log('Válaszok elmentve:', outputPath);
    }
  });
}

main();
