import axios from "axios";
import fs from 'fs'

const requestCount = 100;
const responses: unknown[] = [];

async function sendRequest() {
  try {
    const response = await axios.post('http://localhost:8080/api/spin', {});
    responses.push(response.data);

    if (response.data.isBonus > 0) {
      console.log(`Bónusz talált! (${responses.length}/${requestCount}), Bónusz pörgetések: ${response.data.isBonus}`);
    } else {
      console.log(`Request sikeresen elküldve (${responses.length}/${requestCount})`);
    }
  } catch (error) {
    console.error('Hiba történt a kérés küldése közben:', error);
  }
}

async function main() {
  for (let i = 0; i < requestCount; i++) {
    await sendRequest();
  }

  const outputPath = '../database/spins.json';
  const jsonData = JSON.stringify(responses, null, 2);

  fs.writeFile(outputPath, jsonData, 'utf8', (err: unknown) => {
    if (err) {
      console.error('Hiba a fájl mentése során:', err);
    } else {
      console.log('Válaszok sikeresen elmentve:', outputPath);
    }
  });
}

main();
