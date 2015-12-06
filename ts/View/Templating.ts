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


    var modelUnitToView = (card: Card) => ({
        suit: 'canasta-' + card.getSuitName().toLowerCase(),
        rank: 'canasta-' + card.getRankName().toLowerCase(),
        fullName: card.getRankName() + ' of ' + card.getSuitName(),
        rightSymbol: card.getRightSymbol(),
        leftSymbol: card.getLeftSymbol()
    });

    export var viewUnitToHTML = (card: ViewCard): string => {

        return `` +
        `<div class="canasta-card ${card.suit} ${card.rank}">

            <div class="canasta-top-bar">
                <span class="canasta-bar-symbol">${card.rightSymbol ? card.rightSymbol : card.leftSymbol}</span>
                <span class="canasta-bar-name">${card.fullName}</span>
            </div>

            <div class="canasta-rank-left">
                <span class="canasta-left-symbol">
                    ${card.leftSymbol}
                </span>
                ${numSymbols(card.leftSymbol)}
            </div>

            <div class="canasta-rank-right">
                <span class="canasta-right-symbol">${card.rightSymbol}</span>
                <div class="canasta-rank-element-first"></div>
                <div class="canasta-rank-element-second"></div>
                <div class="canasta-rank-element-third"></div>
            </div>

            <div class="canasta-bottom-bar">
                <span class="canasta-bar-name">${card.fullName}</span>
                <span class="canasta-bar-symbol">${card.rightSymbol ? card.rightSymbol : card.leftSymbol}</span>
            </div>

            </div>`;
    }

    var numRankElement = (name) =>
        `<div class="canasta-rank-element canasta-rank-element-${name}">
            <span class="one"></span>
            <span class="two"></span>
            <span class="three"></span>
        </div>`;


    var numSymbols = (symbol: string) => {
        var intSymbol = parseInt(symbol);
        if (intSymbol % 1 === 0) {
            return Array.from(new Array(5), (val, index) => `
                ${numRankElement(index + 1)}
            `).join('');
        }
        return '';
    };
}
