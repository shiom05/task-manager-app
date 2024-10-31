import { Button, Form, FormProps, Input, Modal } from "antd";
import { Task } from "../../../constants/Task";
import { memo, useEffect } from "react";

interface ModalTaskProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  task?: Task | null;
  createTaskHandler: (task: Task) => void;
  editTaskHandler: (task: Task) => void;
}

type FieldType = {
  taskName?: string;
  taskDescription?: string;
};

const ModalTask = memo(
  ({ isModalOpen, handleOk, handleCancel, task, createTaskHandler, editTaskHandler }: ModalTaskProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (task) {
        form.setFieldsValue({
          taskName: task.taskName,
          taskDescription: task.taskDescription,
        });
      } else {
        form.resetFields();
      }
    }, [form, task]);

    const onHandleSubmit: FormProps<FieldType>["onFinish"] = (values) => {
      task ? editTaskHandler({...values, taskId: task.taskId} as Task) : createTaskHandler(values as Task);
      handleOk();
    };

    return (
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          form.resetFields();
          handleCancel();
        }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onHandleSubmit}
          autoComplete="off"
          size="large"
        >
          <Form.Item<FieldType>
            label="Task Name"
            name="taskName"
            rules={[{ required: true, message: "Please input Task Title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Task Description"
            name="taskDescription"
            rules={[
              { required: true, message: "Please input Task Description!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {task ? "Edit" : "Save"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

export default ModalTask;
