/* eslint-disable import/no-extraneous-dependencies */
// import { LitElement } from 'lit';
// import { customElement, getShadowRoot } from '@test/util';

const TAG_NAME = 'main-view';

describe(TAG_NAME, () => {
  /*
  let mainView: LitElement;
  let rootElement: HTMLElement;
  */

  beforeEach(async () => {
    /*
    mainView = await customElement(TAG_NAME).setup();
    rootElement = getShadowRoot(TAG_NAME).querySelector('main')!;
    */
  });

  afterEach(() => {
    document.body.getElementsByTagName(TAG_NAME)[0].remove();
  });

  test('should show the data are loading', () => {});

  test('should show a header', async () => {});

  test('should show products', async () => {});

  test('should show a modal', async () => {});
});
