import React, { useMemo, useState } from "react";
import { ButtonGroup, Button, Stack, Chip, Paper, IconButton, Tooltip } from "@mui/material";
import { ActionType, ITask, SortingOrder, TaskFilters, TaskView } from "../../redux/interfaces";
import { useAppDispatch } from "../../redux/hooks";
import { updateFilter, updateView, updateSorting } from "../../redux/reducer";
import { fetchTasksFilter, fetchTasksView, fetchSortingOrder, fetchAllTasks } from "../../redux/selectors";
import { motion } from "framer-motion";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const FiltersText = {
    [TaskFilters.ALL]: "All",
    [TaskFilters.PENDING]: "Pending",
    [TaskFilters.IN_PROGRESS]: "In Progress",
    [TaskFilters.COMPLETED]: "Completed",
};

export const Filters = (props: {onAction: (action: ActionType, task?: ITask) => void}) => {
    const {onAction} = props;
    const tasks = fetchAllTasks();
    const dispatch = useAppDispatch();
    const filter = fetchTasksFilter();
    const view = fetchTasksView();
    const sortingOrder = fetchSortingOrder();

    const setFilter = (option: TaskFilters) => {
        dispatch(updateFilter(option));
    };

    const setView = (newView: TaskView) => {
        dispatch(updateView(newView));
    };

    const toggleSorting = () => {
        dispatch(updateSorting(sortingOrder === SortingOrder.ASC ? SortingOrder.DESC : SortingOrder.ASC));
    };

    const countData = useMemo(() => {
        const res = {
            [TaskFilters.ALL]: tasks.length,
            [TaskFilters.PENDING]: 0,
            [TaskFilters.IN_PROGRESS]: 0,
            [TaskFilters.COMPLETED]: 0,
        }
        tasks.forEach(task => {
            res[task.status]++;
        });
        return res;
    }, [tasks])

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 3,
            }}
        >
            {/* Filter Chips */}
            <Stack direction="row" spacing={1}>
                {Object.keys(TaskFilters).map((key, index) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 120 }}
                    >
                        <Chip
                            label={`${FiltersText[key as TaskFilters]}  ${countData[key]}`}
                            clickable
                            color={filter === key ? "primary" : "default"}
                            onClick={() => setFilter(key as TaskFilters)}
                            sx={{ fontWeight: filter === key ? "bold" : "normal" }}
                        />
                    </motion.div>
                ))}
            </Stack>
            <Stack direction={'row'} gap={'8px'}>
            {/* Sorting Button */}
                <Tooltip title={`Sort by Due Date (${sortingOrder === "asc" ? "Ascending" : "Descending"})`}>
                    <IconButton onClick={toggleSorting} color="primary">
                        {sortingOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
                    </IconButton>
                </Tooltip>

                {/* Toggle View Buttons */}
                <ButtonGroup
                    disableElevation
                    sx={{
                        borderRadius: "50px",
                        overflow: "hidden",
                        border: "2px solid #1976d2",
                    }}
                >
                    <Button
                        onClick={() => setView(TaskView.GRID)}
                        variant={view === TaskView.GRID ? "contained" : "outlined"}
                        sx={{
                            textTransform: "none",
                            px: 3,
                            borderRadius: "50px 0 0 50px",
                        }}
                    >
                        Grid View
                    </Button>
                    <Button
                        onClick={() => setView(TaskView.LIST)}
                        variant={view === TaskView.LIST ? "contained" : "outlined"}
                        sx={{
                            textTransform: "none",
                            px: 3,
                            borderRadius: "0 50px 50px 0",
                        }}
                    >
                        List View
                    </Button>
                </ButtonGroup>
                <Button
                        onClick={() => {
                            onAction(ActionType.ADD)
                        }}
                        variant={"contained"}
                        sx={{
                            textTransform: "none",
                            px: 3,
                            borderRadius: "50px",
                        }}
                    >
                        Add Task
                </Button>
            </Stack>
        </Paper>
    );
};

export default Filters;
