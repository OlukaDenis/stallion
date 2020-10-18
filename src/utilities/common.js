export const composeActionFromThunk = (actionDispatcher) => {
    return actionDispatcher((action) => action);
}