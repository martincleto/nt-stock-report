import { CURRENCY, CURRENCY_LOCALE, IMAGE_FOLDER } from '@appconfig';
import { AppStockReport } from '@apptypes';

export class ProductDTO implements AppStockReport.Product {
  code: number;
  coverageLabel: AppStockReport.CoverageLabel;
  imagePath: string;
  name: string;
  price: string;
  salesRanking: number;
  sizeStock: Record<AppStockReport.Size, number>;
  stockoutRate: number;
  warehouseCoverage: number;

  /* eslint-disable camelcase */
  constructor({
    code,
    name,
    price,
    sales_ranking,
    size_stock,
    stockout_rate,
    wh_coverage,
  }: AppStockReport.ProductResponse) {
    this.code = code;
    this.coverageLabel = this.getCoverageLabel(wh_coverage);
    this.imagePath = this.getImagePath(code);
    this.name = name;
    this.price = new Intl.NumberFormat(CURRENCY_LOCALE, {
      style: 'currency',
      currency: CURRENCY,
    }).format(price);
    this.salesRanking = sales_ranking;
    this.sizeStock = size_stock;
    this.stockoutRate = stockout_rate;
    this.warehouseCoverage = wh_coverage;
  }
  /* eslint-enable camelcase */

  // eslint-disable-next-line class-methods-use-this
  getCoverageLabel(warehouseCoverage: number): AppStockReport.CoverageLabel {
    if (warehouseCoverage < 0.25) {
      return 'Very Low';
    }
    if (warehouseCoverage < 0.5) {
      return 'Low';
    }
    if (warehouseCoverage < 0.75) {
      return 'Good';
    }
    return 'Very Good';
  }

  // eslint-disable-next-line class-methods-use-this
  getImagePath(code: number): string {
    return `${IMAGE_FOLDER}/${code}.jpg`;
  }
}
