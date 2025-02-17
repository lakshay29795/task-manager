import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup, List, ListItem, ListItemText, Paper, Modal, Box, TextField, Button, Stack, Chip, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { fetchAllTasks, fetchTasksView } from "../../redux/selectors";
import { ActionType, ITask, ITasks } from "../../redux/interfaces";
import { Delete, Edit } from "@mui/icons-material";

export const ListView = (props: {tasks: ITasks, onTaskSelect: (task: ITask) => void; onAction: (action: ActionType, task: ITask) => void }) => {
    const {tasks, onTaskSelect, onAction} = props;
    return (
        <Stack style={{ padding: "16px", flex: 1, overflow: 'hidden' }}>
            <Paper
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        boxShadow: 3,
                        // maxHeight: "400px",
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        overflowY: "auto"
                    }}
                >
                    <List>
                        {tasks.map((task, index) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <ListItem 
                                    button 
                                    divider
                                    onClick={() => onTaskSelect(task)}
                                    sx={{ mb: 1, borderRadius: 2, bgcolor: "background.paper" }}
                                    secondaryAction={
                                        <>
                                            <IconButton size="small" color="primary" onClick={() => onAction(ActionType.EDIT, task)}>
                                                <Edit fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => onAction(ActionType.DELETE, task)}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </>
                                      }
                                >
                                    <ListItemText
                                        primary={task.title}
                                        secondary={`Due: ${task.dueDate} | Status: ${task.status}`}
                                    />
                                </ListItem>
                            </motion.div>
                        ))}
                    </List>
                </Paper>
        </Stack>
    );
};

export default ListView;
