export declare namespace rpcclient {
    class SpinResult {
        symbols: string[];
        is_win: boolean;
        win_amount: number;
        message: string;
        static createFrom(source?: any): SpinResult;
        constructor(source?: any);
    }
}
