"use strict";
module Model {

    export interface Rank {
        name: string
    };

    export interface ColorRank extends Rank{ }

    export type Ranks = Map<string, ColorRank>;

    export type ColorRanks = Map<string, ColorRank>;

    var create = (name): ColorRank => ({
        name: name
    });

    var colorRanks: Ranks = new Map([
        ['Ace', create('ACE')],
        ['Two', create('TWO')],
        ['Three', create('THREE')],
        ['Four', create('FOUR')],
        ['Five', create('FIVE')],
        ['Six', create('SIX')],
        ['Seven', create('SEVEN')],
        ['Eight', create('EIGHT')],
        ['Nine', create('NINE')],
        ['Ten', create('TEN')],
        ['Jack', create('JACK')],
        ['Queen', create('QUEEN')],
        ['King', create('KING')]
    ]);

    export const ColorRanks: ColorRanks = colorRanks;
    export const Joker: Rank = { name: 'JOKER' };

}
