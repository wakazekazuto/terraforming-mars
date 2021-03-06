import {expect} from 'chai';
import {GlobalDustStorm} from '../../src/turmoil/globalEvents/GlobalDustStorm';
import {Player} from '../../src/Player';
import {Color} from '../../src/Color';
import {Resources} from '../../src/Resources';
import {Game} from '../../src/Game';
import {Turmoil} from '../../src/turmoil/Turmoil';
import {StripMine} from '../../src/cards/StripMine';
import {Kelvinists} from '../../src/turmoil/parties/Kelvinists';

describe('GlobalDustStorm', function() {
  it('resolve play', function() {
    const card = new GlobalDustStorm();
    const player = new Player('test', Color.BLUE, false);
    const player2 = new Player('test2', Color.RED, false);
    const game = new Game('foobar', [player, player2], player);
    const turmoil = new Turmoil(game);
    turmoil.initGlobalEvent(game);
    player.playedCards.push(new StripMine());
    player2.playedCards.push(new StripMine());
    player2.playedCards.push(new StripMine());
    turmoil.chairman = player2.id;
    turmoil.dominantParty = new Kelvinists();
    turmoil.dominantParty.partyLeader = player2.id;
    turmoil.dominantParty.delegates.push(player2.id);
    player.megaCredits = 10;
    player2.megaCredits = 10;
    player.heat = 7;
    card.resolve(game, turmoil);
    expect(player.getResource(Resources.MEGACREDITS)).to.eq(8);
    expect(player.getResource(Resources.HEAT)).to.eq(0);
    expect(player2.getResource(Resources.MEGACREDITS)).to.eq(10);
  });
});
