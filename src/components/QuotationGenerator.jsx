import { Row, Col, AutoComplete } from 'antd';

export default function QuotationGenerator() {
  const options = [{ value: 'Burns Bay Road' }, { value: 'Downing Street' }, { value: 'Wall Street' }];
  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={20} sm={18} md={12} lg={8} xl={6}>
          <div className="quote">
            <div className="quote__header">
              <h3>Instant Car Shipping Quote</h3>
              <p>Calculate your car shipping rate in 3 easy steps!</p>
            </div>

            <div className="quote__body"></div>
            <div className="quote__section">
              <span className="quote__section--step">1</span>
              <span className="quote__section--title">Origin &amp; Destination</span>
            </div>
            <div className="quote__input-container">
              <AutoComplete placeholder="Pickup Location" />
              <AutoComplete
                style={{ width: 200 }}
                options={options}
                placeholder="Delivery Location"
                filterOption={(inputValue, option) =>
                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </div>
          </div>
        </Col>
      </Row>

      <style jsx global>
        {`
          .quote {
            margin-top: 20px;
            z-index: 3;
            right: 0;
            padding-bottom: 3px;
            border: 2px solid #fff;
            box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0.4);
            background: #fff;
          }

          .quote__header {
            text-align: center;
            width: 100%;
            padding-top: 1.2rem;
            padding-bottom: 1.2rem;
            background-color: #f63e0c;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABMAgMAAAC358n/AAAACVBMVEX///9HcEz///9EorLRAAAAA3RSTlMaAA4Mf89/AAABQElEQVQ4y3WUMVLEMAxFHWZSQEWzR9h77BFSxJkt9yhbAhUNPQ0FnBL/SNr5X3bcSHnOWN+SrPKHVesG81uxlnIvpTw1LyzYrfnlS9kCdqo19sCu8M/wbA/eBv+51thjtroFi8M3Zhd8sJjGImDsgcXhDzHEHoEb2w+flFX4LxQYLAIyy1lg9u0WLIsBW1MWwCQzs7GcBWZhd3bzFDNLgXt2MpZKIsztzpIYY1oSY1oSYypGmVljWhJj1ZkFdsZiJmdSksR2MZ/GRAyz2Zv1tXhbt/Wj/0mmVcuIsWbp89nY6mH5vqNcxTVGjHMvaXEm6Tuu+VWkHPeQhHV20cdw1Luprfq+Px+/mWXARm8wTyxi/Ka1GMa0GMezRIuhjGcTj43JWR4vMf8mnYnduCLGM7Ybf411Y7Kxt7Y+WljYd2P/340aPNbGbJEAAAAASUVORK5CYII=);
            background-repeat: no-repeat;
            background-size: auto 100%;
            color: #fff;
          }

          .quote__header h3 {
            font-weight: 700;
            font-size: 18px;
            border-bottom: 1px solid black;
            padding-bottom: 0.8rem;
            margin: 0 1.5rem 0.5rem;
            color: #fff;
          }

          .quote__header p {
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 0;
            line-height: 1.8rem;
            opacity: 1;
            color: #fff;
          }

          .quote__body {
            text-align: center;
            padding: 1rem 1rem 0.3rem;
          }

          .quote__section {
            background: #021c3d;
            padding: 0.2rem 1.4rem;
            display: flex;
            color: #fff;
            box-sizing: border-box;
          }

          .quote__section--step {
            font-size: 17px;
            text-align: center;
            font-weight: 700;
            padding-right: 1.1rem;
            border-right: 1px solid hsla(0, 0%, 100%, 0.3);
            margin: 0.6rem 0;
          }

          .quote__section--title {
            font-size: 16px;
            padding-left: 1.1rem;
            line-height: 2.05rem;
            margin: 0.6rem 0;
          }

          .quote__input-container {
            border: 1px solid #ccc;
            border-top: 0;
            padding: 1rem;
            margin-bottom: 1rem;
          }
        `}
      </style>
    </>
  );
}
