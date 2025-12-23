import React, { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { message, Dropdown, Avatar, Space } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import useUserStore from "@/store/userStore";

const HeaderCom: React.FC = () => {
  const navigate = useNavigate();
  const { userName, avatar } = useUserStore();
  const items: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: "1",
        label: <Link to="/admin/user">个人中心</Link>,
        icon: <UserOutlined />,
      },
      {
        type: "divider",
      },
      {
        key: "3",
        label: "退出登录",
        icon: <LogoutOutlined />,
        danger: true,
      },
    ];
  }, []);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "3") {
      //退出登录
      navigate("/login");
      message.success("退出登录");
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {/* <Breadcrumb
          items={[
            {
              title: "首页",
            },
            {
              title: "工作台",
            },
          ]}
        /> */}
        <Link to="/admin/form">表单</Link>
        <Link to="/admin/home" style={{ marginLeft: "10px" }}>
          home
        </Link>
      </div>
      <div className={styles.right}>
        <Dropdown menu={{ items, onClick }}>
          <Space className={styles.dropdownTrigger}>
            {/* <Avatar src={avatar} /> */}
            <span className={styles.username}>{userName}</span>
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderCom;
