import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITasks, ITask, TaskStatus, TaskFilters, TaskView, ITaskreducer, SortingOrder } from "./interfaces";
import { DUMMY_DATA } from "./dummdata";


const initialState: ITaskreducer= {
    tasks: JSON.parse(localStorage.getItem("tasks")) || DUMMY_DATA,
    Filter: TaskFilters.ALL,
    view: TaskView.GRID,
    dueDateSortingOrder: SortingOrder.ASC
}


const tasksReducer = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        // Adding Tasks
        addTask: (state: ITaskreducer, action: PayloadAction<ITask>) => {
            state.tasks.unshift(action.payload);
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
            return state;
        },
        // Remove Tasks
        removeTask: (state: ITaskreducer, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter((item) => item.id !== action.payload);
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
            return state;
        },
        // Update Tasks
        updateTask: (state: ITaskreducer, action: PayloadAction<ITask>) => {
            const index = state.tasks.findIndex((item) => item.id === action.payload.id);
            state.tasks[index] = action.payload;
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
            return state;
        },
        updateFilter: (state: ITaskreducer, action: PayloadAction<TaskFilters>) => {
            state.Filter = action.payload;
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
            return state;
        },
        updateView: (state: ITaskreducer, action: PayloadAction<TaskView>) => {
            state.view = action.payload;
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
            return state;
        },
        updateSorting: (state: ITaskreducer, action: PayloadAction<SortingOrder>) => {
            state.dueDateSortingOrder = action.payload;
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
            return state;
        }
    },
});

export const {
    addTask,
    removeTask,
    updateTask,
    updateFilter,
    updateView,
    updateSorting
} = tasksReducer.actions;
export const reducer = tasksReducer.reducer;
