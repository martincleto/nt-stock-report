/* eslint-disable import/no-extraneous-dependencies */
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { AppStockReport } from '@apptypes';
import { insertElement, getShadowRoot } from '@test/util';

const TAG_NAME = 'modal-element';

describe(TAG_NAME, () => {
  let modalElement: AppStockReport.Modal;
  // let user;

  beforeEach(async () => {
    await insertElement(`
      <modal-element></modal-element>
    `);

    modalElement = getShadowRoot(TAG_NAME).firstElementChild! as AppStockReport.Modal;
  });

  afterEach(() => {
    document.body.getElementsByTagName(TAG_NAME)[0].remove();
  });

  test('should show the modal', async () => {
    modalElement.isOpen = true;

    waitFor(() => expect(modalElement).toBeVisible());
  });

  test('should hide the modal', async () => {
    const closeButton = getShadowRoot(TAG_NAME).firstElementChild!.querySelector('button')! as HTMLButtonElement;

    const user = userEvent.setup();
    user.click(closeButton);

    waitFor(() => expect(modalElement).not.toBeVisible());
  });
});
