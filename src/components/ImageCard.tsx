import React, { useState, useRef } from 'react';
import { Upload, Eye, X, Shield } from 'lucide-react';

interface ImageCardProps {
  title: string;
  description: string;
  index: number;
  onVerify?: (image: string, title: string) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ title, description, index, onVerify }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-ivory border border-warm-beige rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-charcoal mb-2">{title}</h3>
        <p className="text-warm-gray leading-relaxed">{description}</p>
      </div>

      <div className="space-y-4">
        {!uploadedImage ? (
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer ${
              isDragOver
                ? 'border-sage bg-sage/10 scale-105'
                : 'border-warm-beige hover:border-sage hover:bg-sage/5'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-8 h-8 mx-auto mb-3 text-sage" />
            <p className="text-warm-gray font-medium mb-1">Drop an image here</p>
            <p className="text-sm text-muted">or click to browse</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden bg-warm-beige/30 group">
              <img
                src={uploadedImage}
                alt="Uploaded preview"
                className="w-full h-32 object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4 text-charcoal" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowPreview(true)}
                className="bg-warm-beige hover:bg-warm-beige/80 text-charcoal py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={() => onVerify?.(uploadedImage, title)}
                className="bg-sage hover:bg-sage-dark text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Verify
              </button>
            </div>
          </div>
        )}
      </div>

      {showPreview && uploadedImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-4xl">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-12 right-0 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-charcoal" />
            </button>
            <img
              src={uploadedImage}
              alt="Full preview"
              className="max-w-full max-h-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};