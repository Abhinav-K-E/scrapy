import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./ScrapifyPage.scss";
import Loader from "../../components/Loader/Loader";
import fetchAxios from "../../fetchAxios/fetchAxios";
import { useNavigate } from "react-router-dom";
import { uploadToFirebase } from "../../utils/uploadData";

import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { uploadDataToMarket } from "../../utils/uploadDataToMarket";
import SEARCHGIF from "../../assets/search.gif";

const ImageUpload = () => {
  const { uid } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [uploadDetail, setUploadDetail] = useState(null);
  const [loader, setLoader] = useState(false);
  const [imgId, setImg] = useState(null);
  const [creativeData, setCreativeData] = useState(null);
  const [videoLinks, setVideoLinks] = useState(null);
  const [searchLoader, setSearchLoader] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState({
    title: "",
    desc: "",
    attributes: [],
  });
  const [editingAttributeIndex, setEditingAttributeIndex] = useState(-1);
  const [newAttribute, setNewAttribute] = useState("");

  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);

    // Set preview URL using URL.createObjectURL for preview purposes
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onloadend = () => setPreviewUrl(reader.result);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select an image");
      return;
    }

    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      console.log(selectedFile);
      setSelectedFile(formData); // setting formadata for repurse use
      const response = await fetchAxios.post("/scrapify", formData, {
        headers: {},
      });
      console.log(response);
      setUploadDetail(response.data);
      setUploadStatus(true);
      const downloadURL = await uploadToFirebase(
        uid,
        selectedFile,
        response.data
      );
      setImg(downloadURL);
      setLoader(false);

      // Initialize the edit content with the response data
      setEditedContent({
        title: response.data.title,
        desc: response.data.desc,
        attributes: [...response.data.attributes],
      });
    } catch (error) {
      console.error(error);
      setUploadStatus(false);
      setLoader(false);
      setTimeout(() => {
        toast.error("Invalid Image format 🙁");
      }, 500);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  //sell
  const handleSell = async () => {
    try {
      // If user has edited the content, use the edited version
      const dataToUpload = isEditing
        ? {
            ...uploadDetail,
            title: editedContent.title,
            desc: editedContent.desc,
            attributes: editedContent.attributes,
          }
        : uploadDetail;

      const data = await uploadDataToMarket(uid, imgId, dataToUpload);
      if (data != null) {
        console.log("scrap uploadeddd");
        toast.success("Scrap Added Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePopUp = () => {
    toast.success("Successfully uploaded!");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const makeCreative = async () => {
    //getting data
    setSearchLoader(true);
    const res = await fetchAxios.post(`/repurpose`, selectedFile);
    setCreativeData(res.data.ideas);
    setVideoLinks(res.data.videoTutorials);
    setSearchLoader(false);
    console.log(res);
  };

  // Edit functionality
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUploadDetail({
        ...uploadDetail,
        title: editedContent.title,
        desc: editedContent.desc,
        attributes: editedContent.attributes,
      });
      toast.success("Changes saved successfully!");
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e, field) => {
    setEditedContent({
      ...editedContent,
      [field]: e.target.value,
    });
  };

  const handleAttributeChange = (index, value) => {
    const updatedAttributes = [...editedContent.attributes];
    updatedAttributes[index] = value;
    setEditedContent({
      ...editedContent,
      attributes: updatedAttributes,
    });
  };

  const handleAttributeDelete = (index) => {
    const updatedAttributes = editedContent.attributes.filter(
      (_, i) => i !== index
    );
    setEditedContent({
      ...editedContent,
      attributes: updatedAttributes,
    });
  };

  const handleAddAttribute = () => {
    if (newAttribute.trim()) {
      setEditedContent({
        ...editedContent,
        attributes: [...editedContent.attributes, newAttribute],
      });
      setNewAttribute("");
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <div className="scrapify-page">
      <Toaster position="top-center" />
      <div className="upload-grid">
        <div className="left-grid">
          <div {...getRootProps()} className="upload-sec">
            <input {...getInputProps()} accept="image/*" />
            {selectedFile ? (
              <img
                className="img-preview"
                src={previewUrl}
                alt="Selected image preview"
              />
            ) : (
              <div className="upload-txt">Drag & Drop</div>
            )}
          </div>
          {uploadStatus == false && (
            <button className="upload-btn" onClick={handleSubmit}>
              Upload Image
            </button>
          )}
        </div>

        {uploadDetail != null && (
          <div className="right-grid">
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={editedContent.title}
                    onChange={(e) => handleInputChange(e, "title")}
                    className="edit-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    value={editedContent.desc}
                    onChange={(e) => handleInputChange(e, "desc")}
                    className="edit-textarea"
                    rows="4"
                  />
                </div>
                <div className="form-group">
                  <label>Attributes:</label>
                  <div className="attributes-edit-list">
                    {editedContent.attributes.map((attr, index) => (
                      <div key={index} className="attribute-edit-item">
                        <input
                          type="text"
                          value={attr}
                          onChange={(e) =>
                            handleAttributeChange(index, e.target.value)
                          }
                          className="attribute-input"
                        />
                        <button
                          className="delete-attribute-btn"
                          onClick={() => handleAttributeDelete(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <div className="add-attribute">
                      <input
                        type="text"
                        value={newAttribute}
                        onChange={(e) => setNewAttribute(e.target.value)}
                        placeholder="Add new attribute"
                        className="attribute-input"
                      />
                      <button
                        className="delete-attribute-btn"
                        onClick={handleAddAttribute}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="u-img-name">{uploadDetail?.title}</div>
                <div className="u-img-desc">{uploadDetail?.desc}</div>
                <div className="u-img-head">Attributes</div>
                <div className="attributes">
                  {uploadDetail?.attributes?.map((item, index) => (
                    <div className="attribute" key={index}>
                      {item}
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="content-header">
              {/* {isEditing && <h3>AI Analysis</h3>} */}
              <button
                className={`edit-btn ${isEditing ? "active" : ""}`}
                onClick={handleEditToggle}
              >
                {isEditing ? "Save" : "Edit Details"}
              </button>
            </div>

            <div className="u-img-head">Analytics</div>
            <div className="tabs">
              <div className="tab yellow">
                <svg
                  width={24}
                  height={24}
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16.75c-.4 0-.8-.03-1.18-.1-2.12-.31-4.05-1.53-5.27-3.34A7.767 7.767 0 014.25 9c0-4.27 3.48-7.75 7.75-7.75S19.75 4.73 19.75 9c0 1.54-.45 3.03-1.3 4.31a7.8 7.8 0 01-5.3 3.35c-.35.06-.75.09-1.15.09zm0-14c-3.45 0-6.25 2.8-6.25 6.25 0 1.25.36 2.45 1.04 3.47a6.254 6.254 0 004.26 2.69c.64.11 1.27.11 1.86 0 1.75-.25 3.3-1.24 4.29-2.7a6.232 6.232 0 001.04-3.47c.01-3.44-2.79-6.24-6.24-6.24z"
                    fill=""
                  />
                  <path
                    d="M6.47 22.59c-.14 0-.27-.02-.41-.05-.65-.15-1.15-.65-1.3-1.3l-.35-1.47a.261.261 0 00-.19-.19l-1.65-.39a1.74 1.74 0 01-1.28-1.22c-.17-.61 0-1.27.45-1.72l3.9-3.9c.16-.16.38-.24.6-.22.22.02.42.14.55.33.99 1.46 2.54 2.45 4.27 2.7.64.11 1.27.11 1.86 0 1.75-.25 3.3-1.24 4.29-2.7.12-.19.33-.31.55-.33.22-.02.44.06.6.22l3.9 3.9c.45.45.62 1.11.45 1.72a1.74 1.74 0 01-1.28 1.22l-1.65.39c-.09.02-.16.09-.19.19l-.35 1.47c-.15.65-.65 1.15-1.3 1.3-.65.16-1.32-.07-1.74-.58L12 17.13l-4.2 4.84c-.34.4-.82.62-1.33.62zm-.38-8.56L2.8 17.32c-.09.09-.08.19-.06.25.01.05.06.15.18.17l1.65.39c.65.15 1.15.65 1.3 1.3l.35 1.47c.03.13.13.17.19.19.06.01.16.02.25-.08l3.83-4.41a7.768 7.768 0 01-4.4-2.57zm7.42 2.56l3.83 4.4c.09.11.2.11.26.09.06-.01.15-.06.19-.19l.35-1.47c.15-.65.65-1.15 1.3-1.3l1.65-.39c.12-.03.17-.12.18-.17.02-.05.03-.16-.06-.25l-3.29-3.29a7.793 7.793 0 01-4.41 2.57z"
                    fill=""
                  />
                  <path
                    d="M13.89 12.89c-.26 0-.57-.07-.94-.29l-.95-.57-.95.56c-.87.52-1.44.22-1.65.07-.21-.15-.66-.6-.43-1.59l.24-1.03-.8-.74c-.44-.44-.6-.97-.45-1.45.15-.48.59-.82 1.21-.92l1.07-.18.51-1.12c.29-.57.74-.89 1.25-.89s.97.33 1.25.9l.59 1.18.99.12c.61.1 1.05.44 1.21.92.15.48-.01 1.01-.45 1.45l-.83.83.26.93c.23.99-.22 1.44-.43 1.59-.11.09-.35.23-.7.23zm-4.28-4.5l.69.69c.32.32.48.86.38 1.3l-.19.8.8-.47c.43-.25 1.01-.25 1.43 0l.8.47-.18-.8c-.1-.45.05-.98.37-1.3l.69-.69-.87-.15c-.42-.07-.84-.38-1.03-.76L12 6.5l-.5 1c-.18.37-.6.69-1.02.76l-.87.13z"
                    fill=""
                  />
                </svg>
                Quality Score : {uploadDetail?.quality_score} %
              </div>
              <div className="tab blue">
                <svg
                  width={24}
                  height={24}
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.62 13.07c-.38 0-.7-.29-.75-.67a7.834 7.834 0 00-3.34-5.61.752.752 0 01-.19-1.04c.24-.34.71-.42 1.04-.19a9.335 9.335 0 013.97 6.68c.04.41-.25.78-.67.83h-.06zM3.49 13.12h-.08a.766.766 0 01-.67-.83c.27-2.69 1.7-5.12 3.91-6.69a.753.753 0 11.87 1.23 7.847 7.847 0 00-3.29 5.62.74.74 0 01-.74.67zM12.06 22.61c-1.48 0-2.89-.34-4.21-1a.75.75 0 01-.33-1.01.75.75 0 011.01-.33 7.904 7.904 0 006.94.06c.37-.18.82-.02 1 .35.18.37.02.82-.35 1-1.28.62-2.64.93-4.06.93zM12.06 8.44a3.53 3.53 0 11-.001-7.059 3.53 3.53 0 01.001 7.059zm0-5.55c-1.12 0-2.03.91-2.03 2.03 0 1.12.91 2.03 2.03 2.03 1.12 0 2.03-.91 2.03-2.03 0-1.12-.92-2.03-2.03-2.03zM4.83 20.67a3.53 3.53 0 11-.001-7.059 3.53 3.53 0 01.001 7.059zm0-5.56c-1.12 0-2.03.91-2.03 2.03 0 1.12.91 2.03 2.03 2.03 1.12 0 2.03-.91 2.03-2.03 0-1.12-.91-2.03-2.03-2.03zM19.17 20.67a3.53 3.53 0 113.53-3.53c-.01 1.94-1.59 3.53-3.53 3.53zm0-5.56c-1.12 0-2.03.91-2.03 2.03 0 1.12.91 2.03 2.03 2.03 1.12 0 2.03-.91 2.03-2.03a2.038 2.038 0 00-2.03-2.03z"
                    fill=""
                  />
                </svg>
                Recyclability Score : {uploadDetail?.recyclability_score} %
              </div>
              <div className="tab green">
                <div className="rupee">₹</div>
                EST Value : {uploadDetail?.price}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* if there is data */}
      {uploadDetail != null && (
        <div className="creative-box">
          <div className="creative-left" onClick={() => makeCreative()}>
            Make it creative
          </div>
          <div className="creative-right">
            {searchLoader && (
              <div className="search-loader">
                <img src={SEARCHGIF} alt="" />
              </div>
            )}

            {creativeData?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            {videoLinks?.map((item, index) => (
              <li key={index}>
                <a href={item?.url} target="_blank">
                  {item?.url}
                </a>
              </li>
            ))}
          </div>
        </div>
      )}

      {/* new  */}
      {uploadDetail != null && (
        <div className="tab-container">
          <div className="tab-selctor" onClick={() => handleSell()}>
            Sell now
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
