/// <reference path="Model/Deck"/>
/// <reference path="View/Templating"/>
"use strict";
module Canasta {
    import Deck = Model.Deck;
    var deck = Deck.merge([
        Deck.create52(),
        // Deck.create52(),
        // Deck.createJokers(2)
    ]);
    document.getElementById('cards').innerHTML = View.modelToHTML(deck.getCards());
}
