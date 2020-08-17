import { Badge } from 'antd';

export default function BadgeIcon({children, count}) {

    return (
      <span role="img" aria-label="edit" className="anticon anticon-edit">
        <Badge className="custom-icon-image badge-icon" count={count} overflowCount={'99'}>
          {children}
        </Badge>
      </span>
    );
}