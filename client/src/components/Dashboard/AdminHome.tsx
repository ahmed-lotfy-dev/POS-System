import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useLoaderData, useRevalidator } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Loader } from "@/components/ui/loader";
import { WelcomeHeader } from "../shared/WelcomeHeader";

type DashboardStats = {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalUnits: number;
  totalRevenue: number;
  chartData: { date: string; orders: number; revenue: number }[];
};

type Period = "today" | "week" | "month" | "year" | "all";

const Dashboard = () => {
  const loaderData = useLoaderData() as { dashboardStats: DashboardStats };
  const revalidator = useRevalidator();
  const [stats, setStats] = useState<DashboardStats>(loaderData.dashboardStats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>("all");

  useEffect(() => {
    // Skip initial fetch since loader provides the data
    if (period === "all") return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/dashboard/stats?period=${period}`);
        const statsData = data.data || data;
        setStats(statsData);
        setError(null);
      } catch (error: any) {
        console.error("Failed to fetch dashboard stats", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [period]);

  const periodButtons: { label: string; value: Period }[] = [
    { label: "Today", value: "today" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "All Time", value: "all" },
  ];

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center text-red-500">
        <p>Error loading dashboard: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-auto p-6 space-y-8">
      <WelcomeHeader
        subtitle="Here's what's happening with your business today"
        showTimeGreeting={true}
      />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>

        {/* Period Selector */}
        <div className="flex gap-2">
          {periodButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setPeriod(btn.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                period === btn.value
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">
            Total Products
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            {stats.totalProducts}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">
            Total Categories
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            {stats.totalCategories}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">
            Total Orders
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            {stats.totalOrders}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">
            Total Units
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            {stats.totalUnits}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-green-700">
          <h3 className="text-green-700 dark:text-green-300 text-sm font-medium uppercase">
            Total Revenue
          </h3>
          <p className="text-3xl font-bold text-green-800 dark:text-green-100 mt-2">
            ${(stats.totalRevenue || 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          Sales & Revenue Overview
        </h2>
        {loading ? (
          <div className="h-[600px] flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="h-[600px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" allowDecimals={false} />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="orders"
                  fill="#8884d8"
                  name="Orders"
                />
                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  fill="#82ca9d"
                  name="Revenue ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export { Dashboard };
