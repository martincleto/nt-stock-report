import { LitElement } from 'lit';
import { customElement } from '@test/util';
// eslint-disable-next-line import/no-extraneous-dependencies
import { waitFor } from '@testing-library/dom';

const mockChart = jest.fn();

jest.mock('chart.js', () =>
  jest.fn().mockImplementation(() => ({
    Chart: mockChart,
  }))
);

const TAG_NAME = 'bar-chart';

describe(TAG_NAME, () => {
  const mockAttrs = {
    chartId: 'averageTempChart',
    data: {
      January: 9,
      February: 12,
      March: 16,
      April: 19,
      May: 22,
      June: 24,
      July: 26,
    },
  };

  beforeEach(async () => {
    await customElement(TAG_NAME).setup([
      {
        chartId: mockAttrs.chartId,
        data: JSON.stringify(mockAttrs.data),
      },
    ]);
  });

  afterEach(() => {
    customElement(TAG_NAME).cleanup();
  });

  test('should render a bar chart', async () => {
    waitFor(() => expect(mockChart).toHaveBeenCalled());
  });
});
