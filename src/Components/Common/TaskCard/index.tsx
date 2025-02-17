import React, { useRef, useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Tooltip,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import { ActionType, ITask, TaskStatus } from "../../../redux/interfaces";

const statusColors: Record<string, "success" | "warning" | "info"> = {
    [TaskStatus.COMPLETED]: "success",
    [TaskStatus.PENDING]: "warning",
    [TaskStatus.IN_PROGRESS]: "info",
};

const TaskCard = ({
    task,
    onAction,
}: {
    task: ITask;
    onAction: (action: ActionType, task: ITask) => void
}) => {
    const { title, description, status, dueDate } = task;
    const dueDateObj = new Date(dueDate);

    const titleRef = useRef<HTMLParagraphElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    const [isTitleTruncated, setIsTitleTruncated] = useState(false);
    const [isDescTruncated, setIsDescTruncated] = useState(false);

    useEffect(() => {
        if (titleRef.current) {
            setIsTitleTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth);
        }
        if (descRef.current) {
            setIsDescTruncated(descRef.current.scrollHeight > descRef.current.clientHeight);
        }
    }, [title, description]);

    return (
        <>
            {/* Delete Confirmation Dialog */}

            {/* Task Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <Card
                    sx={{
                        maxWidth: 350,
                        minWidth: 300,
                        minHeight: 180,
                        height: "auto",
                        p: 2,
                        borderRadius: 3,
                        boxShadow: 4,
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flexGrow: 1,
                        position: "relative",
                    }}
                >

                    <CardContent sx={{ flexGrow: 1, padding: '0 !important', display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    {/* Edit & Delete Icons */}
                    <Box sx={{
                        display: "flex",
                        gap: "4px",
                        flexDirection: "column",
                    }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        {/* Title with Tooltip */}
                        {isTitleTruncated ? (
                            <Tooltip title={title} arrow>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "block",
                                    }}
                                    ref={titleRef}
                                >
                                    {title}
                                </Typography>
                            </Tooltip>
                        ) : (
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "block",
                                }}
                                ref={titleRef}
                            >
                                {title}
                            </Typography>
                        )}

                    <Box
                        sx={{
                            // position: "absolute",
                            // top: 8,
                            // right: 8,
                            display: "flex",
                            gap: 1,
                        }}
                    >
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
                    </Box>
                        </Box>

                        {/* Description with Tooltip */}
                        {isDescTruncated ? (
                            <Tooltip title={description} arrow>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 3,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                    ref={descRef}
                                >
                                    {description}
                                </Typography>
                            </Tooltip>
                        ) : (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 3,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                ref={descRef}
                            >
                                {description}
                            </Typography>
                        )}

                    </Box>
                        {/* Status & Due Date */}
                        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                            <Chip label={status} color={statusColors[status]} />
                            <Typography variant="caption" color="text.secondary">
                                Due: {dueDateObj.getDate()}/{dueDateObj.getMonth() + 1}/{dueDateObj.getFullYear()}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    );
};

export default TaskCard;
