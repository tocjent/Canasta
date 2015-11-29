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
        ['Diamonds', create('DIAMONDS', 'RED')],
        ['Hearts', create('HEARTS', 'RED')],
        ['Clubs', create('CLUBS', 'BLACK')],
        ['Spades', create('SPADES', 'BLACK')],
    ]);


    export const Suits: Map<string, Suit> = suits;
}
