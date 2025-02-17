import React, { use, useMemo, useState } from "react";
import { ToggleButton, ToggleButtonGroup, List, ListItem, ListItemText, Paper, Modal, Box, TextField, Button, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

import { fetchAllTasks, fetchSortingOrder, fetchTasksFilter, fetchTasksView } from "../../redux/selectors";
import TaskCard from "../Common/TaskCard";
import Filters from "./Filters";
import { ActionType, ITask, TaskFilters, TaskView } from "../../redux/interfaces";
import GridView from "./GridView";
import AddEditTask from "./AddEditTask";
import ListView from "./ListView";
import { sortTasksByDueDate } from "../../utils";
import { useAppDispatch } from "../../redux/hooks";
import { addTask, removeTask, updateTask } from "../../redux/reducer";

export const Home = () => {
    const tasks = fetchAllTasks();
    const view = fetchTasksView()
    const filter = fetchTasksFilter();
    const dispatch = useAppDispatch();
    const [selectedTask, setSelectedTask] = useState<any | null>(null);
    const [taskAction, setTaskAction] = useState<ActionType>(null);
    const [openDeleteDialogFortask, setOpendeleteDialogFortask] = useState<ITask>(null);
    const sortingOrder = fetchSortingOrder();


    const onTaskSelect = (task: ITask) => { 
        setSelectedTask(task);
     }

     const onAction = (action: ActionType, task?: ITask) => {
        if(action === ActionType.DELETE) {
            setOpendeleteDialogFortask(task);
        }
        if(action === ActionType.EDIT) {
            setSelectedTask(task);
            setTaskAction(action);
        }
        if(action === ActionType.ADD) {
            setTaskAction(action);
        }
     }
    
    const tasksToRender = useMemo(() => {
        let tasksToReturn = JSON.parse(JSON.stringify(tasks));
        if (filter === TaskFilters.ALL) tasksToReturn = tasksToReturn
        else tasksToReturn = tasksToReturn.filter((task) => TaskFilters[task.status] === filter);
        return sortTasksByDueDate(tasksToReturn, sortingOrder);
    }, [tasks, filter, sortingOrder]);
    console.log({taskAction })

    return (
        <Stack style={{ padding: "16px", flex: 1, overflow: 'hidden' }}>
            {/* Toggle Button to Switch View */}

            <Filters onAction={onAction}/>

            {/* Grid View */}
            {view === TaskView.GRID ? <GridView  tasks={tasksToRender} onTaskSelect={onTaskSelect} onAction={onAction}/> : <ListView tasks={tasksToRender} onTaskSelect={onTaskSelect}  onAction={onAction}/>}
            {taskAction === ActionType.EDIT || taskAction === ActionType.ADD ? <AddEditTask task={selectedTask} taskAction={taskAction} isOpen={true} onClose={() => {
                setSelectedTask(null);
                setTaskAction(null);
            }} onSave={(data) => {
                if(taskAction === ActionType.EDIT) dispatch(updateTask(data));
                if(taskAction === ActionType.ADD) dispatch(addTask(data));
                setSelectedTask(null);
            }
            } />: null}
            {openDeleteDialogFortask ? <Dialog open={!!openDeleteDialogFortask} onClose={() => setOpendeleteDialogFortask(null)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the task <strong>{openDeleteDialogFortask.title}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpendeleteDialogFortask(null)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            // onDelete(task.id);
                            dispatch(removeTask(openDeleteDialogFortask.id));
                            setOpendeleteDialogFortask(null);
                        }}
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog> : null}
        </Stack>
    );
};

export default Home;
