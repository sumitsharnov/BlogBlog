import { useState } from "react";
import { downloadCfts } from "../services/home_api";

export const useCertificateDownload = (token, cftList) => {
  const [downloading, setDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorDownloading, setErrorDownloading] = useState(null);
  const [downloadingFilesModal, setDownloadingFilesModal] = useState(false);
  const [selectedCft, setSelectedCft] = useState("All");
 
  const handleDownload = async () => {
    console.log("Sumit");
    setDownloading(true);
    setShowModal(true);
    setDownloadSuccess(false);
    setErrorDownloading(null);
    document.body.style.overflow = "hidden";
  };
  
  const handleDownloadModal = async () => {
    console.log("Amit");
    setDownloadCount((prev) => prev + 1);
    try {
      setDownloadingFilesModal(true);
      const cft = cftList.find((c) => c.name === selectedCft);
      await downloadCfts(cft, token);
      setDownloadSuccess(true);
      document.body.style.overflow = "auto";
    } catch (e) {
      document.body.style.overflow = "auto";
      setErrorDownloading(e.message);
    }
    document.body.style.overflow = "auto";
    setShowModal(false);
    setDownloading(false);
    setDownloadingFilesModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDownloading(false);
  };

  const handleOptionChange = (event) => {
    setSelectedCft(event.target.value);
  };

  return {
    handleDownload,
    handleDownloadModal,
    handleCloseModal,
    handleOptionChange,
    downloading,
    showModal,
    downloadCount,
    downloadSuccess,
    errorDownloading,
    downloadingFilesModal,
    selectedCft,
  };
};
