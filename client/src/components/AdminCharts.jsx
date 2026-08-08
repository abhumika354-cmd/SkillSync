import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function AdminCharts({ stats }) {

  const barData = [
    {
      name: "Users",
      value: stats.totalUsers,
    },
    {
      name: "Jobs",
      value: stats.totalJobs,
    },
    {
      name: "Applications",
      value: stats.totalApplications,
    },
    {
      name: "Resumes",
      value: stats.totalResumes,
    },
  ];

  const pieData = [
    {
      name: "Users",
      value: stats.totalUsers,
    },
    {
      name: "Jobs",
      value: stats.totalJobs,
    },
    {
      name: "Applications",
      value: stats.totalApplications,
    },
    {
      name: "Resumes",
      value: stats.totalResumes,
    },
  ];

  const COLORS = [
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
  ];

  return (

    <div className="charts-grid">

      <div className="chart-card">

        <h2>📊 Overview</h2>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={barData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h2>🥧 Distribution</h2>

        <ResponsiveContainer width="100%" height={320}>

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={110}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Legend />

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default AdminCharts;