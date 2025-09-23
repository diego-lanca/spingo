export namespace rpcclient {
	
	export class SpinResult {
	    symbols: string[];
	    is_win: boolean;
	    win_amount: number;
	    message: string;
	
	    static createFrom(source: any = {}) {
	        return new SpinResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.symbols = source["symbols"];
	        this.is_win = source["is_win"];
	        this.win_amount = source["win_amount"];
	        this.message = source["message"];
	    }
	}

}

