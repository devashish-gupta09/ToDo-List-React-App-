import React, { useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { purple, green, red, indigo, grey } from "@mui/material/colors";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function FormComponent() {
  const [inputData, setInputData] = useState("");
  const [inputError, setInputError] = useState("");

  const [remainingTaskList, setRemainingTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted");

    if (inputData.length > 5 && inputData !== "") {
      const tasklist = {
        id: Math.random(),
        title: inputData,
      };
      const list = [...remainingTaskList];
      list.push(tasklist);

      // Updating the task list
      setRemainingTaskList(list);
      setInputData("");
    }
  };

  const handleOnChange = ({ target }) => {
    target.value.length <= 5
      ? setInputError("Task must have atleast 5 characters")
      : setInputError("");
    setInputData(target.value);
  };

  const handleCheck = (id) => {
    const initial = [...remainingTaskList];
    const initialCompleteTask = [...completedTaskList];
    const currentTime = getCurrentTime(new Date());

    const Index = initial.findIndex((item) => item.id === id);

    remainingTaskList[Index].currentTime = currentTime;
    initialCompleteTask.push(remainingTaskList[Index]);

    // deleting item from remaining task list
    const updatedRemainingTask = initial.filter((item) => item.id !== id);

    // update the task state
    setRemainingTaskList(updatedRemainingTask);
    setCompletedTaskList(initialCompleteTask);
  };

  const handleDelete = (id) => {
    const initial = [...remainingTaskList];
    const updated = initial.filter((item) => item.id !== id);
    setRemainingTaskList(updated);
  };

  const getCurrentTime = (date = new Date()) => {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let amPM = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let currentTime = hour + ":" + minutes + " " + amPM;
    return currentTime;
  };

  return (
    <Box mt={3} sx={styles.container}>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={3} sx={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h5" color="primary" sx={styles.heading}>
                To-Do List App
              </Typography>
              <Grid container justifyContent="center">
                <Grid item xs={8}>
                  <TextField
                    id="inputTaskField"
                    label="Press Enter to add a task"
                    variant="outlined"
                    fullWidth
                    size="small"
                    onChange={handleOnChange}
                    value={inputData}
                    error={inputError ? true : false}
                    helperText={inputError}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Task Grid Container */}
        <Grid item xs={12} sx={styles.secondColumn}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <List sx={styles.listContainer}>
                <Typography
                  variant="h5"
                  align="left"
                  sx={styles.listContainerTitle}
                >
                  Remaining Tasks
                </Typography>
                {remainingTaskList.length > 0 ? (
                  remainingTaskList.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar sx={styles.remaingTaskAvatar}>
                          {item.title[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.title} />
                      <ListItemSecondaryAction>
                        <IconButton
                          style={{ color: green[500] }}
                          onClick={() => handleCheck(item.id)}
                        >
                          <DoneOutlineIcon />
                        </IconButton>
                        <IconButton
                          style={{ color: red[600] }}
                          onClick={() => handleDelete(item.id)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={styles.emptyMessage}>
                    No Tasks added yet!
                  </Typography>
                )}
              </List>
            </Grid>

            <Grid item xs={12} sm={6}>
              <List sx={styles.listContainer}>
                <Typography
                  variant="h5"
                  align="left"
                  sx={styles.listContainerTitle}
                >
                  Completed Tasks
                </Typography>
                {completedTaskList.length > 0 ? (
                  completedTaskList.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar sx={styles.completeTaskAvatar}>
                          {item.title[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={item.currentTime}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={styles.emptyMessage}>
                    No Tasks completed yet!
                  </Typography>
                )}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const styles = {
  container: {
    margin: "0 auto",
    padding: 4,
    maxWidth: "1140px",
  },
  formContainer: {
    padding: 6,
  },
  heading: {
    fontWeight: "bold",
    color: purple[900],
  },
  secondColumn: {
    marginTop: 4,
  },
  listContainer: {
    backgroundColor: "#fff",
    padding: 8,
    minHeight: "300px",
    height: "auto",
  },
  listContainerTitle: {
    color: purple[900],
    fontWeight: "bold",
    paddingLeft: 2,
    marginBottom: 4,
  },
  remaingTaskAvatar: {
    color: "#fff",
    backgroundColor: indigo["A400"],
  },
  emptyMessage: {
    color: grey[400],
    marginTop: 10,
  },
  completeTaskAvatar: {
    backgroundColor: green[600],
    color: "#fff",
  },
};
