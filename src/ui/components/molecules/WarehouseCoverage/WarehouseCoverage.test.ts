// eslint-disable-next-line import/no-extraneous-dependencies
import { findAllByText, findByRole, findByText } from '@testing-library/dom';

import { getShadowRoot, insertElement } from '@test/util';

const TAG_NAME = 'warehouse-coverage';

describe(TAG_NAME, () => {
  const mockCoverage = '34.7';
  const mockLabel = 'Very Low';
  let warehouseCoverage: HTMLElement;

  beforeEach(async () => {
    await insertElement(`<warehouse-coverage coverage="${mockCoverage}" label="${mockLabel}"></warehouse-coverage>`);

    warehouseCoverage = getShadowRoot(TAG_NAME).firstElementChild! as HTMLElement;
  });

  afterEach(() => {
    document.body.getElementsByTagName(TAG_NAME)[0].remove();
  });

  test('should show the warehouse coverage', async () => {
    const coverage = await findAllByText(warehouseCoverage, mockCoverage);

    expect(coverage[0]).toBeVisible();
  });

  test('should show a coverage visual indicator', async () => {
    const coverageIndicator = await findByRole(warehouseCoverage, 'progressbar');

    expect(coverageIndicator).toBeVisible();
  });

  // needs deeper investigation
  test.skip('should show a coverage label', async () => {
    const coverageLabel = await findByText(warehouseCoverage, mockLabel);

    expect(coverageLabel).toBeVisible();
  });
});
