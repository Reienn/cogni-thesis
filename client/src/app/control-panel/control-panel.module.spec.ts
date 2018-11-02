import { ControlPanelModule } from './control-panel.module';

describe('ControlPanelModule', () => {
  let controlPanelModule: ControlPanelModule;

  beforeEach(() => {
    controlPanelModule = new ControlPanelModule();
  });

  it('should create an instance', () => {
    expect(controlPanelModule).toBeTruthy();
  });
});
