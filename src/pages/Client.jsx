import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import apiService from "../Api/AxiosServiceConfiguration";
import Loading from "../components/uiComponents/Loading";

const Client = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [totalClients, setTotalClients] = useState(0);

  const fetchVerifyRequests = async () => {
    try {
      const clientsResponse = await apiService.getClientsVerifyRequests();
      console.log("Clients Verify Requests:", clientsResponse.data);
      setTotalClients(clientsResponse.data.length);

      const combinedRequests = clientsResponse.data.map((client) => ({
        ...client,
        type: "Client",
      }));

      setRequests(combinedRequests);
    } catch (error) {
      console.error("Error fetching verify requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifyRequests();
  }, []);

  const handleDetailsClick = (request) => {
    console.log(request);
    if (request.type === "Client") {
      navigate("/clientdetails", { state: { request } });
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="grid grid-cols-1 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="bg-[#115e59] rounded-lg shadow-lg p-6 flex gap-2 mx-auto text-white transition-transform duration-200"
          >
            <h2 className="text-2xl font-extrabold">Total Pending  Clients:</h2>
            <p className="text-2xl font-bold">{totalClients} Clients</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request, index) => (
                <motion.tr
                  key={request._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={index % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <td className="text-center px-6 py-4 whitespace-nowrap w-fit">
                    <div className="flex  flex-col gap-1  items-center justify-center">
                      <div className= "flex-shrink-0 h-10 w-10">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          className="h-10 w-10 rounded-full"
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt={`${request.firstName} ${request.lastName}`}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.firstName} {request.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {request.email || "N/A"}
                    </div>
                  </td>
                  <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-white bg-main p-2 rounded-md hover:text-main hover:bg-opacity-40 font-semibold "
                      onClick={() => handleDetailsClick(request)}
                      aria-label={`Show request details for ${request.firstName} ${request.lastName}`}
                    >
                      Show Request
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </main>
  );
};

export default Client;
