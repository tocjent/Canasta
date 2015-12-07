module Model {
    export class Player {
        private cards: Card[];

        static create() {
            return new Player();
        }

        constructor() {
            this.cards = [];
        }

        addCards(cards: Card[]) {
            this.cards = this.cards.concat(cards);
        }

        getCards(): Card[] {
            return this.cards;
        }
    }
}
