import React from 'react';
import { useState } from 'react';
import { ImageCard } from './components/ImageCard';
import { VerificationScreen } from './components/VerificationScreen';
import { cardData } from './data/cardData';

function App() {
  const [verificationData, setVerificationData] = useState<{
    image: string;
    title: string;
  } | null>(null);

  const handleVerify = (image: string, title: string) => {
    setVerificationData({ image, title });
  };

  const handleBackToGallery = () => {
    setVerificationData(null);
  };

  if (verificationData) {
    return (
      <VerificationScreen
        image={verificationData.image}
        title={verificationData.title}
        onBack={handleBackToGallery}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-warm-white to-soft-beige">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 tracking-tight">
            AI Based Visual Inspection
          </h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed">
           Oneture's Al + GenAl-powered virtual inspection accelerators help automate the validation of components using high-resolution image and video analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <ImageCard
                title={card.title}
                description={card.description}
                index={index}
                onVerify={handleVerify}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-warm-beige">
            <div className="w-2 h-2 bg-sage rounded-full animate-pulse"></div>
            <span className="text-warm-gray font-medium">Ready to upload</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;