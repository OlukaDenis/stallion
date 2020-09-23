import { calculateTotalShippingRate } from '../utilities/calculate_shipping_rate';

export function QuotationSummary({ quote, theme }) {
  return (
    <div className="quotation-summary">
      <div className="header-items">
        <div className="item-cell cell-1">Quote #</div>
        <div className="item-cell cell-2">Pickup From</div>
        <div className="item-cell cell-3">Deliver To</div>
        <div className="item-cell cell-4">Shipping Rate</div>
      </div>
      <div className="service-items">
        <div className="item-cell cell-1">{quote.id}</div>
        <div className="item-cell cell-2">{quote.origin}</div>
        <div className="item-cell cell-3">{quote.destination}</div>
        <div className="item-cell cell-4">${calculateTotalShippingRate(quote)}</div>
      </div>
      <style jsx>
        {`
          .quotation-summary {
            padding-bottom: 10px;
          }
          @media only screen and (min-width: 720px) {
            .quotation-summary .header-items,
            .quotation-summary .service-items {
              display: flex;
              min-height: 35px;
            }
            .quotation-summary .header-items {
              background: rgba(248, 105, 66, 0.3);
            }
            .quotation-summary .item-cell {
              border: 0.5px dotted grey;
              flex: 3;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow-wrap: anywhere;
            }
            .quotation-summary .cell-1,
            .quotation-summary .cell-4 {
              flex: 1.5;
            }
          }
          @media only screen and (max-width: 330px) {
            .quotation-summary {
              font-size: 12px;
            }
          }
          @media only screen and (max-width: 720px) {
            .quotation-summary {
              white-space: nowrap;
              display: flex;
            }
            .quotation-summary .header-items {
              display: inline-block;
              flex: 2;
            }
            .quotation-summary .service-items {
              display: inline-block;
              flex: 3;
            }
            .quotation-summary .header-items,
            .quotation-summary .service-items {
              min-height: 35px;
            }
            .quotation-summary .header-items {
              background: rgba(248, 105, 66, 0.3);
            }
            .quotation-summary .service-items .item-cell {
              padding-left: 6px;
            }
            .quotation-summary .item-cell {
              border: 0.5px dotted grey;
              padding-right: 3px;
            }
          }
        `}
      </style>
    </div>
  );
}
