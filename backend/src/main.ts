import express from "express";
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 8080
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

type Symbol = {
    one: string,
    two: string,
    three: string,
    four: string,
    five: string,
    six: string,
    bonus: string
}

type slotRow = [Symbol, Symbol, Symbol]

function getRandomSymbol(): Symbol {
    let symbolValues = Object.values(Symbol)
    let randomIndex = Math.floor(Math.random() * symbolValues.length)
    return symbolValues[randomIndex]
}

function generateSlotRow(): slotRow {
    return [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()] 
}

function isWinningRow(row: slotRow): boolean{
    if (row[0] === row[1] || row[0] === row[1] && row[1] === row[2]) {
        return true
    } else {
        return false
    }
}

function spin(): {row: slotRow, isWin: boolean} {
    let row = generateSlotRow()
    let isWin = isWinningRow(row)
    return {row, isWin}
}

app.post("/api/spin", (res, req) => {

})

app.get("/api/spin", (req, res) => {

})