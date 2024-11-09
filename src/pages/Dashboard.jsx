import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import apiService from "../Api/AxiosServiceConfiguration";
import Loading from "../components/uiComponents/Loading";

const Dashboard = () => {
  const [totalEngineers, setTotalEngineers] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const totalPending = totalClients + totalEngineers;
const [isLoading,setIsLoading]=useState()

  const fetchVerifyRequests = async () => {
    try {
      setIsLoading(true)

      const clientsResponse = await apiService.getClientsVerifyRequests();
      const engineersResponse = await apiService.getEngineersVerifyRequests();

      console.log("Clients Verify Requests:", clientsResponse.data);
      console.log("Engineers Verify Requests:", engineersResponse.data);

      setTotalClients(clientsResponse.data.length);
      setTotalEngineers(engineersResponse.data.length);
    } catch (error) {
      console.error("Error fetching verify requests:", error);
    }finally{
      setIsLoading(false)

    }
  };

  useEffect(() => {
    fetchVerifyRequests();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const barData = [
    { name: 'Clients', pending: totalClients },
    { name: 'Engineers', pending: totalEngineers },
  ];

  const pieData = [
    { name: 'Clients', value: totalClients },
    { name: 'Engineers', value: totalEngineers },
  ];

  const COLORS = ['#115e59', '#0d9488'];
  if(isLoading)
    {
      return <Loading/>
    }
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {[
            {
              title: "Total Clients",
              value: `${totalClients} Clients`,
              color: "bg-[#115e59]",
              href: "/client"
            },
            {
              title: "Total Engineers",
              value: `${totalEngineers} Engineers`,
              color: "bg-[#0d9488]",
              href: "/engineer"
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              <Link to={card.href} className="block">
                <div className={`${card.color} rounded-lg shadow-lg p-6 text-white transform transition-all duration-300 group-hover:shadow-xl`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <motion.h2
                        className="text-2xl font-semibold mb-2 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {card.title}
                      </motion.h2>
                      <motion.p
                        className="text-3xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {card.value}
                      </motion.p>
                    </div>
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="bg-white p-6 rounded-lg shadow-lg relative"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#115e59]">Pending Verifications Distribution</h2>
            <div className="h-64">
              <span className="absolute top-1 left-2 text-main text-sm">total number pending {totalPending}</span>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#115e59" />
                  <YAxis stroke="#115e59" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #115e59' }} />
                  <Legend />
                  <Bar dataKey="pending" fill="#115e59" animationDuration={500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#115e59]">Verification Requests Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#115e59"
                    dataKey="value"
                    animationDuration={500}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #115e59' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
