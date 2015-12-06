"use strict";
module Model {

    export interface Rank {
        name: string,
        symbol: string,
        rightSymbol: string,
        leftSymbol: string
    };

    export interface ColorRank extends Rank{ }

    export type Ranks = Map<string, ColorRank>;

    export type ColorRanks = Map<string, ColorRank>;

    var create = (name, symbol, rightSymbol, leftSymbol): ColorRank => ({
        name: name,
        symbol: symbol,
        rightSymbol: rightSymbol,
        leftSymbol: leftSymbol
    });

    var colorRanks: Ranks = new Map([
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

    export const ColorRanks: ColorRanks = colorRanks;
    export const JokerRank: Rank = { name: 'Joker', symbol: '', rightSymbol: '', leftSymbol: '' };

}
