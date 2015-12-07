/// <reference path="Model/Deck"/>
/// <reference path="View/Templating"/>
"use strict";
module Canasta {
    import Deck = Model.Deck;

    var deck = Deck.merge([
        Deck.create52(),
        Deck.create52(),
        Deck.createJokers(4),
        Deck.createJokers(4)
    ]);

    document.getElementById('cards').innerHTML = View.modelToHTML(deck.getCards());
}
