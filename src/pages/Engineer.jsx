import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import apiService from "../Api/AxiosServiceConfiguration";
import Loading from "../components/uiComponents/Loading";

const Engineer = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [totalEngineers, setTotalEngineers] = useState(0);

  const fetchVerifyRequests = async () => {
    try {
      setIsLoading(true);
      const engineersResponse = await apiService.getEngineersVerifyRequests();

      console.log("Engineers Verify Requests:", engineersResponse.data);
      setTotalEngineers(engineersResponse.data.length);

      const combinedRequests = engineersResponse.data.map((engineer) => ({
        ...engineer,
        type: "Engineer",
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
    if (request.type === "Engineer") {
      navigate("/engineerDetails", { state: { request } });
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
    <main className="flex-1 overflow-hidden bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="grid grid-cols-1 gap-6 mb-8"
        >
       
            <motion.div
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-[#115e59] w-fit rounded-lg shadow-lg p-6 flex gap-2 mx-auto text-white transition-transform duration-200"
              >
      <h2 className="text-2xl font-extrabold text-nowrap">Total Pending Engineers:</h2>
      <p className="text-2xl font-bold text-nowrap">{totalEngineers} Engineers</p>  
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
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>

                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                >
                  <td className="text-center px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col justify-center gap-1 items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          className="h-10 w-10 rounded-full"
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt=""
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
                      className="text-white bg-main p-2 rounded-md hover:text-main hover:bg-opacity-40  font-semibold"
                      onClick={() => handleDetailsClick(request)}
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

export default Engineer;
