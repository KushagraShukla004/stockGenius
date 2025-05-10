/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersTable from "@/components/admin/UsersTable";
import { allUsers } from "@/store/slices/adminSlice";
import { Toaster } from "sonner";
import { motion } from "motion/react";
import { Users, UserCheck, TrendingUp, Activity, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { users, loading, totalUsers, currentPage } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminCount, setAdminCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [userGrowth, setUserGrowth] = useState(0);

  // Fetch users when component mounts
  useEffect(() => {
    dispatch(
      allUsers({
        page: 1,
        limit: 10,
        search: searchTerm,
      })
    );
  }, [dispatch, searchTerm]);

  // Calculate metrics
  useEffect(() => {
    if (users.length > 0) {
      const admins = users.filter((user) => user.role === "admin").length;
      setAdminCount(admins);

      // For demo purposes, let's simulate some metrics
      setActiveUsers(Math.floor(totalUsers * 0.75)); // 75% of users are active
      setUserGrowth(12.8); // 12.8% growth
    }
  }, [users, totalUsers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 gradient-text">Admin Dashboard</h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-card border-primary/10 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{totalUsers}</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-accent">+{userGrowth}%</span> from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-card border-secondary/10 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Admin Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{adminCount}</div>
                  <div className="p-2 bg-secondary/10 rounded-full">
                    <UserCheck className="h-5 w-5 text-secondary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {((adminCount / totalUsers) * 100).toFixed(1)}% of total users
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-card border-accent/10 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{activeUsers}</div>
                  <div className="p-2 bg-accent/10 rounded-full">
                    <Activity className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {((activeUsers / totalUsers) * 100).toFixed(1)}% active in last 30 days
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-card border-primary/10 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  User Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">+{userGrowth}%</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Compared to previous month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 bg-card border-muted"
            />
          </div>
        </div>

        {/* Users Table */}
        <UsersTable
          data={users}
          loading={loading}
          totalUsers={totalUsers}
          currentPage={currentPage}
        />
      </motion.div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AdminPage;
