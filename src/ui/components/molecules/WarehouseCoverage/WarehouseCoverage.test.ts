// eslint-disable-next-line import/no-extraneous-dependencies
import { getByRole, getByText } from '@testing-library/dom';

import { insertElement } from '@test/util';

const TAG_NAME = 'warehouse-coverage';

describe(TAG_NAME, () => {
  const mockCoverage = '34.7';
  const mockLabel = 'Very Low';
  const rootElement = document.body;

  beforeEach(() => {
    insertElement(`<warehouse-coverage coverage="${mockCoverage}"></warehouse-coverage>`);
  });

  afterEach(() => {
    document.body.getElementsByTagName(TAG_NAME)[0].remove();
  });

  test('should show the warehouse coverage', () => {
    const coverage = getByText(rootElement, mockCoverage);

    expect(coverage).toBeVisible();
  });

  test('should show a coverage visual indicator', () => {
    const coverageIndicator = getByRole(rootElement, 'progressbar');

    expect(coverageIndicator).toBeVisible();
  });

  test('should show a coverage label', () => {
    const coverageLabel = getByText(rootElement, mockLabel);

    expect(coverageLabel).toBeVisible();
  });
});
