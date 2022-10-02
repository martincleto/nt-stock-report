/* eslint-disable import/no-extraneous-dependencies */
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { insertElement, getShadowRoot, getSlotsAssignedNodes } from '@test/util';

const TAG_NAME = 'action-button';

describe(TAG_NAME, () => {
  const mockCallback = jest.fn();
  const mockText = 'Click me!';
  let actionButton: HTMLButtonElement;
  // let user;

  afterEach(() => {
    document.body.getElementsByTagName(TAG_NAME)[0].remove();
  });

  test('should display a text', async () => {
    await insertElement(`<action-button>${mockText}</action-button>`);
    actionButton = getShadowRoot(TAG_NAME).querySelector('button')! as HTMLButtonElement;

    const actualText = getSlotsAssignedNodes(actionButton)[0].textContent;

    expect(actualText).toEqual(mockText);
  });

  test('should dispatch a default `button-click` event', async () => {
    await insertElement(`<action-button>${mockText}</action-button></div>`);

    actionButton = getShadowRoot(TAG_NAME).querySelector('button')!;

    window.addEventListener('stockreport:button-click', () => mockCallback());

    const user = userEvent.setup();
    user.click(actionButton);

    waitFor(() => expect(mockCallback).toHaveBeenCalled());
  });

  test('should dispatch an event with passed action name', async () => {
    const mockActionName = 'my-custom-action';
    await insertElement(`<action-button action=${mockActionName}>${mockText}</action-button></div>`);

    actionButton = getShadowRoot(TAG_NAME).querySelector('button')!;

    window.addEventListener(mockActionName, () => mockCallback());

    // No DRY as I can't guess which the user type is :(
    const user = userEvent.setup();
    user.click(actionButton);

    waitFor(() => expect(mockCallback).toHaveBeenCalled());
  });
});
