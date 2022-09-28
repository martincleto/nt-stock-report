/* eslint-disable import/no-extraneous-dependencies */
import { LitElement } from 'lit';
import { getByRole } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

const getShadowRoot = (tagName: string): ShadowRoot =>
  document.body.getElementsByTagName(tagName)[0].shadowRoot!;

describe('AppStockReport', () => {
  let appElement: LitElement;
  let rootElement: HTMLElement;
  let user: UserEvent;

  beforeEach(async () => {
    user = userEvent.setup();
    appElement = window.document.createElement(
      'app-stock-report'
    ) as LitElement;
    await document.body.appendChild(appElement);
    rootElement = getShadowRoot('app-stock-report').querySelector('main')!;
  });

  afterEach(() => {
    document.body.getElementsByTagName('app-stock-report')[0].remove();
  });

  test('should render the app shell', () => {
    const expectedTitle = 'Webcomponent app-stock-report';
    const actualTitle =
      getShadowRoot('app-stock-report').querySelector('h1')!.textContent;

    const button = getByRole(rootElement, 'button');

    user.click(button);

    expect(actualTitle).toBe(expectedTitle);
    expect(button).toBeVisible();
  });
});
