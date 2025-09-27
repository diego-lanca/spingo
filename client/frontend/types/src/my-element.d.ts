import { LitElement } from "lit";
import "./style.css";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class MyElement extends LitElement {
    private balance;
    private betAmount;
    private isSpinning;
    private lastResult;
    private symbols;
    private winStreak;
    private totalWins;
    static styles: import("lit").CSSResult;
    private spinSymbols;
    spinSlot(): Promise<void>;
    private executeSpin;
    private changeBet;
    private setQuickBet;
    private getResultClass;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "my-element": MyElement;
    }
}
