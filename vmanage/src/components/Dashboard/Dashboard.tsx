import React, { useCallback, useContext, useEffect, useState } from "react";
import { Task } from "../../constants/Task";
import TaskCard from "./TaskCard/TaskCard";
import "./style.css";
import { Button, Input } from "antd";
import ModalTask from "./ModalTask/ModalTask";
import { UserContext } from "../../context/UserContext";
import {
  createTask,
  deleteTask,
  editTask,
  getTasks,
  markAsCompleteTask,
} from "../../services/Task.service";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
 const navigate = useNavigate();
  const [filter, setFilter] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksBackup, setTasksBackup] = useState<Task[]>([]);
  const [toEditTask, setToEditTask] = useState<Task | null>();
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  useEffect(() => {
    
    if (userContext?.user?._id) {
      getTasks(user?._id as string)
        .then((res) => {
          setTasks(res.data.data.tasks);
          setTasksBackup(res.data.data.tasks);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
        navigate("/")
    }
  }, []);

  const handleOnComplete = (taskId: string, status: boolean) => {
    console.log(taskId);
    if (userContext?.user?._id) {
      markAsCompleteTask(taskId, status, userContext.user._id)
        .then((res) => {
          setTasks(res.data.data.tasks);
          setTasksBackup(res.data.data.tasks);
          setFilter(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const createTaskHandler = (task: Task) => {
    if (userContext?.user?._id) {
      createTask(task, userContext.user._id)
        .then((res) => {
          setTasks(res.data.data.tasks);
          setTasksBackup(res.data.data.tasks);
          setFilter(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const editTaskHandler = (task: Task) => {
    if (userContext?.user?._id) {
      editTask(task.taskId, task, userContext.user._id)
        .then((res) => {
          setTasks(res.data.data.tasks);
          setTasksBackup(res.data.data.tasks);
          setFilter(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleOnEdit = (task: Task) => {
    setToEditTask(task);
    setIsModelOpen(true);
  };

  const handleOnDelete = (taskId: string) => {
    if (userContext?.user?._id) {
      deleteTask(taskId, userContext.user._id)
        .then((res) => {
          setTasks(res.data.data.tasks);
          setTasksBackup(res.data.data.tasks);
          setFilter(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [isModalOpen, setIsModelOpen] = useState<boolean>(false);

  const handleOk = useCallback(() => {
    setToEditTask(null);
    setIsModelOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setToEditTask(null);
    setIsModelOpen(false);
  }, []);

  const handleSearch = (search: string) => {
    if (search.length <= 0 || search === " ") {
      setTasks(tasksBackup);
    } else {
      setTasks((state) => state.filter((ele) => ele.taskName.includes(search)));
    }
  };

  const handleFilter = (num: number) => {
    if (num === 1) {
      const data = tasksBackup.filter((ele) => ele.taskInprogress);
      setTasks(data);
      setFilter(1);
    } else if (num === 2) {
      const data = tasksBackup.filter((ele) => !ele.taskInprogress);
      setTasks(data);
      setFilter(2);
    } else {
      setFilter(0);
      setTasks(tasksBackup);
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="filter-bar">
        <Button
          color="default"
          type="primary"
          onClick={() => {
            setIsModelOpen(true);
          }}
        >
          Create New Task
        </Button>

        <div className="filters">
          <Button
            color="default"
            type="primary"
            variant={filter === 1 ? "filled" : "outlined"}
            onClick={() => {
              handleFilter(1);
            }}
          >
            In Progress
          </Button>
          <Button
            color="default"
            type="primary"
            variant={filter === 2 ? "filled" : "outlined"}
            onClick={() => {
              handleFilter(2);
            }}
          >
            Complete
          </Button>
          <Button
            color="default"
            type="primary"
            variant={filter === 0 ? "filled" : "outlined"}
            onClick={() => {
              handleFilter(0);
            }}
          >
            All
          </Button>
          <Input
            placeholder="Search by Task Title"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="card-layout">
        {tasks.length > 0 ? (
          tasks.map((task: Task) => (
            <TaskCard
              task={task}
              handleOnComplete={handleOnComplete}
              handleOnDelete={handleOnDelete}
              handleOnEdit={handleOnEdit}
            ></TaskCard>
          ))
        ) : (
          <p>.....No Tasks to Display</p>
        )}
      </div>
      {isModalOpen && (
        <ModalTask
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
          task={toEditTask}
          createTaskHandler={createTaskHandler}
          editTaskHandler={editTaskHandler}
        ></ModalTask>
      )}
    </div>
  );
};

export default Dashboard;
