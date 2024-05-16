import { GoToRightComponent } from './go-right.component';

describe('GoRightComponent', () => {
  let component: GoToRightComponent;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      navigate: jest.fn(),
    };
    component = new GoToRightComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
