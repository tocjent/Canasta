"use strict";
module Canasta {
    import Deck = Model.Deck;
    var deck = Deck.merge([
        Deck.create52(),
        // Deck.create52(),
        Deck.createJokers(2)
    ]);

    var viewModel = {
        cards: []
    }

    for(var card of deck.getCards()){
        var suitCss = 'joker';
        if (card.getSuitName()) {
            suitCss = 'canasta-' + card.getSuitName().toLowerCase();
        }

        var rankCss = '';
        rankCss +=  'canasta-' + card.getRankName().toLowerCase();


        var rankName = card.getRankName().toLowerCase();
        rankName = rankName.slice(0, 1).toUpperCase() + rankName.slice(1);

        var suitName = card.getSuitName().toLowerCase();
        suitName = suitName.slice(0, 1).toUpperCase() + suitName.slice(1);

        var fullName = rankName + ' of ' + suitName;

        viewModel.cards.push({
            suitCss: suitCss,
            rankCss: rankCss,
            fullName: fullName,
            rankSymbol: card.getRankSymbol(),
            rightSymbol: card.getRightSymbol(),
            leftSymbol: card.getLeftSymbol()
        });
    }

    var template = '';

    template += '<div class="canasta-card suitClass rankClass">';

    template += '<div class="canasta-top-bar">';
    template += '<span class="canasta-bar-symbol">rankSymbol</span>';
    template += '<span class="canasta-bar-name">fullName</span>';
    template += '</div>';

    template += '<div class="canasta-rank-left">';
    template += '<div class="canasta-left-symbol">leftSymbol</div>';
    template += '<div class="canasta-rank-element-one"><span class="one"></span><span class="two"></span><span class="three"></span></div>';
    template += '<div class="canasta-rank-element-two"><span class="one"></span><span class="two"></span><span class="three"></span></div>';
    template += '<div class="canasta-rank-element-three"><span class="one"></span><span class="two"></span><span class="three"></span></div>';
    template += '<div class="canasta-rank-element-four"><span class="one"></span><span class="two"></span><span class="three"></span></div>';
    template += '<div class="canasta-rank-element-five"><span class="one"></span><span class="two"></span><span class="three"></span></div>';
    template += '<div class="canasta-rank-element-six"><span class="one"></span><span class="two"></span><span class="three"></span></div>';
    template += '<div class="canasta-rank-element-seven"><span class="one"></span><span class="two"></span><span class="three"></span></div>';
    template += '<div class="canasta-rank-element-eight"><span class="one"></span><span class="two"></span><span class="three"></span></div>';
    template += '<div class="canasta-rank-element-nine"><span class="one"></span><span class="two"></span><span class="three"></span></div>';
    template += '<div class="canasta-rank-element-ten"><span class="one"></span><span class="two"></span><span class="three"></span></div>';
    template += '</div>';

    template += '<div class="canasta-rank-right">';
    template += '<div class="canasta-right-symbol">rightSymbol</div>';
    template += '<div class="canasta-rank-element-first"></div>';
    template += '<div class="canasta-rank-element-second"></div>';
    template += '<div class="canasta-rank-element-third"></div>';
    template += '</div>';

    template += '<div class="canasta-bottom-bar">';
    template += '<span class="canasta-bar-name">fullName</span>';
    template += '<span class="canasta-bar-symbol">rankSymbol</span>';
    template += '</div>';

    template += '</div>';

    var html = '';

    for(var viewCard of viewModel.cards) {
        var cardHtml = template;
        cardHtml = cardHtml.replace(/suitClass/g, viewCard.suitCss);
        cardHtml = cardHtml.replace(/rankClass/g, viewCard.rankCss);
        cardHtml = cardHtml.replace(/rankSymbol/g, viewCard.rankSymbol);
        cardHtml = cardHtml.replace(/fullName/g, viewCard.fullName);
        cardHtml = cardHtml.replace(/rightSymbol/g, viewCard.rightSymbol);
        cardHtml = cardHtml.replace(/leftSymbol/g, viewCard.leftSymbol);
        html += cardHtml;
    }

    var displayContainer = document.getElementById('cards');

    displayContainer.innerHTML = html;
}
