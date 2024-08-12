import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask, deleteTask, moveTask } from "../actions/index";
import { injectReducer } from "../store";
import taskReducer from "../reducers/taskreducer";
import authReducer from "../reducers/authReducer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Inject reducers before accessing them
injectReducer("tasks", taskReducer);
injectReducer("auth", authReducer);

const stages = ["Backlog", "To Do", "Ongoing", "Done"];

const TaskManagement = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const tasks = useSelector((state) => state.tasks.tasks);
  const [formData, setFormData] = useState("");
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const dispatch = useDispatch();

  const handleOpen = (task = null) => {
    setCurrentTask(task);
    if (!task) {
      setFormData({
        name: "",
        priority: "",
        deadline: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = (task) => {
    if (currentTask) {
      // Edit existing task
      dispatch(editTask({ ...currentTask, ...task }));
    } else {
      // Add new task with the correct stage
      const newTask = {
        ...task,
        id: tasks.length + 1,
        stage: 0, // Assign it to the "Backlog" stage
      };
      dispatch(addTask(newTask));
    }
    handleClose();
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEdit = (task) => {
    handleOpen(task);
  };

  const handleMoveTask = (taskId, direction) => {
    const task = tasks.find((task) => task.id === taskId);
    const newStage = task.stage + direction;

    if (newStage >= 0 && newStage < stages.length) {
      dispatch(moveTask(taskId, newStage)); // Pass taskId and newStage
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If the item was dropped outside the list or if dropped in the same location, do nothing
    if (!destination || source.droppableId === destination.droppableId) return;

    const taskId = parseInt(draggableId);
    const sourceStage = parseInt(source.droppableId);
    const destinationStage = parseInt(destination.droppableId);

    if (sourceStage !== destinationStage) {
      dispatch(moveTask(taskId, destinationStage)); // Move the task to the new stage
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
          }}
        >
          Task Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Create Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {stages.map((stage, index) => (
            <Droppable droppableId={index} key={index}>
              {(provided) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <TaskColumn
                    stage={index}
                    title={stage}
                    tasks={tasks.filter((task) => task.stage === index)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onMoveTask={handleMoveTask}
                    provided={provided}
                  />
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          ))}
        </Grid>
      </DragDropContext>

      <TaskDialog
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        task={currentTask}
      />
    </Container>
  );
};

const TaskColumn = ({
  stage,
  title,
  tasks,
  onEdit,
  onDelete,
  onMoveTask,
  provided,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        minHeight: "500px",
        minInlineSize: "250px",
        backgroundColor: "#F9F9F9", // previous color: #F9F9F9
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          position: "relative",
          display: "inline-block",
          mb: 1,
        }}
      >
        {title}
        <span
          style={{
            display: "block",
            height: "4px",
            backgroundColor: "#3f51b5",
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        />
      </Typography>
      <Box sx={{ mt: 2 }}>
        {tasks.map((task, index) => {
          console.log(task,"task")
          return <Draggable
          draggableId={task.stage}
          index={index}
          key={task.id}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskItem
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onMoveTask={onMoveTask}
                disableMoveBack={stage === 0}
                disableMoveForward={stage === stages.length - 1}
              />
            </div>
          )}
        </Draggable>
        }
          
        )}
      </Box>
    </Paper>
  );
};

const TaskItem = ({
  task,
  onEdit,
  onDelete,
  onMoveTask,
  disableMoveBack,
  disableMoveForward,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        position: "relative", // Relative positioning for absolute placement of buttons
        minHeight: "120px", // Adjust to ensure space for both content and buttons
      }}
    >
      <Box>
        <Typography variant="subtitle1">{task.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          Priority: {task.priority} | Due: {task.deadline}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          backgroundColor: "#f0f0f0",
          padding: "8px",
          borderRadius: "50px",
          position: "absolute",
          bottom: "8px", // Positioned at the bottom of the Paper component
          right: "10%", // Positioned at the right of the Paper component
          left:"10%",
          maxHeight: "40px",
        }}
      >
        <IconButton
          onClick={() => onMoveTask(task.id, -1)}
          disabled={disableMoveBack}
          sx={{ color: "inherit" }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={() => onMoveTask(task.id, 1)}
          disabled={disableMoveForward}
          sx={{ color: "inherit" }}
        >
          <ArrowForwardIcon />
        </IconButton>
        <IconButton
          onClick={() => onEdit(task)}
          sx={{ color: "inherit" }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => onDelete(task.id)}
          sx={{ color: "inherit" }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};


const TaskDialog = ({ open, onClose, onSave, task }) => {
  const [formData, setFormData] = useState({
    name: "",
    priority: "",
    deadline: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || "",
        priority: task.priority || "",
        deadline: task.deadline || "",
      });
    } else {
      setFormData({ name: "", priority: "", deadline: "" });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({ ...task, ...formData });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{task ? "Edit Task" : "Create Task"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Task Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="priority"
          label="Priority"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.priority}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="deadline"
          label="Deadline"
          type="date"
          fullWidth
          variant="outlined"
          value={formData.deadline}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskManagement;
