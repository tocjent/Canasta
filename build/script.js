"use strict";
var Model;
(function (Model) {
    ;
    var create = (name, group) => ({
        name: name,
        group: group
    });
    var suits = new Map([
        ['DIAMONDS', create('Diamonds', 'RED')],
        ['HEARTS', create('Hearts', 'RED')],
        ['SPADES', create('Spades', 'BLACK')],
        ['CLUBS', create('Clubs', 'BLACK')],
    ]);
    Model.Suits = suits;
    Model.JokerSuit = {
        name: 'Joker',
        group: 'JOKER'
    };
})(Model || (Model = {}));
"use strict";
var Model;
(function (Model) {
    ;
    var create = (name, symbol, rightSymbol, leftSymbol) => ({
        name: name,
        symbol: symbol,
        rightSymbol: rightSymbol,
        leftSymbol: leftSymbol
    });
    var colorRanks = new Map([
        ['ACE', create('Ace', 'A', '', 'A')],
        ['TWO', create('Two', '2', '2', '')],
        ['THREE', create('Three', '3', '3', '')],
        ['FOUR', create('Four', '4', '4', '')],
        ['FIVE', create('Five', '5', '5', '')],
        ['SIX', create('Six', '6', '6', '')],
        ['SEVEN', create('Seven', '7', '7', '')],
        ['EIGHT', create('Eight', '8', '8', '')],
        ['NINE', create('Nine', '9', '9', '')],
        ['TEN', create('Ten', '10', '10', '')],
        ['JACK', create('Jack', 'J', '', 'J')],
        ['QUEEN', create('Queen', 'Q', '', 'Q')],
        ['KING', create('King', 'K', '', 'K')]
    ]);
    Model.ColorRanks = colorRanks;
    Model.JokerRank = { name: 'Joker', symbol: '', rightSymbol: '', leftSymbol: '' };
})(Model || (Model = {}));
"use strict";
var Model;
(function (Model) {
    class Card {
        constructor(suit, rank) {
            this.suit = suit;
            this.rank = rank;
        }
        static create(s, r) {
            return new Card(s, r);
        }
        static createJoker() {
            return new Card(Model.JokerSuit, Model.JokerRank);
        }
        getSuitName() {
            return this.suit.name;
        }
        getRankName() {
            return this.rank.name;
        }
        getRankSymbol() {
            return this.rank.symbol;
        }
        getLeftSymbol() {
            return this.rank.leftSymbol;
        }
        getRightSymbol() {
            return this.rank.rightSymbol;
        }
    }
    Model.Card = Card;
})(Model || (Model = {}));
"use strict";
var Model;
(function (Model) {
    class Deck {
        constructor(cards) {
            this.cards = cards;
        }
        static create52() {
            var singleDeck = new Deck([]);
            for (let suit of Model.Suits.values()) {
                for (let rank of Model.ColorRanks.values()) {
                    let card = Model.Card.create(suit, rank);
                    singleDeck.addCard(card);
                }
            }
            return singleDeck;
        }
        static createJokers(n) {
            var jokers = new Deck([]);
            for (let i = 0; i < n; ++i) {
                jokers.addCard(Model.Card.createJoker());
            }
            return jokers;
        }
        static merge(decks) {
            var resultDeck = new Deck([]);
            for (var d of decks) {
                resultDeck.addDeck(d);
            }
            return resultDeck;
        }
        shuffle() {
            var array = this.cards.slice();
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            this.cards = array;
            return this;
        }
        dealCards(player, count) {
            var playerCards = this.cards.slice((count + 1) * -1, -1);
            var remainingCards = this.cards.slice(-this.cards.length, (count * -1));
            player.addCards(playerCards);
            this.cards = remainingCards;
        }
        getCards() {
            return this.cards;
        }
        addCard(c) {
            this.cards.push(c);
            return this;
        }
        addDeck(d) {
            for (var card of d.cards) {
                this.addCard(card);
            }
            return this;
        }
    }
    Model.Deck = Deck;
})(Model || (Model = {}));
var Model;
(function (Model) {
    class Player {
        constructor() {
            this.cards = [];
        }
        static create() {
            return new Player();
        }
        addCards(cards) {
            this.cards = this.cards.concat(cards);
        }
        getCards() {
            return this.cards;
        }
    }
    Model.Player = Player;
})(Model || (Model = {}));
var View;
(function (View) {
    ;
    View.modelToHTML = (cards) => viewToHTML(modelToView(cards));
    var modelToView = (cards) => cards.map(modelUnitToView);
    var viewToHTML = (cards) => cards.map(View.viewUnitToHTML).join('');
    var modelUnitToView = (card, index) => {
        var suit = 'canasta-' + card.getSuitName().toLowerCase();
        if (suit == 'canasta-joker' && index % 2 == 0) {
            suit = 'canasta-joker-black';
        }
        if (suit == 'canasta-joker' && index % 2 == 1) {
            suit = 'canasta-joker-red';
        }
        return ({
            suit: suit,
            rank: card.getRankName() != 'joker' ? 'canasta-' + card.getRankName().toLowerCase() : '',
            fullName: card.getRankName() == 'Joker' ? '' : card.getRankName() + ' of ' + card.getSuitName(),
            rightSymbol: card.getRightSymbol(),
            leftSymbol: card.getLeftSymbol()
        });
    };
    View.viewUnitToHTML = (card) => {
        return `
        <div class="canasta-card ${card.suit} ${card.rank}">

            <div class="canasta-top-bar">
                <div class="canasta-bar-symbol">
                    ${card.rightSymbol ? card.rightSymbol : card.leftSymbol}
                    <div class="canasta-bar-suit">
                        <div class="canasta-rank-element-1"></div>
                        <div class="canasta-rank-element-2"></div>
                        <div class="canasta-rank-element-3"></div>
                    </div>
                </div>
                <div class="canasta-bar-name">${card.fullName}</div>
            </div>
            <div class="canasta-card-background"></div>
            <div class="canasta-rank-left">
                <div class="canasta-left-symbol">
                    ${card.leftSymbol}
                </div>
                ${numSymbols(card.rightSymbol)}
                <div class="canasta-joker-element-1"></div>
                <div class="canasta-joker-element-2"></div>
            </div>

            <div class="canasta-rank-right">
                <div class="canasta-right-symbol">${card.rightSymbol}</div>
                ${rightSymbol(card)}
                <div class="canasta-joker-element-3"></div>
                <div class="canasta-joker-element-4"></div>
            </div>

            <div class="canasta-bottom-bar">
                <div class="canasta-bar-name">${card.fullName}</div>
                <div class="canasta-bar-symbol">
                    ${card.rightSymbol ? card.rightSymbol : card.leftSymbol}
                    <div class="canasta-bar-suit">
                        <div class="canasta-rank-element-1"></div>
                        <div class="canasta-rank-element-2"></div>
                        <div class="canasta-rank-element-3"></div>
                    </div>
                </div>
            </div>

            </div>`;
    };
    var rightSymbol = (card) => {
        if (card.leftSymbol) {
            return `<div class="canasta-face-symbol ${card.suit}-face-symbol">
                <div class="canasta-rank-element-1"></div>
                <div class="canasta-rank-element-2"></div>
                <div class="canasta-rank-element-3"></div>
            </div>`;
        }
        return '';
    };
    var numRankElement = (name) => `<div class="canasta-number-element canasta-number-element-${name}">
            <div class="canasta-rank-element-1"></div>
            <div class="canasta-rank-element-2"></div>
            <div class="canasta-rank-element-3"></div>
        </div>`;
    var numSymbols = (symbol) => {
        var intSymbol = parseInt(symbol);
        if (intSymbol % 1 === 0) {
            return Array
                .from(new Array(intSymbol), (val, index) => `${numRankElement(index + 1)}`)
                .join('');
        }
        return '';
    };
})(View || (View = {}));
"use strict";
var Canasta;
(function (Canasta) {
    var Deck = Model.Deck;
    var Player = Model.Player;
    var deck = Deck
        .merge([
        Deck.create52(),
        Deck.create52(),
        Deck.createJokers(4),
        Deck.createJokers(4)
    ])
        .shuffle();
    var playerOne = Player.create();
    var playerTwo = Player.create();
    var playerThree = Player.create();
    var playerFour = Player.create();
    deck.dealCards(playerOne, 14);
    deck.dealCards(playerTwo, 14);
    deck.dealCards(playerThree, 14);
    deck.dealCards(playerFour, 14);
    document.getElementById('player-1').innerHTML = View.modelToHTML(playerOne.getCards());
    document.getElementById('player-2').innerHTML = View.modelToHTML(playerTwo.getCards());
    document.getElementById('player-3').innerHTML = View.modelToHTML(playerThree.getCards());
    document.getElementById('player-4').innerHTML = View.modelToHTML(playerFour.getCards());
})(Canasta || (Canasta = {}));
