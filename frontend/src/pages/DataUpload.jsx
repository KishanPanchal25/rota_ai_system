import { useState } from 'react';
import useStore from '../store/useStore';
import { 
  CloudArrowUpIcon, 
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { CloudArrowUpIcon as CloudArrowUpIconSolid } from '@heroicons/react/24/solid';

function DataUpload() {
  const { uploadDataFile, uploadStatus, loading, error } = useStore();
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls')) {
        setFile(droppedFile);
      } else {
        alert('Please upload an Excel file (.xlsx or .xls)');
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    try {
      await uploadDataFile(file);
      setFile(null);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center slide-up">
        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 hover-lift glow">
          <CloudArrowUpIconSolid className="h-10 w-10 text-white" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <SparklesIcon className="h-3 w-3 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3">
          Upload Data
        </h1>
        <p className="text-xl text-gray-600 font-medium">Upload employee and patient data to get started</p>
        <div className="mt-4 inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200/50">
          <RocketLaunchIcon className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">Quick & Secure Upload</span>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 p-10 card-hover">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* File Upload Area */}
          <div
            className={`relative border-3 border-dashed rounded-3xl p-16 transition-all duration-500 ${
              dragActive 
                ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl scale-105' 
                : 'border-gray-300 hover:border-blue-300 hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-indigo-600/5 rounded-3xl"></div>
            <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-xl"></div>
            
            <div className="text-center">
              <div className="mx-auto h-20 w-20 mb-6">
                {file ? (
                  <div className="h-20 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl hover-lift">
                    <CheckCircleIcon className="h-10 w-10 text-white" />
                  </div>
                ) : (
                  <div className="h-20 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl hover-lift float">
                    <CloudArrowUpIcon className="h-10 w-10 text-white" />
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-2xl font-bold text-gray-900">
                    {file ? file.name : 'Drop your Excel file here or click to browse'}
                  </span>
                  <span className="mt-3 block text-lg text-gray-500 font-medium">
                    {file ? (
                      <span className="text-green-600 font-semibold">✓ File selected successfully</span>
                    ) : (
                      'Supports .xlsx and .xls files • Max size: 10MB'
                    )}
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".xlsx,.xls"
                    onChange={handleChange}
                  />
                </label>
              </div>
              
              {!file && (
                <div className="mt-8">
                  <ArrowDownTrayIcon className="mx-auto h-10 w-10 text-blue-400 animate-bounce" />
                  <p className="mt-2 text-sm text-gray-400 font-medium">Drag & drop or click to select</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={!file || loading}
              className={`group relative px-12 py-4 rounded-2xl text-white font-bold transition-all duration-300 shadow-xl ${
                !file || loading
                  ? 'bg-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105'
              }`}
            >
              {!loading && !file && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-400/20 to-blue-600/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></div>
              )}
              {loading ? (
                <div className="relative flex items-center">
                  <div className="loading-spinner h-6 w-6 mr-3"></div>
                  <span className="text-lg">Uploading...</span>
                </div>
              ) : (
                <div className="relative flex items-center">
                  <CloudArrowUpIcon className="h-6 w-6 mr-3" />
                  <span className="text-lg">Upload File</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-3xl p-8 shadow-lg slide-up">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mr-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-800">Upload Error</h3>
              <p className="text-red-600 mt-1 font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      {uploadStatus && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 shadow-lg slide-up">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mr-4">
              <CheckCircleIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-800">Upload Successful!</h3>
              <p className="text-green-600 mt-1 font-medium">{uploadStatus.message}</p>
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-200/50">
                  <p className="text-sm text-gray-500 font-semibold">Employees Loaded</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{uploadStatus.employees_count}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-200/50">
                  <p className="text-sm text-gray-500 font-semibold">Patients Loaded</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{uploadStatus.patients_count}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 border border-blue-200/50 shadow-lg card-hover">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
            <InformationCircleIcon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Upload Instructions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center text-sm font-bold mt-1 shadow-lg">
                1
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">Prepare Excel File</p>
                <p className="text-gray-600 mt-1">Ensure your file has two sheets: "EmployeeDetails" and "PatientDetails"</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center text-sm font-bold mt-1 shadow-lg">
                2
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">Upload File</p>
                <p className="text-gray-600 mt-1">Drag and drop or click to browse for your Excel file</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center text-sm font-bold mt-1 shadow-lg">
                3
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">Data Validation</p>
                <p className="text-gray-600 mt-1">The system will automatically validate and process your data</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center text-sm font-bold mt-1 shadow-lg">
                4
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">Start Using</p>
                <p className="text-gray-600 mt-1">Once uploaded, you can create assignments and manage your rota</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* File Requirements */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 card-hover">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-3">
            <DocumentTextIcon className="h-5 w-5 text-white" />
          </div>
          File Requirements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-lg">EmployeeDetails Sheet</h4>
            <ul className="text-gray-600 space-y-2">
              <li>• EmployeeID, Name, Address, PostCode</li>
              <li>• Gender, Ethnicity, Religion</li>
              <li>• TransportMode, Qualification</li>
              <li>• LanguageSpoken, CertificateExpiryDate</li>
              <li>• EarliestStart, LatestEnd, Shifts</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-lg">PatientDetails Sheet</h4>
            <ul className="text-gray-600 space-y-2">
              <li>• PatientID, PatientName, Address</li>
              <li>• Gender, Ethnicity, Religion</li>
              <li>• RequiredSupport, RequiredHoursOfSupport</li>
              <li>• Illness, RequiresMedication</li>
              <li>• EmergencyContact, LanguagePreference</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataUpload;
