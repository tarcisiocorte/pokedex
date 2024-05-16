import { GoToLeftComponent } from './go-left.component';

describe('GoRightComponent', () => {
  let component: GoToLeftComponent;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      navigate: jest.fn(),
    };
    component = new GoToLeftComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
