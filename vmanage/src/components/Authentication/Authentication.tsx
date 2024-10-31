import { Button, Form, FormProps, Input } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { User } from "../../constants/User";
import {
  loginUserHandler,
  registerUserHandler,
} from "../../services/User.service";

type FieldType = {
  userFname?: string;
  userLname?: string;
  userEmail?: string;
  userPassword?: string;
};

const Authentication = () => {
  const [form] = Form.useForm();
  const [formType, setFormType] = useState<number>(1);

  const navigate = useNavigate();
  const usercontext = useContext(UserContext);

  const onLogin: FormProps<FieldType>["onFinish"] = (values) => {
    loginUserHandler(values as User)
      .then((res) => {
        if (res.data.success) {
          const resData = res.data.data;
          usercontext?.handleLoginLogout(resData.user as User);
          localStorage.setItem("token", resData.token);
          navigate("/dashboard");
        } else {
          console.log(res.data.error.message);
        }
      })
      .catch((error) => console.log(error));
    
  };

  const onRegister: FormProps<FieldType>["onFinish"] = (values) => {
    registerUserHandler(values as User)
      .then((res) => {
        if (res.data.success) {
          const resData = res.data.data;
          usercontext?.handleLoginLogout(resData.user as User);
           localStorage.setItem("token", resData.token);
          navigate("/dashboard");
        } else {
          console.log(res.data.error.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleFormType = (num: number) => {
    setFormType(num);
    form.resetFields();
  };

  return (
    <>
      {formType === 1 ? (
        <div style={{ padding: "5% 0px 40px 20%" }}>
          <h1 style={{ width: "80%", textAlign: "center" }}>Login</h1>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onLogin}
            autoComplete="off"
            size="large"
          >
            <Form.Item<FieldType>
              label="UserEmail"
              name="userEmail"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="userPassword"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <Button
                style={{ marginLeft: "10%" }}
                color="default"
                variant="outlined"
                type="primary"
                onClick={() => handleFormType(2)}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div style={{ padding: "5% 0px 40px 20%" }}>
          <h1 style={{ width: "80%", textAlign: "center" }}>Register</h1>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onRegister}
            autoComplete="off"
            size="large"
          >
            <Form.Item<FieldType>
              label="First Name"
              name="userFname"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Last Name"
              name="userLname"
              rules={[{ required: true, message: "Please input last name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="User Email"
              name="userEmail"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="userPassword"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>

              <Button
                style={{ marginLeft: "10%" }}
                color="default"
                variant="outlined"
                type="primary"
                onClick={() => handleFormType(1)}
              >
                login
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default Authentication;
