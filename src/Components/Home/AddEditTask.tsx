import React, { useState } from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    IconButton,
    Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { ActionType, ITask, TaskStatus } from "../../redux/interfaces";
import { fetchAllTasks } from "../../redux/selectors";

const newTask: ITask = {
    id: new Date().getTime(),
    title: "",
    description: "",
    status: TaskStatus.PENDING,
    dueDate: null,
};

export const AddEditTask = (props: {
    task?: ITask;
    isOpen: boolean;
    taskAction: ActionType;
    onClose: () => void;
    onSave: (task: ITask) => void;
}) => {
    const tasks = fetchAllTasks();
    const { task, isOpen, onClose, onSave, taskAction } = props;
    const [selectedTask, setSelectedTask] = useState<ITask | null>(task || newTask);
    const [errors, setErrors] = useState<Array<string>>([]);

    const handleInputChange = (key: string, value: any) => {
        setSelectedTask((prev) => (prev ? { ...prev, [key]: value } : prev));
    };

    const shouldPassBasicValidation = () => !!(selectedTask?.title && selectedTask?.status && selectedTask?.dueDate);

    const isValidTask = () => {

       let isValid = shouldPassBasicValidation();
       if(isValid) {
           isValid = tasks.findIndex((task) => task.title === selectedTask.title && task.id !== selectedTask.id) === -1;
           setErrors(["Task with the same title already exists"]);
       }
        return isValid;
    }

    const handleSave = () => {
        if (isValidTask() && selectedTask) {
            onSave(selectedTask);
            onClose();
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose} // Allow closing by clicking outside
            aria-labelledby="edit-task-modal"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    position: "relative",
                }}
            >
                {/* Close Button at the Top Right */}
                <Stack direction="row" justifyContent="space-between">
                    <h2>{taskAction=== ActionType.EDIT ? 'Edit Task' : 'Add Task'}</h2>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
               {errors.length > 0 && errors.map((error) => (
                        <p key={error} style={{ color: "red" }}>
                            {error}
                        </p>
                    ))}
                <TextField
                    label="Title"
                    fullWidth
                    required
                    value={selectedTask?.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={selectedTask?.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                />

                {/* Status Dropdown */}
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={selectedTask?.status}
                        onChange={(e) => handleInputChange("status", e.target.value)}
                    >
                        {Object.values(TaskStatus).map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Due Date Picker */}
                <DatePicker
                    label="Due Date"
                    value={selectedTask?.dueDate ? dayjs(selectedTask.dueDate) : null}
                    onChange={(newValue) =>
                        handleInputChange("dueDate", newValue ? newValue.toISOString() : null)
                    }
                    slotProps={{ textField: { fullWidth: true, required: true } }}
                />

                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={!shouldPassBasicValidation()}
                >
                   {taskAction=== ActionType.EDIT ? 'Update' : 'Add'}
                </Button>
            </Box>
        </Modal>
    );
};

export default AddEditTask;
