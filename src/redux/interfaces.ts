export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export enum ActionType {
    EDIT = "EDIT",
    DELETE = "DELETE",
    ADD = "ADD"
}

export enum TaskFilters {
    ALL = "ALL",
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export enum SortingOrder {
    ASC = "asc",
    DESC = "desc"
}

export enum TaskView {
    LIST = "LIST",
    GRID = "GRID"
}

export interface ITask {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
}

export type ITasks = ITask[];

export interface ITaskreducer {
    tasks: ITasks;
    Filter: TaskFilters;
    view: TaskView,
    dueDateSortingOrder: SortingOrder
}