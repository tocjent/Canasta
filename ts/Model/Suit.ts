"use strict";
module Model {

    export interface Suit {
        name: string,
        group: string
    };

    var create = (name, group): Suit => ({
        name: name,
        group: group
    });

    var suits: Map<string, Suit> = new Map([
        ['DIAMONDS', create('Diamonds', 'RED')],
        ['HEARTS', create('Hearts', 'RED')],
        ['SPADES', create('Spades', 'BLACK')],
        ['CLUBS', create('Clubs', 'BLACK')],
    ]);

    export const Suits: Map<string, Suit> = suits;
    export const JokerSuit: Suit = {
        name: 'JOKER',
        group: 'JOKER'
    };
}
