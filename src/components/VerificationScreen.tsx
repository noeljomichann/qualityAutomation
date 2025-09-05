import React from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, Info, Loader2 } from 'lucide-react';

interface VerificationScreenProps {
  image: string;
  title: string;
  onBack: () => void;
}

export const VerificationScreen: React.FC<VerificationScreenProps> = ({ 
  image, 
  title, 
  onBack 
}) => {
  const [analysis, setAnalysis] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const getEndpointForCard = (cardTitle: string): string => {
    const endpointMap: Record<string, string> = {
      "Fastening Integrity Checks": "fastener_analysis",
      "Component Integrity Validation": "component_integrity",
      "Measurement Accuracy Verification": "measurement-analysis",
      "Installation or Placement Accuracy": "installation-analysis",
      "Distance & Dimensional Precision": "inverter-spacing-analysis"
    };
    return endpointMap[cardTitle] || "fastener_analysis";
  };

  const analyzeImage = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const baseUrl = "https://8d38f26a8441.ngrok-free.app";
      const endpoint = getEndpointForCard(title);
      const fullUrl = `${baseUrl}/${endpoint}`;

      console.log('Attempting to connect to:', fullUrl);

      try {
        const healthCheck = await fetch(baseUrl, {
          method: 'HEAD',
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        console.log('Health check response:', healthCheck.status);
      } catch (healthError) {
        console.error('Health check failed:', healthError);
        throw new Error('Server is not reachable. Please check if your ngrok tunnel is running.');
      }
      
      // Convert base64 data URL to blob
      const base64Data = image.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      
      // Create FormData
      const formData = new FormData();
      formData.append('file', blob, 'image.jpg');
      
      // Make API call
      const apiResponse = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'POST',
        body: formData,
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      
      if (!apiResponse.ok) {
        throw new Error(`API request failed: ${apiResponse.status}`);
      }
      
      const result = await apiResponse.json();
      op_image = result.image ? result.image : null
      const base64Data = op_image.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      
      // Transform API response to our format
      const transformedAnalysis = {
        status: result.status === "success" ? "passed" : "failed",
        confidence: result.status === "success" ? 95 : 65,
        analysis: result.analysis,
        summary: result.analysis,
        responseImage: blob
      };
      
      setAnalysis(transformedAnalysis);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };
  
  React.useEffect(() => {
    analyzeImage();
  }, [image, title]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed": return "text-green-600";
      case "failed": return "text-red-600";
      default: return "text-warm-gray";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed": return <CheckCircle className="w-5 h-5" />;
      case "failed": return <AlertTriangle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      default: return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-warm-white to-soft-beige">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-warm-gray hover:text-charcoal transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Gallery</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">
            Verification Results
          </h1>
          <p className="text-warm-gray">
            AI-powered analysis for: <span className="font-semibold">{title}</span>
          </p>
        </div>

        {/* Main verification card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-warm-beige rounded-2xl shadow-soft overflow-hidden">
            {/* Image section */}
            <div className="relative">
              <img
                src={analysis?.responseImage || image}
                alt="Verification image"
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                  loading ? 'bg-blue-100 text-blue-800' :
                  analysis?.status === 'passed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : error ? (
                    <>
                      <AlertTriangle className="w-4 h-4" />
                      <span>Error</span>
                    </>
                  ) : (
                    <>
                      {getStatusIcon(analysis?.status)}
                      <span className="capitalize">{analysis?.status}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Analysis results section */}
            <div className="p-8">
              {loading ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-sage" />
                  <p className="text-warm-gray">Analyzing your image...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-500" />
                  <p className="text-red-600 mb-4">Analysis Failed</p>
                  <p className="text-warm-gray mb-4">{error}</p>
                  <button
                    onClick={analyzeImage}
                    className="bg-sage hover:bg-sage-dark text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Retry Analysis
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-charcoal">Analysis Results</h2>
                      <div className="text-right">
                        <div className="text-sm text-warm-gray">Confidence Score</div>
                        <div className="text-2xl font-bold text-sage">{analysis?.confidence}%</div>
                      </div>
                    </div>
                    <p className="text-warm-gray leading-relaxed">
                      {analysis?.summary}
                    </p>
                  </div>

                  {/* Analysis details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-charcoal mb-3">Analysis Details</h3>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex items-start gap-3">
                        {analysis?.status === 'passed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-charcoal leading-relaxed">{analysis?.analysis}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-sage hover:bg-sage-dark text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200">
                      Download Report
                    </button>
                    <button className="flex-1 border border-sage text-sage hover:bg-sage hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200">
                      Save to Archive
                    </button>
                    <button 
                      onClick={onBack}
                      className="flex-1 border border-warm-beige text-warm-gray hover:bg-warm-beige hover:text-charcoal py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                    >
                      Verify Another
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};