import {expect} from 'chai';
import {DevelopmentCenter} from '../../src/cards/DevelopmentCenter';
import {Color} from '../../src/Color';
import {Player} from '../../src/Player';
import {Game} from '../../src/Game';

describe('DevelopmentCenter', function() {
  let card : DevelopmentCenter; let player : Player; let game : Game;

  beforeEach(function() {
    card = new DevelopmentCenter();
    player = new Player('test', Color.BLUE, false);
    game = new Game('foobar', [player, player], player);
  });

  it('Can\'t act', function() {
    expect(card.canAct(player)).is.not.true;
  });

  it('Should act', function() {
    player.energy = 1;
    expect(card.canAct(player)).is.true;

    card.action(player, game);
    expect(player.energy).to.eq(0);
    expect(player.cardsInHand).has.lengthOf(1);
  });
});

