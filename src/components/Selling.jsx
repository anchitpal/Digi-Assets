import React, { useState } from 'react';
import Layout from '../Layout/Layout';
const FormField = ({ label, name, placeholder, value, onChange, type = 'text', options, isRequired = false, isFullWidth = false, currencySymbol }) => {
  const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const containerClass = isFullWidth ? 'md:col-span-2' : '';
  
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows="4"
            className={inputClass}
            required={isRequired}
          ></textarea>
        );
      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClass}
            required={isRequired}
          >
            <option value="" disabled>Select category</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'price':
        return (
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">{currencySymbol}</span>
            <input
              type="text"
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`pl-8 ${inputClass}`}
              required={isRequired}
            />
          </div>
        );
      case 'text':
      default:
        return (
          <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClass}
            required={isRequired}
          />
        );
    }
  };

  return (
    <div className={containerClass}>
      <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
        {label}{isRequired && '*'}
      </label>
      {renderInput()}
    </div>
  );
};

// Toggle switch component for cleaner code
const ToggleSwitch = ({ label, description, isChecked, onToggle, disabled = false }) => (
  <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${disabled ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-800'}`}>
    <div className="flex-1">
      <h3 className={`font-semibold ${disabled ? 'text-gray-400' : 'text-gray-800'}`}>{label}</h3>
      <p className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
    </div>
    <div
      className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${isChecked && !disabled ? 'bg-blue-500' : 'bg-gray-200'}`}
      onClick={!disabled ? onToggle : null}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isChecked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </div>
  </div>
);


const Upload = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    tags: '',
  });
  const [personalUse, setPersonalUse] = useState(false);
  const [commercialUse, setCommercialUse] = useState(false);
  const [exclusiveRights, setExclusiveRights] = useState(false);

  const categories = [
    "Digital Art",
    "Music & Audio",
    "eBooks",
    "Design Assets",
    "NFTs"
  ];
  
  // Handlers for file upload
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handlers for licensing toggles
  const handlePersonalUseToggle = () => setPersonalUse(!personalUse);
  const handleCommercialUseToggle = () => setCommercialUse(!commercialUse);
  const handleExclusiveRightsToggle = () => setExclusiveRights(!exclusiveRights);

  return (
    <div className="font-sans">
      <Layout>
      <section className='bg-gradient-to-tr from-violet-600 via-blue-500 to-pink-400 w-full h-64 flex flex-col items-center justify-center text-white gap-5'>
        <h1 className='font-bold text-5xl'>Upload Your Digital Assets</h1>
        <p className='text-xl'>Share your creativity with the world and start earning from your digital creations</p>
      </section>
      
      <div className="container mx-auto p-4 md:p-8">
        {/* Upload Component */}
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto mb-8">
          <div className="flex items-center text-gray-800 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M12 12v9" />
              <path d="m16 16-4 4-4-4" />
            </svg>
            <h2 className="text-xl font-semibold">Upload Files</h2>
          </div>

          <div
            className={`border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} border-dashed rounded-lg p-10 text-center transition-colors duration-200`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m16 16-4 4-4-4" />
              </svg>
              <p className="text-gray-700 font-medium">Drag and drop your files here</p>
              <p className="text-gray-500 text-sm">or click to select files from your computer</p>
              <label htmlFor="file-input" className="mt-4 px-6 py-2 bg-white text-gray-800 font-semibold border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
                Select Files
              </label>
              <input id="file-input" type="file" multiple className="hidden" onChange={handleFileChange} />
            </div>
          </div>
          <div className="mt-4 text-center text-gray-500 text-sm">
            <p>Supported formats: Images, Audio, PDF, Documents (Max 100MB per file)</p>
          </div>
          {files.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Selected Files:</h3>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200 flex items-center justify-between">
                    <span className="text-gray-800 truncate">{file.name}</span>
                    <span className="text-gray-500 text-sm">{Math.round(file.size / 1024)} KB</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Asset Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Title" name="title" placeholder="Enter asset title" value={formData.title} onChange={handleChange} isRequired />
            <FormField label="Category" name="category" type="select" options={categories} value={formData.category} onChange={handleChange} isRequired />
            <FormField label="Description" name="description" type="textarea" placeholder="Describe your asset..." value={formData.description} onChange={handleChange} isRequired isFullWidth />
            <FormField label="Price (USD)" name="price" type="price" currencySymbol="$" placeholder="0.00" value={formData.price} onChange={handleChange} isRequired />
            <FormField label="Tags (comma separated)" name="tags" placeholder="art, digital, creative, design..." value={formData.tags} onChange={handleChange} />
          </div>
        </div>

        {/* Licensing & Usage Rights Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Licensing & Usage Rights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <ToggleSwitch label="Personal Use" description="Allow personal, non-commercial use" isChecked={personalUse} onToggle={handlePersonalUseToggle} />
            <ToggleSwitch label="Commercial Use" description="Allow commercial use in projects" isChecked={commercialUse} onToggle={handleCommercialUseToggle} />
          </div>
          <div className="mb-6">
            <ToggleSwitch label="Exclusive Rights" description="Grant exclusive usage rights to the buyer" isChecked={exclusiveRights} onToggle={handleExclusiveRightsToggle} />
            {exclusiveRights && (
              <p className="mt-2 text-sm text-blue-600 font-medium">Premium Option</p>
            )}
          </div>
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-start text-gray-500 mb-4 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              By uploading, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and confirm you own the rights to this content.
            </div>
            <div className="flex justify-end space-x-4">
              <button className="px-6 py-2 border border-gray-300 text-gray-800 rounded-md font-semibold hover:bg-gray-50 transition-colors">
                Save Draft
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white rounded-md font-semibold hover:from-violet-700 hover:to-blue-600 transition-colors shadow-md flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>Publish Asset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    </div>
  );
};

export default Upload;
