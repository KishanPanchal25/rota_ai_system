import { useState } from 'react';
import useStore from '../store/useStore';
import { 
  SparklesIcon, 
  UserGroupIcon, 
  ClockIcon, 
  TruckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

function CreateAssignment() {
  const { createAssignment, loading, error, clearError } = useStore();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);

  const samplePrompts = [
    "The patient P001 is required Exercise today can you assign available employee.",
    "Patient P002 needs medication assistance at 10:00 AM.",
    "Assign a nurse to patient P003 for medicine administration urgently.",
    "Patient P004 requires companionship service this afternoon.",
    "Find a carer for patient P005 who needs personal care assistance."
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      alert('Please enter a request');
      return;
    }

    try {
      clearError();
      setResult(null);
      const response = await createAssignment(prompt);
      setResult(response);
      setPrompt(''); // Clear prompt on success
    } catch (err) {
      console.error('Assignment failed:', err);
    }
  };

  const useSamplePrompt = (samplePrompt) => {
    setPrompt(samplePrompt);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mb-4">
          <SparklesIcon className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Assignment</h1>
        <p className="text-lg text-gray-600">Use AI to create optimal staff-patient assignments</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* AI Assistant Info */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">AI-Powered Assignment</h3>
              <p className="mt-2 text-sm text-gray-600">
                Use natural language to request employee assignments. The AI will analyze requirements
                and find the best match based on qualifications, location, language, and availability.
              </p>
            </div>
          </div>
        </div>

        {/* Assignment Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-semibold text-gray-700 mb-2">
                Assignment Request
              </label>
              <div className="relative">
                <textarea
                  id="prompt"
                  rows={4}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none"
                  placeholder="Describe your assignment request in natural language..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="absolute bottom-3 right-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <SparklesIcon className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className={`group relative px-8 py-3 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg ${
                  loading || !prompt.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="loading-spinner h-5 w-5 mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    Create Assignment
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Sample Prompts */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <LightBulbIcon className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Sample Requests</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {samplePrompts.map((sample, index) => (
              <button
                key={index}
                onClick={() => useSamplePrompt(sample)}
                className="w-full text-left p-4 text-sm text-gray-700 bg-gray-50 rounded-xl hover:bg-orange-50 hover:border-orange-200 border border-gray-200 transition-all duration-200 group"
              >
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="group-hover:text-orange-700 transition-colors duration-200">
                    "{sample}"
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-sm font-semibold text-red-800">Assignment Error</h3>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Result */}
        {result && result.success && result.assignment && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Assignment Created Successfully!</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <div className="flex items-center mb-2">
                    <UserGroupIcon className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-semibold text-gray-700">Employee Details</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{result.assignment.employee_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID:</span>
                      <span className="font-medium text-gray-900">{result.assignment.employee_id}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <div className="flex items-center mb-2">
                    <UserGroupIcon className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-semibold text-gray-700">Patient Details</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{result.assignment.patient_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID:</span>
                      <span className="font-medium text-gray-900">{result.assignment.patient_id}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <div className="flex items-center mb-2">
                    <ClockIcon className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-semibold text-gray-700">Schedule Details</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="font-medium text-gray-900 capitalize">{result.assignment.service_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Scheduled Time:</span>
                      <span className="font-medium text-gray-900">{result.assignment.assigned_time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-900">{result.assignment.estimated_duration} minutes</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <div className="flex items-center mb-2">
                    <TruckIcon className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-semibold text-gray-700">Travel & Priority</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travel Time:</span>
                      <span className="font-medium text-gray-900">{result.assignment.travel_time} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority Score:</span>
                      <span className="font-medium text-gray-900">{result.assignment.priority_score}/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-start">
                <SparklesIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-gray-700">Assignment Reason:</span>
                  <p className="mt-1 text-sm text-gray-600">{result.assignment.assignment_reason}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateAssignment;
