/// <reference path="../Model/Card"/>
module View {
    import Card = Model.Card;

    export interface ViewCard {
        suit: string;
        rank: string;
        fullName: string;
        rightSymbol: string;
        leftSymbol: string;
    };

    export var modelToHTML = (cards: Card[]) : string => viewToHTML(modelToView(cards));

    var modelToView = (cards: Card[]): ViewCard[] => cards.map(modelUnitToView);

    var viewToHTML = (cards: ViewCard[]): string => cards.map(viewUnitToHTML).join('');


    var modelUnitToView = (card: Card, index) => {
        var suit = 'canasta-' + card.getSuitName().toLowerCase();
        if(suit == 'canasta-joker' && index % 2 == 0) {
            suit = 'canasta-joker-black';
        }
        if(suit == 'canasta-joker' && index % 2 == 1) {
            suit = 'canasta-joker-red';
        }
        return ({
            suit: suit,
            rank: card.getRankName() != 'joker' ?  'canasta-' + card.getRankName().toLowerCase() : '',
            fullName: card.getRankName() == 'Joker' ? '' : card.getRankName() + ' of ' + card.getSuitName(),
            rightSymbol: card.getRightSymbol(),
            leftSymbol: card.getLeftSymbol()
        });
    };

    export var viewUnitToHTML = (card: ViewCard): string => {
        return `
        <div class="canasta-card ${card.suit} ${card.rank}">

            <div class="canasta-top-bar">
                <div class="canasta-bar-symbol">
                    ${card.rightSymbol ? card.rightSymbol : card.leftSymbol}
                    <div class="canasta-bar-suit">
                        <div class="canasta-rank-element-1"></div>
                        <div class="canasta-rank-element-2"></div>
                        <div class="canasta-rank-element-3"></div>
                    </div>
                </div>
                <div class="canasta-bar-name">${card.fullName}</div>
            </div>
            <div class="canasta-card-background"></div>
            <div class="canasta-rank-left">
                <div class="canasta-left-symbol">
                    ${card.leftSymbol}
                </div>
                ${numSymbols(card.rightSymbol)}
                <div class="canasta-joker-element-1"></div>
                <div class="canasta-joker-element-2"></div>
            </div>

            <div class="canasta-rank-right">
                <div class="canasta-right-symbol">${card.rightSymbol}</div>
                ${rightSymbol(card)}
                <div class="canasta-joker-element-3"></div>
                <div class="canasta-joker-element-4"></div>
            </div>

            <div class="canasta-bottom-bar">
                <div class="canasta-bar-name">${card.fullName}</div>
                <div class="canasta-bar-symbol">
                    ${card.rightSymbol ? card.rightSymbol : card.leftSymbol}
                    <div class="canasta-bar-suit">
                        <div class="canasta-rank-element-1"></div>
                        <div class="canasta-rank-element-2"></div>
                        <div class="canasta-rank-element-3"></div>
                    </div>
                </div>
            </div>

            </div>`;
    }

    var rightSymbol = (card: ViewCard) => {
        if(card.leftSymbol) {
            return `<div class="canasta-face-symbol ${card.suit}-face-symbol">
                <div class="canasta-rank-element-1"></div>
                <div class="canasta-rank-element-2"></div>
                <div class="canasta-rank-element-3"></div>
            </div>`;
        }
        return '';
    };

    var numRankElement = (name) =>
        `<div class="canasta-number-element canasta-number-element-${name}">
            <div class="canasta-rank-element-1"></div>
            <div class="canasta-rank-element-2"></div>
            <div class="canasta-rank-element-3"></div>
        </div>`;


    var numSymbols = (symbol: string) => {
        var intSymbol = parseInt(symbol);
        if (intSymbol % 1 === 0) {
            return Array
                .from(new Array(intSymbol), (val, index) => `${numRankElement(index + 1)}`)
                .join('');
        }
        return '';
    };
}
