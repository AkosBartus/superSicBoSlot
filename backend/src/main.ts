import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

/* ------------------------------------------------------------------------------- */

type Symbol = {
  one?: string;
  two?: string;
  three?: string;
  four?: string;
  five?: string;
  six?: string;
  bonus?: string;
};

const symbols: Symbol[] = [
  { one: "1" },
  { two: "2" },
  { three: "3" },
  { four: "4" },
  { five: "5" },
  { six: "6" },
  { bonus: "FREE SPINS" },
];

function getRandomSymbol(): Symbol {
    const randomValue = Math.random();
    if (randomValue < 0.03) {
      return { bonus: "FREE SPINS" };
    } else {
      const randomIndex = Math.floor(Math.random() * 6);
      return symbols[randomIndex];
    }
}

function generateSlotRow(): Symbol[] {
  return [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
}

function isWinningRow(row: Symbol[]): boolean {
  const isBonusSymbol = row.some((symbol) => symbol?.bonus === "FREE SPINS");

  if (isBonusSymbol) {
    return true;
  } else if (
    (row[0] === row[1] && row[1] === row[2] && !isBonusSymbol) ||
    (row[0] === row[1] && !isBonusSymbol)
  ) {
    return true;
  } else {
    return false;
  }
}

function spin(): { row: Symbol[], isWin: boolean, isBonus: number } {
  let row = generateSlotRow();
  let isWin = isWinningRow(row);
  let isBonus = freeSpins(row)
  return { row, isWin, isBonus };
}

/* ------------------------------------------------------------------------------- */

function isFreeSpins(row: Symbol[]): boolean {
    return row.some((symbol) => symbol?.bonus === "FREE SPINS")
}


function freeSpins(row: Symbol[]): number {
    const hasFreeSpins = isFreeSpins(row)
    let freeSpinsCount: number = 6
    if (hasFreeSpins) {
        


        for (let index = 0; index < row.length; index++) {
            if (row[index]?.bonus === "FREE SPINS") {
                freeSpinsCount += 3
            }          
        }
    } else {
        freeSpinsCount = 0
    }

    return freeSpinsCount
}

app.post("/api/spin", (req, res) => {
  const { name, balance, coinValue } = req.body;

  const spinResult = spin();

  res.json(spinResult);
});

app.get("/api/spin", (req, res) => {});


export{spin}