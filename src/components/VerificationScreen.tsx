import React from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, Info } from 'lucide-react';

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
  // Simulate AI analysis results based on the card type
  const getAnalysisResults = (cardTitle: string) => {
    const analysisMap: Record<string, any> = {
      "Fastening Integrity Checks": {
        status: "passed",
        confidence: 94,
        findings: [
          { type: "success", text: "All bolts properly tightened to specification" },
          { type: "success", text: "No visible wear or corrosion detected" },
          { type: "warning", text: "Minor surface scratches observed (within tolerance)" }
        ],
        summary: "Component fastening meets safety standards with 94% confidence."
      },
      "Component Integrity Validation": {
        status: "passed",
        confidence: 98,
        findings: [
          { type: "success", text: "Genuine OEM component verified" },
          { type: "success", text: "Serial number matches database records" },
          { type: "success", text: "Material composition within specifications" }
        ],
        summary: "Component authenticity and integrity confirmed with high confidence."
      },
      "Measurement Accuracy Verification": {
        status: "attention",
        confidence: 87,
        findings: [
          { type: "success", text: "Primary measurements within tolerance" },
          { type: "warning", text: "Edge measurement slightly below optimal range" },
          { type: "info", text: "Recommend re-measurement for critical applications" }
        ],
        summary: "Measurements mostly accurate, minor attention required for edge cases."
      },
      "Installation or Placement Accuracy": {
        status: "passed",
        confidence: 96,
        findings: [
          { type: "success", text: "Perfect alignment detected" },
          { type: "success", text: "Proper clearance maintained" },
          { type: "success", text: "Installation follows manufacturer guidelines" }
        ],
        summary: "Installation completed with excellent precision and adherence to standards."
      },
      "Distance & Dimensional Precision": {
        status: "passed",
        confidence: 92,
        findings: [
          { type: "success", text: "Dimensional accuracy within 0.1mm tolerance" },
          { type: "success", text: "Spacing consistency verified across all points" },
          { type: "info", text: "Measurements logged for quality tracking" }
        ],
        summary: "Dimensional precision meets engineering specifications with high accuracy."
      }
    };

    return analysisMap[cardTitle] || analysisMap["Component Integrity Validation"];
  };

  const analysis = getAnalysisResults(title);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed": return "text-green-600";
      case "attention": return "text-amber-600";
      case "failed": return "text-red-600";
      default: return "text-warm-gray";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed": return <CheckCircle className="w-5 h-5" />;
      case "attention": return <AlertTriangle className="w-5 h-5" />;
      case "failed": return <AlertTriangle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case "info": return <Info className="w-4 h-4 text-blue-600" />;
      default: return <Info className="w-4 h-4 text-warm-gray" />;
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
                src={image}
                alt="Verification image"
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                  analysis.status === 'passed' 
                    ? 'bg-green-100 text-green-800' 
                    : analysis.status === 'attention'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {getStatusIcon(analysis.status)}
                  <span className="capitalize">{analysis.status}</span>
                </div>
              </div>
            </div>

            {/* Analysis results section */}
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-charcoal">Analysis Results</h2>
                  <div className="text-right">
                    <div className="text-sm text-warm-gray">Confidence Score</div>
                    <div className="text-2xl font-bold text-sage">{analysis.confidence}%</div>
                  </div>
                </div>
                <p className="text-warm-gray leading-relaxed">
                  {analysis.summary}
                </p>
              </div>

              {/* Detailed findings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-charcoal mb-3">Detailed Findings</h3>
                <div className="space-y-3">
                  {analysis.findings.map((finding: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      {getIconForType(finding.type)}
                      <p className="text-charcoal flex-1">{finding.text}</p>
                    </div>
                  ))}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};