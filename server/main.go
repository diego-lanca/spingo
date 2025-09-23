package main

import (
	"fmt"
	"log"
	"math/rand"
	"net"
	"net/rpc"
	"server/game"
	"time"
)

func main() {
	// Inicializa o gerador aleatório
	rand.NewSource(time.Now().UnixNano())
	// Registra o serviço
	slot := game.NewSlotMachine()
	rpc.Register(slot)

	listener, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatal("Erro: ", err)
	}
	defer listener.Close()

	fmt.Println("🎰 Servidor iniciado na porta 8080!")
	fmt.Println("Aguardando conexões...")

	// Aceita conexões
	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Printf("Erro ao aceitar conexão: %v", err)
			continue
		}

		go func() {
			defer conn.Close()
			log.Printf("🔌 Nova conexão estabelecida: %s", conn.RemoteAddr())
			rpc.ServeConn(conn)
			log.Printf("🔌 Conexão encerrada: %s", conn.RemoteAddr())
		}()
	}
}
