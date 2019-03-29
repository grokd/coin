const SHA256 = require("crypto-js/sha256");

class Block {
    hash: string;
    index: number;
    previousHash: string;
    timestamp = new Date();
    constructor(public data: any){
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp.toString() + JSON.stringify(this.data)).toString()
    }

}

class BlockChain {
    chain: Block[];
    constructor(){
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock(){
        let b = new Block("Genesis");
        b.index = 0;
        b.previousHash = '';
        b.hash = b.calculateHash();
        return b;
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(b: Block){
        b.previousHash = this.getLatestBlock().hash;
        b.index = this.getLatestBlock().index + 1;
        b.hash = b.calculateHash();
        this.chain.push(b);
    }

    mine(difficulty: number){

        console.log(`Initializing Proof of Work mining operation with ${difficulty} difficulty:`);
        console.log('------------------------------------------');
        let targetHash = this.chain[this.chain.length - 1].hash
        let targetSlice = this.chain[this.chain.length - 1].hash.slice(0, difficulty);
        let winner = '';
        for(let i = 0; i < 10000000; i++){
            if( !(i % 100000) ){
                console.log('Mining operation at ' + (i / 1000000) + ' megaflops')
            }

            let guessHash = SHA256( 'salt' + i ).toString();
            let guessSlice = guessHash.slice(0, difficulty);

            if( guessSlice === targetSlice ){
                    winner = guessHash;
                    console.log('After ' + i.toLocaleString() + ' attempts,');
                    console.log('Succesffuly mined a coin with hash: ' + targetHash);
                    console.log('Winning hash: ' + winner);
                    return
                }
            }
        }
        
    verifyChain(){
        let valid = true;
        while(valid){

        }

    }

    getSample(n: number){
        console.log(`Random sample of ${n} consecutive blocks:`);
        console.log('------------------------------------------');
        let draw = Math.ceil( Math.random() * (this.chain.length - n) );
        for(let i = 0; i < n; i++){
            console.log(Coin.chain[draw + i]);
            console.log('------------------------------------------');
        }
    }

}












let Coin = new BlockChain();

for(let i = 0; i < 1000; i++){
    Coin.addBlock( new Block( {amount: Math.ceil( Math.random() * 100 ) } ) );
}

if(process.argv[2] == 'mine'){
    Coin.mine(+process.argv[3]);
}

if(process.argv[2] == 'sample'){
    Coin.getSample(+process.argv[3]);
}