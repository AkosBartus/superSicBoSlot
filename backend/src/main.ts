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

let totalSpins: number = 0;

function getRandomSymbol(useBonus: boolean = false): Symbol {
  const randomValue = Math.random();
  if (randomValue < 0.01) {
    return { bonus: "FREE SPINS" };
  } else {
    const randomIndex = Math.floor(Math.random() * 6);
    return symbols[randomIndex];
  }
}

function generateSlotRow(useBonus: boolean = false): Symbol[] {
  return [
    getRandomSymbol(useBonus),
    getRandomSymbol(useBonus),
    getRandomSymbol(useBonus),
  ];
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

function freeSpins(row: Symbol[]): number {
  let freeSpinsCount: number = 6;

  for (let index = 0; index < row.length; index++) {
    if (row[index]?.bonus === "FREE SPINS") {
      freeSpinsCount += 3;
    }
  }

  return freeSpinsCount;
}

function spin(useBonus: boolean = false): {
  row: Symbol[];
  isWin: boolean;
  isBonus: number;
} {
  let row = generateSlotRow(useBonus);
  let isWin = isWinningRow(row);
  let isBonus = 0;

  if (useBonus) {
    isBonus = freeSpins(row);

    if (isBonus > 0) {
      totalSpins += isBonus;
    }
  }

  totalSpins++;

  return { row, isWin, isBonus };
}

/* ------------------------------------------------------------------------------- */

app.post("/api/spin", (req, res) => {
  const { name, balance, coinValue } = req.body;

  const spinResult = spin();

  res.json(spinResult);
});

app.get("/api/spin", (req, res) => {});

export { spin };