var SHA256 = require("crypto-js/sha256");
var Block = /** @class */ (function () {
    function Block(data) {
        this.data = data;
        this.timestamp = new Date();
        this.hash = this.calculateHash();
    }
    Block.prototype.calculateHash = function () {
        return SHA256(this.index + this.previousHash + this.timestamp.toString() + JSON.stringify(this.data)).toString();
    };
    return Block;
}());
var BlockChain = /** @class */ (function () {
    function BlockChain() {
        this.chain = [this.createGenesisBlock()];
    }
    BlockChain.prototype.createGenesisBlock = function () {
        var b = new Block("Genesis");
        b.index = 0;
        b.previousHash = '';
        b.hash = b.calculateHash();
        return b;
    };
    BlockChain.prototype.getLatestBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    BlockChain.prototype.addBlock = function (b) {
        b.previousHash = this.getLatestBlock().hash;
        b.index = this.getLatestBlock().index + 1;
        b.hash = b.calculateHash();
        this.chain.push(b);
    };
    BlockChain.prototype.mine = function (difficulty) {
        console.log("Initializing Proof of Work mining operation with " + difficulty + " difficulty:");
        console.log('------------------------------------------');
        var targetHash = this.chain[this.chain.length - 1].hash;
        var targetSlice = this.chain[this.chain.length - 1].hash.slice(0, difficulty);
        var winner = '';
        for (var i = 0; i < 10000000; i++) {
            if (!(i % 100000)) {
                console.log('Mining operation at ' + (i / 1000000) + ' megaflops');
            }
            var guessHash = SHA256('salt' + i).toString();
            var guessSlice = guessHash.slice(0, difficulty);
            if (guessSlice === targetSlice) {
                winner = guessHash;
                console.log('After ' + i.toLocaleString() + ' attempts,');
                console.log('Succesffuly mined a coin with hash: ' + targetHash);
                console.log('Winning hash: ' + winner);
                return;
            }
        }
    };
    BlockChain.prototype.verifyChain = function () {
        var valid = true;
        while (valid) {
        }
    };
    BlockChain.prototype.getSample = function (n) {
        console.log("Random sample of " + n + " consecutive blocks:");
        console.log('------------------------------------------');
        var draw = Math.ceil(Math.random() * (this.chain.length - n));
        for (var i = 0; i < n; i++) {
            console.log(Coin.chain[draw + i]);
            console.log('------------------------------------------');
        }
    };
    return BlockChain;
}());
var Coin = new BlockChain();
for (var i = 0; i < 1000; i++) {
    Coin.addBlock(new Block({ amount: Math.ceil(Math.random() * 100) }));
}
if (process.argv[2] == 'mine') {
    Coin.mine(+process.argv[3]);
}
if (process.argv[2] == 'sample') {
    Coin.getSample(+process.argv[3]);
}
