/// <reference path="Suit"/>
/// <reference path="Rank"/>
"use strict";
module Model {
    export class Card {

        static create(s: Suit, r: Rank): Card {
            return new Card(s, r);
        }

        static createJoker(): Card {
            return new Card(JokerSuit, JokerRank);
        }

        constructor(
            private suit: Suit,
            private rank: Rank
        ) {}

        public getSuitName() {
            return this.suit.name;
        }

        public getRankName() {
            return this.rank.name;
        }

        public getRankSymbol() {
            return this.rank.symbol;
        }

        public getLeftSymbol() {
            return this.rank.leftSymbol;
        }

        public getRightSymbol() {
            return this.rank.rightSymbol;
        }
    }
}
