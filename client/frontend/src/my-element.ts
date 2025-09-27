import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Spin } from '../wailsjs/go/rpcclient/SlotClient';
import "./style.css";
import { rpcclient } from "../wailsjs/go/models";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("my-element")
export class MyElement extends LitElement {
  @state() private balance = 10000;
  @state() private betAmount = 10;
  @state() private isSpinning = false;
  @state() private lastResult: rpcclient.SpinResult | null = null;
  @state() private symbols: string[] = ['🍒', '🍒', '🍒'];
  @state() private winStreak = 0;
  @state() private totalWins = 0;

  static styles = css`
    :host {
      display: block;
      font-family: 'Arial', sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    .header {
      margin-bottom: 30px;
    }

    .logo {
      max-width: 200px;
      margin-bottom: 20px;
    }

    .title {
      font-size: 2.5em;
      margin: 0;
      color: #ffd700;
      text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
      font-weight: bold;
    }

    .balance-section {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 20px;
      margin-bottom: 30px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .balance {
      font-size: 1.8em;
      color: #4ecdc4;
      margin-bottom: 10px;
    }

    .stats {
      display: flex;
      justify-content: space-around;
      font-size: 1.1em;
      color: #ffd700;
    }

    .slot-machine {
      background: linear-gradient(145deg, #2c3e50, #34495e);
      border-radius: 20px;
      padding: 40px;
      margin-bottom: 30px;
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      border: 2px solid #ffd700;
    }

    .reels {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 30px;
    }

    .reel {
      width: 120px;
      height: 120px;
      background: #1a1a1a;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4em;
      border: 3px solid #ffd700;
      box-shadow: 
        inset 0 0 20px rgba(0, 0, 0, 0.5),
        0 0 20px rgba(255, 215, 0, 0.3);
      transition: all 0.3s ease;
    }

    .reel.spinning {
      animation: spin 0.1s linear infinite;
      border-color: #ff4757;
      box-shadow: 
        inset 0 0 20px rgba(0, 0, 0, 0.5),
        0 0 30px rgba(255, 71, 87, 0.6);
    }

    @keyframes spin {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
    }

    .controls {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 25px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .bet-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      margin-bottom: 25px;
    }

    .bet-label {
      font-size: 1.2em;
      font-weight: bold;
      color: #ffd700;
    }

    .bet-button {
      background: linear-gradient(145deg, #e74c3c, #c0392b);
      border: none;
      border-radius: 8px;
      color: white;
      padding: 10px 15px;
      font-size: 1.1em;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: bold;
    }

    .bet-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
    }

    .bet-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .bet-amount {
      font-size: 1.5em;
      font-weight: bold;
      color: #4ecdc4;
      margin: 0 15px;
      min-width: 80px;
    }

    .spin-button {
      background: linear-gradient(145deg, #27ae60, #2ecc71);
      border: none;
      border-radius: 50%;
      width: 120px;
      height: 120px;
      color: white;
      font-size: 1.8em;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 10px 25px rgba(46, 204, 113, 0.3);
      text-transform: uppercase;
    }

    .spin-button:hover:not(:disabled) {
      transform: scale(1.05);
      box-shadow: 0 15px 30px rgba(46, 204, 113, 0.5);
    }

    .spin-button:disabled {
      background: linear-gradient(145deg, #7f8c8d, #95a5a6);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .spin-button.spinning {
      animation: pulse 0.5s ease-in-out infinite alternate;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      100% { transform: scale(1.05); }
    }

    .result-display {
      margin-top: 30px;
      padding: 20px;
      border-radius: 15px;
      min-height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: all 0.5s ease;
    }

    .result-win {
      background: linear-gradient(145deg, rgba(46, 204, 113, 0.2), rgba(39, 174, 96, 0.2));
      border: 2px solid #27ae60;
      color: #2ecc71;
      animation: celebrate 1s ease-in-out;
    }

    .result-lose {
      background: linear-gradient(145deg, rgba(231, 76, 60, 0.2), rgba(192, 57, 43, 0.2));
      border: 2px solid #e74c3c;
      color: #e74c3c;
    }

    .result-neutral {
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.2);
      color: #bdc3c7;
    }

    @keyframes celebrate {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .result-message {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .result-amount {
      font-size: 2em;
      font-weight: bold;
    }

    .quick-bets {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    .quick-bet {
      background: linear-gradient(145deg, #3498db, #2980b9);
      border: none;
      border-radius: 8px;
      color: white;
      padding: 8px 16px;
      font-size: 1em;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: bold;
    }

    .quick-bet:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
    }

    .quick-bet:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .jackpot-indicator {
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(145deg, #f39c12, #e67e22);
      padding: 15px;
      border-radius: 10px;
      font-weight: bold;
      animation: glow 2s ease-in-out infinite alternate;
    }

    @keyframes glow {
      0% { box-shadow: 0 0 10px rgba(243, 156, 18, 0.5); }
      100% { box-shadow: 0 0 20px rgba(243, 156, 18, 0.8); }
    }

    @media (max-width: 768px) {
      .container {
        padding: 10px;
      }
      
      .reels {
        gap: 10px;
      }
      
      .reel {
        width: 80px;
        height: 80px;
        font-size: 2.5em;
      }
      
      .spin-button {
        width: 100px;
        height: 100px;
        font-size: 1.4em;
      }
      
      .stats {
        flex-direction: column;
        gap: 10px;
      }
    }
  `;

  private spinSymbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '🎰', '🔔'];

  async spinSlot() {
    if (this.isSpinning || this.balance < this.betAmount) return;

    this.isSpinning = true;
    this.lastResult = null;
    
    // Animar os símbolos girando
    const spinDuration = 2000; // 2 segundos
    const intervalTime = 100;
    const intervals = spinDuration / intervalTime;
    
    let currentInterval = 0;
    const spinInterval = setInterval(() => {
      this.symbols = [
        this.spinSymbols[Math.floor(Math.random() * this.spinSymbols.length)],
        this.spinSymbols[Math.floor(Math.random() * this.spinSymbols.length)],
        this.spinSymbols[Math.floor(Math.random() * this.spinSymbols.length)]
      ];
      
      currentInterval++;
      if (currentInterval >= intervals) {
        clearInterval(spinInterval);
        this.executeSpin();
      }
    }, intervalTime);
  }

  private async executeSpin() {
    try {
      const result = await Spin(this.betAmount);
      
      this.lastResult = result;
      this.symbols = result.symbols;
      this.balance -= this.betAmount;
      
      if (result.is_win) {
        this.balance += result.win_amount;
        this.winStreak += 1;
        this.totalWins += result.win_amount;
      } else {
        this.winStreak = 0;
      }
      
    } catch (err) {
      console.error("Erro ao girar:", err);
      this.lastResult = {
        symbols: ['❌', '❌', '❌'],
        is_win: false,
        win_amount: 0,
        message: 'Erro na conexão!'
      } as rpcclient.SpinResult;
    } finally {
      this.isSpinning = false;
    }
  }

  private changeBet(amount: number) {
    const newAmount = this.betAmount + amount;
    if (newAmount >= 1 && newAmount <= this.balance) {
      this.betAmount = newAmount;
    }
  }

  private setQuickBet(amount: number) {
    if (amount <= this.balance) {
      this.betAmount = amount;
    }
  }

  private getResultClass(): string {
    if (!this.lastResult) return 'result-neutral';
    return this.lastResult.is_win ? 'result-win' : 'result-lose';
  }

  render() {
    return html`
      <div class="container">
        <div class="jackpot-indicator">
          🎰 JACKPOT: $50,000
        </div>

        <div class="header">
          <h1 class="title">🎰 SpinGO 🎰</h1>
        </div>

        <div class="balance-section">
          <div class="balance">💰 Saldo: $${this.balance}</div>
          <div class="stats">
            <div>🔥 Sequência: ${this.winStreak}</div>
            <div>💎 Total Ganho: $${this.totalWins}</div>
            <div>🎯 Aposta: $${this.betAmount}</div>
          </div>
        </div>

        <div class="slot-machine">
          <div class="reels">
            ${this.symbols.map(symbol => html`
              <div class="reel ${this.isSpinning ? 'spinning' : ''}">${symbol}</div>
            `)}
          </div>

          <div class="controls">
            <div class="quick-bets">
              <button 
                class="quick-bet" 
                @click=${() => this.setQuickBet(5)}
                ?disabled=${this.isSpinning || this.balance < 5}
              >$5</button>
              <button 
                class="quick-bet" 
                @click=${() => this.setQuickBet(10)}
                ?disabled=${this.isSpinning || this.balance < 10}
              >$10</button>
              <button 
                class="quick-bet" 
                @click=${() => this.setQuickBet(25)}
                ?disabled=${this.isSpinning || this.balance < 25}
              >$25</button>
              <button 
                class="quick-bet" 
                @click=${() => this.setQuickBet(50)}
                ?disabled=${this.isSpinning || this.balance < 50}
              >$50</button>
            </div>

            <div class="bet-controls">
              <button 
                class="bet-button" 
                @click=${() => this.changeBet(-5)}
                ?disabled=${this.isSpinning || this.betAmount <= 1}
              >-$5</button>
              <button 
                class="bet-button" 
                @click=${() => this.changeBet(-1)}
                ?disabled=${this.isSpinning || this.betAmount <= 1}
              >-$1</button>
              
              <span class="bet-label">Aposta:</span>
              <div class="bet-amount">$${this.betAmount}</div>
              
              <button 
                class="bet-button" 
                @click=${() => this.changeBet(1)}
                ?disabled=${this.isSpinning || this.betAmount >= this.balance}
              >+$1</button>
              <button 
                class="bet-button" 
                @click=${() => this.changeBet(5)}
                ?disabled=${this.isSpinning || (this.betAmount + 5) > this.balance}
              >+$5</button>
            </div>

            <button 
              class="spin-button ${this.isSpinning ? 'spinning' : ''}"
              @click=${this.spinSlot}
              ?disabled=${this.isSpinning || this.balance < this.betAmount}
            >
              ${this.isSpinning ? '⏳' : '🎲'}
              <br>
              ${this.isSpinning ? '' : 'Girar!'}
            </button>
          </div>
        </div>

        ${this.lastResult ? html`
          <div class="result-display ${this.getResultClass()}">
            <div class="result-message">
              ${this.lastResult.is_win ? '🎉 PARABÉNS! VOCÊ GANHOU! 🎉' : '😔 Não foi dessa vez...'}
            </div>
            <div class="result-amount">
              ${this.lastResult.is_win ? `+$${this.lastResult.win_amount}` : `-$${this.betAmount}`}
            </div>
            <div>${this.lastResult.message}</div>
          </div>
        ` : html`
          <div class="result-display result-neutral">
            <div class="result-message">🎯 Pronto para jogar!</div>
            <div>Escolha sua aposta e gire a roleta da sorte!</div>
          </div>
        `}
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
