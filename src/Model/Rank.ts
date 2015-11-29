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
        ['Ace', create('ACE', 'A', '', 'A')],
        ['Two', create('TWO', '2', '2', '')],
        ['Three', create('THREE', '3', '3', '')],
        ['Four', create('FOUR', '4', '4', '')],
        ['Five', create('FIVE', '5', '5', '')],
        ['Six', create('SIX', '6', '6', '')],
        ['Seven', create('SEVEN', '7', '7', '')],
        ['Eight', create('EIGHT', '8', '8', '')],
        ['Nine', create('NINE', '9', '9', '')],
        ['Ten', create('TEN', '10', '10', '')],
        ['Jack', create('JACK', 'J', '', 'J')],
        ['Queen', create('QUEEN', 'Q', '', 'J')],
        ['King', create('KING', 'K', '', 'K')]
    ]);

    export const ColorRanks: ColorRanks = colorRanks;
    export const Joker: Rank = { name: 'JOKER', symbol: '', rightSymbol: '', leftSymbol: '' };

}
