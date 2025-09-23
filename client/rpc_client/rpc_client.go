package rpcclient

import (
	"log"
	"net/rpc"
)

type SlotClient struct {
	client *rpc.Client
}

type SpinArgs struct {
	BetAmount float64 `json:"bet_amount"`
}

type SpinResult struct {
	Symbols   []string `json:"symbols"`
	IsWin     bool     `json:"is_win"`
	WinAmount float64  `json:"win_amount"`
	Message   string   `json:"message"`
}

func NewSlotClient(serverAddr string) *SlotClient {
	c, err := rpc.Dial("tcp", serverAddr)
	if err != nil {
		log.Fatal("Erro ao conectar ao servidor RCP: ", err)
	}
	return &SlotClient{client: c}
}

func (s *SlotClient) Spin(betAmount float64) (*SpinResult, error) {
	args := &SpinArgs{BetAmount: betAmount}
	var result SpinResult

	err := s.client.Call("SlotMachine.Spin", args, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}
