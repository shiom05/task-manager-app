import React from "react";
import { Task } from "../../../constants/Task";
import { Card, Avatar, Switch } from "antd";
import Meta from "antd/es/card/Meta";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";


interface TaskCardProps {
    task: Task,
    handleOnComplete: (taskId: string, status: boolean)=>void,
    handleOnEdit: (task: Task)=>void,
    handleOnDelete: (taskId: string)=>void,
}

const TaskCard = ({ task, handleOnComplete, handleOnDelete, handleOnEdit }: TaskCardProps) => {
    console.log(task);
  return (
    <Card
      className={task.taskInprogress ? "inprogress" : "complete"}
      style={{ width: 300 }}
      actions={[
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={!task.taskInprogress}
          onClick={() => handleOnComplete(task.taskId, task.taskInprogress)}
        />,
        <EditOutlined
          key="edit"
          onClick={() => handleOnEdit(task)}
        />,
        <DeleteOutlined
          key="ellipsis"
          onClick={() => handleOnDelete(task.taskId)}
        />,
      ]}
      extra={`${task.taskInprogress ? "In Progress" : "Complete"}`}
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={task.taskName}
        description={task.taskDescription}
      />
    </Card>
  );
};

export default TaskCard;
