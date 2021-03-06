import {expect} from 'chai';
import {BigAsteroid} from '../../src/cards/BigAsteroid';
import {Color} from '../../src/Color';
import {Player} from '../../src/Player';
import {Game} from '../../src/Game';
import {OrOptions} from '../../src/inputs/OrOptions';

describe('BigAsteroid', function() {
  let card : BigAsteroid; let player : Player; let player2 : Player; let game : Game;

  beforeEach(function() {
    card = new BigAsteroid();
    player = new Player('test', Color.BLUE, false);
    player2 = new Player('test2', Color.RED, false);
    game = new Game('foobar', [player, player2], player);
  });

  it('Should play', function() {
    player2.plants = 5;
    card.play(player, game);
    expect(game.deferredActions).has.lengthOf(1);

    const orOptions = game.deferredActions.next()!.execute() as OrOptions;
    orOptions.options[1].cb(); // do nothing
    expect(player2.plants).to.eq(5);

    orOptions.options[0].cb(); // remove plants
    expect(player2.plants).to.eq(1);
    expect(game.getTemperature()).to.eq(-26);
    expect(player.titanium).to.eq(4);
  });

  it('Works fine in solo', function() {
    game = new Game('foobar', [player], player);
    player.plants = 5;
    card.play(player, game);
    expect(game.deferredActions).has.lengthOf(1);
    const input = game.deferredActions.next()!.execute();
    expect(input).is.undefined;

    expect(player.plants).to.eq(5);
    expect(game.getTemperature()).to.eq(-26);
    expect(player.titanium).to.eq(4);
  });
});
