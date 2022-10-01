import { insertElement } from '@test/util';

import Chart from 'chart.js';

jest.mock('chart.js');

const TAG_NAME = 'bar-chart';

describe(TAG_NAME, () => {
  const mockAttrs = {
    id: 'averageTempChart',
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

  afterEach(() => {
    document.body.getElementsByTagName(TAG_NAME)[0].remove();
  });

  test('should render a bar chart', () => {
    insertElement(`
      <bar-chart id="${mockAttrs.id}" data=${JSON.stringify(mockAttrs.data)}></bar-chart>
    `);

    expect(Chart).toHaveBeenCalled();
  });
});
