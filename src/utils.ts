import { ITasks, SortingOrder } from "./redux/interfaces";

export const sortTasksByDueDate = (tasks: ITasks, order: SortingOrder): ITasks => {
    return tasks.sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime(); // Convert string to Date
        const dateB = new Date(b.dueDate).getTime();

        return order === SortingOrder.ASC ? dateA - dateB : dateB - dateA;
    });
};