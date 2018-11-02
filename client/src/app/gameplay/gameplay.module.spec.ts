import { GameplayModule } from './gameplay.module';

describe('GameplayModule', () => {
  let gameplayModule: GameplayModule;

  beforeEach(() => {
    gameplayModule = new GameplayModule();
  });

  it('should create an instance', () => {
    expect(gameplayModule).toBeTruthy();
  });
});
