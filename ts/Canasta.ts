/// <reference path="Model/Deck"/>
/// <reference path="Model/Player"/>
/// <reference path="View/Templating"/>
"use strict";
module Canasta {
    import Deck = Model.Deck;
    import Player = Model.Player;

    var deck = Deck
        .merge([
            Deck.create52(),
            Deck.create52(),
            Deck.createJokers(4),
            Deck.createJokers(4)
        ])
        .shuffle();

    var playerOne = Player.create();
    var playerTwo = Player.create();
    var playerThree = Player.create();
    var playerFour = Player.create();

    deck.dealCards(playerOne, 14);
    deck.dealCards(playerTwo, 14);
    deck.dealCards(playerThree, 14);
    deck.dealCards(playerFour, 14);

    document.getElementById('player-1').innerHTML = View.modelToHTML(playerOne.getCards());
    document.getElementById('player-2').innerHTML = View.modelToHTML(playerTwo.getCards());
    document.getElementById('player-3').innerHTML = View.modelToHTML(playerThree.getCards());
    document.getElementById('player-4').innerHTML = View.modelToHTML(playerFour.getCards());
}
