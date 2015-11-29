"use strict";
module Model {
    export class Card {

        static create(s: Suit, r: Rank): Card {
            return new Card(s, r);
        }

        static createJoker(): Card {
            return new Card(undefined, Joker);
        }

        public constructor(
            private suit: Suit,
            private rank: Rank
        ) {}

        public getSuitName() {
            if(this.suit) {
                return this.suit.name;
            }
            return '';
        }

        public getRankName() {
            return this.rank.name;
        }
    }
}
