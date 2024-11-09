import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, UserCheck, UserX, Mail, CircleUserRound } from "lucide-react";
import apiService from "../Api/AxiosServiceConfiguration";

const Client = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const client = location.state.request;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [remarks, setRemarks] = useState("");

  const frontImage = client.clientId.verificationInfo.frontId || "default.jpg";
  const backImage = client.clientId.verificationInfo.backId || "default.jpg";

  const openModal = useCallback((image) => {
    setSelectedImage(image);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedImage("");
  }, []);

  const handleVerification = async (status) => {
    const id = client._id;
    try {
      await apiService.patchClientStatus(id, {
        status,
        remarks: remarks || null,
      });
      setVerificationStatus(status === "accepted" ? "verified" : "rejected");
      navigate("/");
    } catch (error) {
      console.error("Error updating verification status:", error);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const renderImage = (image, label) => (
    <div>
      <p className="text-sm text-base-content mb-2">{label}</p>
      <img
        src={image}
        alt={label}
        className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
        onClick={() => openModal(image)}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-base-100 flex items-center justify-center p-6">
      <motion.div
        className="max-w-6xl w-full bg-base-100 rounded-2xl shadow-xl overflow-hidden"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <div className="bg-primary text-primary-content px-10 py-4">
          <h1 className="text-3xl font-bold">Client Details</h1>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-base-200 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Personal Information
              </h2>
              <div className="space-y-3">
                <p className="flex items-center">
                  <CircleUserRound className="w-5 h-5 mr-3 text-primary" />
                  {client.firstName} {client.lastName}
                </p>

                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  {client.email}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary">ID Document</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderImage(frontImage, "Front Side")}
              {renderImage(backImage, "Back Side")}
            </div>
          </div>
        </div>

        {/* Remarks Input Section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Remarks</h2>
          <textarea
            className="textarea textarea-bordered w-full h-24 resize-none"
            placeholder="Enter your remarks here..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        <div className="flex justify-center space-x-6 mt-8 p-6 bg-base-200">
          <button
            className="btn btn-success text-white btn-lg transition-transform transform hover:scale-105"
            onClick={() => handleVerification("accepted")}
          >
            <UserCheck className="w-5 h-5 mr-2" /> Accept
          </button>
          <button
            className="border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white btn btn-lg transition-transform transform hover:scale-105"
            onClick={() => handleVerification("rejected")}
          >
            <UserX className="w-5 h-5 mr-2" /> Reject
          </button>
        </div>

        <AnimatePresence>
          {verificationStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 z-50"
            >
              <div
                className={`flex items-center p-4 rounded-lg shadow-lg ${
                  verificationStatus === "verified"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                <div className="flex-shrink-0">
                  {verificationStatus === "verified" ? (
                    <UserCheck className="w-6 h-6" />
                  ) : (
                    <UserX className="w-6 h-6" />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">
                    {verificationStatus === "verified"
                      ? "Client Accepted"
                      : "Client Rejected"}
                  </h3>
                  <p className="text-sm">
                    {verificationStatus === "verified"
                      ? "The client's identity has been successfully verified."
                      : "The client's identity has been rejected. Please review the information."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <motion.div
            className="bg-base-100 rounded-lg p-2 relative max-w-4xl mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn btn-circle btn-sm absolute top-2 right-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Client;
