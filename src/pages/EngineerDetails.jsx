import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  UserCheck,
  UserX,
  Mail,
  CircleUserRound,
  Image as ImageIcon,
} from "lucide-react";
import apiService from "../Api/AxiosServiceConfiguration";

const Engineer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const engineer = location.state.request;
  const [remarks, setRemarks] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);

  const images = {
    frontId: engineer.engineerId.verificationInfo.frontId,
    backId: engineer.engineerId.verificationInfo.backId,
    militaryCert: engineer.engineerId.verificationInfo.militaryCert,
    graduationCert: engineer.engineerId.verificationInfo.graduationCert,
    unionCard: engineer.engineerId.verificationInfo.unionCard,
  };

  const handleVerification = async (status) => {
    const id = engineer._id;
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

  const imageLabels = {
    frontId: "Front ID",
    backId: "Back ID",
    militaryCert: "Military Certificate",
    graduationCert: "Graduation Certificate",
    unionCard: "Union Card",
  };

  const openModal = useCallback((image) => {
    if (image) {
      setSelectedImage(image);
      setIsOpen(true);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedImage("");
  }, []);

  const renderImage = useCallback(
    (key) => {
      const imageUrl = images[key];
      return (
        <div key={key} className="flex-1 mx-2">
          <p className="text-sm text-base-content mb-2">{imageLabels[key]}</p>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageLabels[key]}
              className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
              onClick={() => openModal(imageUrl)}
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
      );
    },
    [images, openModal]
  );

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-base-100 flex items-center justify-center p-6">
      <motion.div
        className="max-w-6xl w-full bg-base-100 rounded-2xl shadow-xl overflow-hidden"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        {/* Personal Information Section */}
        <div className="bg-primary text-primary-content px-10 py-2">
          <h1 className="text-3xl font-bold">Engineer Details</h1>
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
                  {engineer.firstName} {engineer.lastName}
                </p>

                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  {engineer.email}
                </p>
              </div>
            </div>
          </div>

          {/* ID Document Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              ID Document
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {renderImage("frontId")}
              {renderImage("backId")}
            </div>
          </div>
        </div>

        {/* Additional Documents Section */}
        <div className="w-full p-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Additional Documents
          </h2>
          <div className="flex justify-between">
            {renderImage("militaryCert")}
            {renderImage("graduationCert")}
            {renderImage("unionCard")}
          </div>
        </div>

        {/* Remarks Input Section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Remarks</h2>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter your remarks here..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        {/* Verification Buttons */}
        <div className="flex justify-center space-x-6 mt-8 p-6 bg-base-200">
          <button
            className="btn btn-success text-white btn-lg"
            onClick={() => handleVerification("accepted")}
          >
            <UserCheck className="w-5 h-5 mr-2" />
            Accept
          </button>
          <button
            className="border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white btn btn-lg"
            onClick={() => handleVerification("rejected")}
          >
            <UserX className="w-5 h-5 mr-2" />
            Reject
          </button>
        </div>

        {/* Verification Status Alert */}
        <AnimatePresence>
          {verificationStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6"
            >
              <div
                className={`alert ${
                  verificationStatus === "verified"
                    ? "alert-success"
                    : "alert-error"
                }`}
              >
                <div>
                  <h3 className="font-bold">
                    {verificationStatus === "verified"
                      ? "Engineer Accepted"
                      : "Engineer Rejected"}
                  </h3>
                  <div className="text-xs">
                    {verificationStatus === "verified"
                      ? "The engineer's identity has been successfully verified."
                      : "The engineer's identity has been rejected. Please review the information."}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Image Modal */}
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

export default Engineer;
