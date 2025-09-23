package game

import (
	"fmt"
	"math/rand/v2"
)

type SlotMachine struct{}

type SpinArgs struct {
	BetAmount float64 `json:"bet_amount"`
}

type SpinResult struct {
	Symbols   []string `json:"symbols"`
	IsWin     bool     `json:"is_win"`
	WinAmount float64  `json:"win_amount"`
	Message   string   `json:"message"`
}

// Símbolos da máquina
var symbols = []string{"🍒", "🍋", "🍊", "🍇", "⭐", "💎", "🎰", "🔔"}

var symbolMultipliers = map[string]int{
	"🍒": 2,
	"🍋": 3,
	"🍊": 4,
	"🍇": 5,
	"⭐": 8,
	"💎": 15,
	"🎰": 25,
	"🔔": 50,
}

func NewSlotMachine() *SlotMachine {
	return &SlotMachine{}
}

func (s *SlotMachine) Spin(args *SpinArgs, result *SpinResult) error {
	gameSymbols := make([]string, 3)

	for i := 0; i < 3; i++ {
		gameSymbols[i] = symbols[rand.IntN(len(symbols))]
	}

	// Verifica se ganhou
	isWin := gameSymbols[0] == gameSymbols[1] && gameSymbols[1] == gameSymbols[2]
	winAmount := 0.0
	multiplier := 0
	message := "Tente novamente!"

	if isWin {
		multiplier = symbolMultipliers[gameSymbols[0]]
		winAmount = args.BetAmount * float64(multiplier)
		message = "🎉 PARABÉNS! VOCÊ GANHOU!"
	}

	// Monta a resposta
	result.Symbols = gameSymbols
	result.IsWin = isWin
	result.WinAmount = winAmount
	result.Message = message

	// Log no servidor
	if isWin {
		fmt.Printf("🎉 VITÓRIA! %s %s %s - Ganhou R$%.2f\n",
			gameSymbols[0], gameSymbols[1], gameSymbols[2], winAmount)
	} else {
		fmt.Printf("❌ %s %s %s - Não ganhou\n",
			gameSymbols[0], gameSymbols[1], gameSymbols[2])
	}

	return nil
}
