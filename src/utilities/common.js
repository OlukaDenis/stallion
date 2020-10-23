import moment from 'moment'

export const composeActionFromThunk = (actionDispatcher) => {
    return actionDispatcher((action) => action);
}

export const isStagedOrder = (order) => {
    const stagingTime = order.staging_timestamp && new Date(order.staging_timestamp.seconds * 1000);
    const isStaged = stagingTime && moment(stagingTime).isAfter(new Date(Date.now() - 10 * 60 * 1000));
    return isStaged;
}