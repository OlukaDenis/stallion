import React from 'react';

const SectionHeader = ({ theme, title }) => {
  const isLightMode = theme === 'light';
  return (
    <div className={isLightMode ? 'shipment-details' : 'shipment-details shipment-details_dark'}>
      <span
        className={isLightMode ? 'shipment-details--title' : 'shipment-details--title shipment-details--title_dark'}
      >
        {title}
      </span>
      <style jsx global>
        {`
          .shipment-details {
            background: rgba(248, 105, 66, 0.671);
            padding: 0.2rem 1.4rem;
            display: flex;
            color: black;
            box-sizing: border-box;
          }
          .shipment-details_dark {
            background: #000;
            color: #fff;
          }
          .shipment-details--title {
            font-size: 16px;
            padding-left: 1.1rem;
            line-height: 2.05rem;
            margin: 0.6rem 0;
          }
          // .shipment-details--step {
          //   font-size: 17px;
          //   text-align: center;
          //   font-weight: 700;
          //   padding-right: 1.1rem;
          //   border-right: 1px solid hsla(0, 0%, 100%, 0.3);
          //   margin: 0.6rem 0;
          // }
        `}
      </style>
    </div>
  );
};

export default SectionHeader;