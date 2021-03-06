import {expect} from 'chai';
import {Inventrix} from '../../../src/cards/corporation/Inventrix';
import {Color} from '../../../src/Color';
import {Player} from '../../../src/Player';
import {Game} from '../../../src/Game';

describe('Inventrix', function() {
  let card : Inventrix; let player : Player; let game : Game;

  beforeEach(function() {
    card = new Inventrix();
    player = new Player('test', Color.BLUE, false);
    game = new Game('foobar', [player, player], player);
  });

  it('Should play', function() {
    card.play();
    expect(card.getRequirementBonus(player, game)).to.eq(2);
  });

  it('Should take initial action', function() {
    const action = card.initialAction(player, game);
    expect(action).is.undefined;
    expect(player.cardsInHand).has.lengthOf(3);
  });
});
