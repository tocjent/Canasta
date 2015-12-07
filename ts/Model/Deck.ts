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

        dealCards(player: Player, count: number) {
            var playerCards = this.cards.slice((count + 1) * - 1, -1);
            var remainingCards = this.cards.slice(-this.cards.length, (count * -1));
            player.addCards(playerCards);
            this.cards = remainingCards;
        }

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
