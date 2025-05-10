/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Table, Select, message } from "antd";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { motion } from "motion/react";
import { updateRole, deleteUser } from "@/store/slices/adminSlice";
import { toast } from "sonner";

const { Option } = Select;

const UsersTable = ({ data = [], loading = false, totalUsers = 0, currentPage = 1 }) => {
  const dispatch = useDispatch();
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleChange = (userId, role) => {
    setSelectedRole(role);
  };

  const saveRoleChange = async (userId) => {
    try {
      await dispatch(updateRole({ userId, role: selectedRole }));
      toast.success("Role updated successfully");
      setEditingUserId(null);
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(deleteUser(userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      width: 80,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
      render: (text, record) =>
        editingUserId === record._id ? (
          <Select
            defaultValue={text}
            style={{ width: 120 }}
            onChange={(value) => handleRoleChange(record._id, value)}
          >
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        ) : (
          text
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (text, record) => (
        <div className="flex gap-2">
          {editingUserId === record._id ? (
            <Button
              onClick={() => saveRoleChange(record._id)}
              className="bg-green-500 hover:bg-green-600"
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={() => setEditingUserId(record._id)}
              disabled={record._id === editingUserId}
            >
              Edit Role
            </Button>
          )}
          <Button variant="destructive" onClick={() => handleDeleteUser(record._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: totalUsers,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} users`,
        }}
        rowKey="_id"
        scroll={{ x: "100%" }}
        size="middle"
        className="bg-[#333130] rounded-lg shadow-l"
      />
    </motion.div>
  );
};

export default UsersTable;
