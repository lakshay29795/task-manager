import { useAppSelector } from "./hooks";

import { RootState } from './store';

const commonTaskSelector = (state: RootState) => state.tasks;
export const fetchAllTasks = () => {
    const data = useAppSelector(commonTaskSelector);
    return data.tasks;

};
export const fetchTasksFilter = () => {
    const data = useAppSelector(commonTaskSelector);
    return data.Filter;
}

export const fetchTasksView = () => {
    const data = useAppSelector(commonTaskSelector);
    return data.view;
}


export const fetchSortingOrder = () => {
    const data = useAppSelector(commonTaskSelector);
    return data.dueDateSortingOrder;
}