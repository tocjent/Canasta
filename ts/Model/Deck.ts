/// <reference path="Card"/>
"use strict";
module Model {
    export class Deck {

        static create52() {
            var singleDeck = new Deck([]);

            for(let suit of Suits.values()) {
                for(let rank of ColorRanks.values()) {
                    let card = Card.create(suit, rank);
                    singleDeck.addCard(card);
                }
            }

            return singleDeck;
        }

        static createJokers(n: number) {
            var jokers = new Deck([]);

            for(let i = 0; i < n; ++i) {
                jokers.addCard(Card.createJoker());
            }

            return jokers;
        }

        static merge(decks: Deck[]) {
            var resultDeck = new Deck([]);
            for(var d of decks) {
                resultDeck.addDeck(d);
            }
            return resultDeck;
        }

        constructor(
            private cards: Array<Card>
        ) {}

        getCards() : Card[] {
            return this.cards;
        }

        addCard(c: Card) {
            this.cards.push(c);
            return this;
        }

        addDeck(d: Deck) {
            for(var card of d.cards) {
                this.addCard(card);
            }
            return this;
        }
    }
}
