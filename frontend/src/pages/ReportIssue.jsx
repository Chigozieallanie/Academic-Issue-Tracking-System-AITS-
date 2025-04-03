import Button from "../components/ui/Button";
import Form from "../components/ui/Form";
import { useState } from "react";
import axios from 'axios';

function ReportIssue() {
  // Define categories based on your Django model
  const CATEGORY_CHOICES = [
    { value: 'academic', label: 'Academic' },
    { value: 'administrative', label: 'Administrative' },
    { value: 'technical', label: 'Technical' },
    { value: 'other', label: 'Other' },
  ];

  const [formData, setFormData] = useState({
    category: "academic", // Set default value to match your model
    coursecode: "",
    description: "",
    lecturer: "",
  });
  
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReportIssue = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setMessage({ text: "", type: "" });

    // Validation
    if (!formData.description.trim()) {
      setMessage({ text: "Description is required", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Form data being submitted:", formData);
      if (selectedDocument) {
        console.log("Including document:", selectedDocument.name);
      }

      let response;
      const config = {
        headers: {
          'Content-Type': selectedDocument ? 'multipart/form-data' : 'application/json'
        },
        validateStatus: function (status) {
          return status < 500;
        }
      };

      if (selectedDocument) {
        const formDataObj = new FormData();
        formDataObj.append('category', formData.category);
        formDataObj.append('coursecode', formData.coursecode);
        formDataObj.append('description', formData.description);
        formDataObj.append('lecturer', formData.lecturer);
        formDataObj.append('document', selectedDocument);

        console.log("FormData contents:");
        for (let [key, value] of formDataObj.entries()) {
          console.log(key, value);
        }

        response = await axios.post(
          'http://localhost:8000/api/issues/', 
          formDataObj, 
          config
        );
      } else {
        response = await axios.post(
          'http://localhost:8000/api/issues/', 
          formData, 
          config
        );
      }

      console.log("API Response:", response);

      if (response.status >= 200 && response.status < 300) {
        setMessage({ 
          text: "Issue reported successfully!", 
          type: "success" 
        });
        // Reset form (keeping the default category)
        setFormData({
          category: "academic",
          coursecode: "",
          description: "",
          lecturer: "",
        });
        setSelectedDocument(null);
      } else {
        throw new Error(
          response.data?.message || 
          `Request failed with status ${response.status}`
        );
      }
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });

      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         error.message || 
                         "Failed to report issue. Please try again.";

      setMessage({ 
        text: errorMessage, 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  function handleDocumentChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ 
          text: "File size too large (max 5MB)", 
          type: "error" 
        });
        e.target.value = '';
        return;
      }
      setSelectedDocument(file);
      setMessage({ text: "", type: "" });
    }
  }

  return (
    <div className="issue-container">
      <Form onSubmit={handleReportIssue}>
        <h2>Report an Issue</h2>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
            {message.type === 'error' && (
              <button 
                onClick={() => setMessage({ text: "", type: "" })}
                className="close-message"
              >
                ×
              </button>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="category">Issue Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {CATEGORY_CHOICES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="coursecode">Course Code:</label>
          <input 
            type="text" 
            id="coursecode"
            name="coursecode"
            value={formData.coursecode} 
            onChange={handleChange} 
            placeholder="Enter course code"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lecturer">Lecturer:</label>
          <input 
            type="text" 
            id="lecturer"
            name="lecturer"
            value={formData.lecturer} 
            onChange={handleChange} 
            placeholder="Enter lecturer's name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (required):</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your issue..."
            value={formData.description}
            onChange={handleChange}
            maxLength={200}
            required
            rows={5}
          />
          <div className="char-count">
            {formData.description.length}/200 characters
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="document">Attach Document (optional, max 5MB):</label>
          <input 
            type="file" 
            id="document"
            onChange={handleDocumentChange} 
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" 
          />
          {selectedDocument && (
            <div className="file-info">
              <p>Document attached: {selectedDocument.name}</p>
              <button 
                type="button" 
                onClick={() => {
                  setSelectedDocument(null);
                  document.getElementById('document').value = '';
                }}
                className="remove-file"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            "Submit Issue"
          )}
        </Button>
      </Form>
    </div>
  );
}

export default ReportIssue;
