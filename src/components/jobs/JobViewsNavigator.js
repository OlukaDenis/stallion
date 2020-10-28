import { AimOutlined, CheckOutlined, ClockCircleOutlined, FlagOutlined, SendOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { useIsLoadingNewPage } from "../../hooks/NewPageLoadingIndicator";
import { Router } from "../../utilities/i18n";

export default function JobViewsMenu () {

    const pendingPath = '/jobs/pending';
    const dispatchedPath = '/jobs/dispatched';
    const pickedupPath = '/jobs/pickedup';
    const deliveredPath = '/jobs/delivered';

    const pendingJobsParams = {pathname: pendingPath};
    const dispatchedJobsParams = {pathname: dispatchedPath};
    const pickedUpJobsParams = {pathname: pickedupPath};
    const deliveredJobsParams = {pathname: deliveredPath};

    const [newPage, setNewPage] = useState(null);

    useIsLoadingNewPage(newPage);

    return <Menu selectedKeys={[Router.pathname]} mode="horizontal">
        <Menu.Item onClick={() => setNewPage(pendingJobsParams)} key={pendingPath} icon={<ClockCircleOutlined />}>
          Pending Jobs
        </Menu.Item>
        <Menu.Item onClick={() => setNewPage(dispatchedJobsParams)} key={dispatchedPath} icon={<CheckOutlined />}>
          Dispatched Jobs
        </Menu.Item>
        <Menu.Item onClick={() => setNewPage(pickedUpJobsParams)} key={pickedupPath} icon={<FlagOutlined />}>
          Picked Up Jobs
        </Menu.Item>
        <Menu.Item onClick={() => setNewPage(deliveredJobsParams)} key={deliveredPath} icon={<AimOutlined />}>
          Delivered Jobs
        </Menu.Item>
      </Menu>
}