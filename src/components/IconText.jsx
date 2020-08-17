import { Space } from "antd";

const IconText = ({ icon, text, onClick }) => (
  <Space onClick={() => (onClick ? onClick() : null)}>
    {React.createElement(icon, { className: 'primary-color-font' })}
    <span className="primary-color-font">{text}</span>
  </Space>
);

export default IconText;
