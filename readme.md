# 🎰 SpinGO

<div align="center">

![SpinGO Logo](./assets/images/logo-universal.png)

**Um projeto acadêmico para testes de RPC com interface de cassino**

[![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8?style=for-the-badge&logo=go)](https://golang.org/)
[![Wails](https://img.shields.io/badge/Wails-v2-FF6B6B?style=for-the-badge&logo=wails)](https://wails.io/)
[![Lit](https://img.shields.io/badge/Lit-3.0-324FFF?style=for-the-badge&logo=lit)](https://lit.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

## 📋 Sobre o Projeto

SpinGO é um projeto acadêmico desenvolvido para demonstrar e testar comunicação RPC (Remote Procedure Call) através de uma aplicação de cassino interativa. O projeto combina um backend robusto em Go com um frontend moderno utilizando Lit e Wails.

### 🎯 Objetivos Acadêmicos

- **Demonstrar comunicação RPC** entre frontend e backend
- **Implementar padrões de arquitetura** cliente-servidor
- **Testar performance** de chamadas remotas
- **Praticar desenvolvimento full-stack** com tecnologias modernas

## 🏗️ Arquitetura

```
SpinGO/
├── 🖥️ Client (Lit + Wails)
│   ├── Interface moderna de cassino
│   ├── Animações e efeitos visuais
│   └── Comunicação RPC com o backend
├── ⚙️ Server (Go Server)
    ├── Lógica de negócios do cassino
    ├── Sistema de apostas e prêmios
    └── API RPC completa
```

## 🚀 Tecnologias Utilizadas

### Frontend
- **[Lit](https://lit.dev/)** - Web Components modernos
- **[Wails](https://wails.io/)** - Framework para aplicações desktop
- **TypeScript** - Tipagem estática
- **CSS3** - Animações e efeitos visuais

### Backend
- **[Go](https://golang.org/)** - Linguagem de programação
- **RPC Server** - Comunicação remota
- **Algoritmos de cassino** - Lógica de apostas e prêmios

## 📦 Instalação

### Pré-requisitos

- Go 1.21+
- Node.js 18+
- Wails CLI

```bash
# Instalar Wails
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### Clonando o projeto

```bash
git clone https://github.com/seu-usuario/SpinGO.git
cd SpinGO
```

### Instalando dependências

```bash
# Backend (Go modules)
go mod tidy

# Frontend (Node.js)
npm install
```

## 🎮 Como executar

### Modo Desenvolvimento

```bash
# Executar em modo dev com hot reload
cd client
wails dev
```

### Build para Produção

```bash
# Build da aplicação
cd client
wails build

# O executável será gerado em ./build/bin/
```

### Servidor Go Independente

```bash
# Executar apenas o servidor Go
cd server
go run main.go
```

## 🎰 Funcionalidades

### Interface do Cassino
- 🎲 **Roleta interativa** com animações fluidas
- 💰 **Sistema de apostas** com controles intuitivos
- 📊 **Estatísticas em tempo real** (saldo, sequência, ganhos)
- 🎨 **Design responsivo** para diferentes tamanhos de tela
- ✨ **Efeitos visuais** e animações de celebração

### Backend RPC
- 🔄 **Spin API** - Processa apostas e retorna resultados
- 🎯 **Algoritmo de probabilidade** - Sistema justo de ganhos
- 💳 **Gestão de saldo** - Controle de créditos do jogador
- 📝 **Logs detalhados** - Rastreamento de todas as operações
- ⚡ **Performance otimizada** - Respostas rápidas via RPC

## 📊 Estrutura de Dados

### SpinResult
```typescript
interface SpinResult {
    symbols: string[];      // Símbolos da roleta
    is_win: boolean;       // Se foi vitória
    win_amount: number;    // Valor ganho
    message: string;       // Mensagem do resultado
}
```

## 📜 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@diego-lanca](https://github.com/diego-lanca)
- LinkedIn: [Seu Perfil](https://linkedin.com/in/diego-lanca-oliveira)
- Email: diegolanca.o@gmail.com

---

<div align="center">

**⚠️ AVISO IMPORTANTE ⚠️**

*Este projeto é destinado exclusivamente para fins acadêmicos e educacionais. Não deve ser utilizado para jogos de azar reais ou com dinheiro real.*

</div>
