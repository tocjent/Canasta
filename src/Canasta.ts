"use strict";
module Canasta {
    import Deck = Model.Deck;
    var deck = Deck.merge([
        Deck.create52(),
        Deck.create52(),
        Deck.createJokers(4)
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

        viewModel.cards.push({
            suitCss: suitCss,
            rankCss: rankCss
        });
    }

    console.log(viewModel);

    var template = '';

    template += '<div class="canasta-card {{card.suitCss}}-bar"> ';
    template += '<div class="{{card.suitCss}}-symbol">';
    template += '<div class="{{card.rankCss}}">';
    template += '</div>';
    template += '</div>';
    template += '</div>';

    var html = '';

    for(var viewCard of viewModel.cards) {
        var cardHtml = template;

        console.log(viewCard.suitCss);

        cardHtml = cardHtml.replace('{{card.suitCss}}', viewCard.suitCss);
        cardHtml = cardHtml.replace('{{card.suitCss}}', viewCard.suitCss);
        cardHtml = cardHtml.replace('{{card.rankCss}}', viewCard.rankCss);

        html += cardHtml;
    }

    var displayContainer = document.getElementById('cards');

    displayContainer.innerHTML = html;
}
