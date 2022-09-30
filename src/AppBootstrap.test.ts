/* eslint-disable import/no-extraneous-dependencies */
import { LitElement } from 'lit';
import { getByRole, findByText } from '@testing-library/dom';
import { customElement, getShadowRoot } from '@test/util';

const TAG_NAME = 'app-bootstrap';

describe(TAG_NAME, () => {
  let appBootstrap: LitElement;
  let rootElement: HTMLElement;
  // let user: UserEvent;

  beforeEach(async () => {
    // user = userEvent.setup();
    appBootstrap = await customElement(TAG_NAME).setup();
    rootElement = getShadowRoot(TAG_NAME).querySelector('main')!;
  });

  afterEach(() => {
    document.body.getElementsByTagName(TAG_NAME)[0].remove();
  });

  test('should show the data are loading', () => {
    const loadingIndicator = getByRole(rootElement, 'progressbar');

    expect(loadingIndicator).toBeVisible();
  });

  test('should show a title', async () => {
    await appBootstrap.updateComplete;

    const expectedTitle = 'Top Stockout Review';
    const actualTitle = await findByText(rootElement, expectedTitle);

    expect(actualTitle).toBeVisible();
  });
});
