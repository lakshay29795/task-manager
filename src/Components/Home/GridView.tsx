import React from "react";
import Grid from "@mui/material/Grid";
import TaskCard from "../Common/TaskCard";
import { ActionType, ITask, ITasks } from "../../redux/interfaces";
import { Stack } from "@mui/material";

export const GridView = ({ tasks, onAction }: { tasks: ITasks; onTaskSelect: (task: ITask) => void; onAction: (action: ActionType, task: ITask) => void }) => {
    return (
        <Stack style={{ padding: "16px", flex: 1, overflow: 'auto' }}>
            <Grid container spacing={2}>
                {tasks.map((task) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
                        <TaskCard task={task} onAction={onAction} />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default GridView;
