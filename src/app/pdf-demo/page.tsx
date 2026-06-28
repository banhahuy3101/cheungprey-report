'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { pdf } from '@react-pdf/renderer';
import { MyDocument } from './MyDocument';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false },
);

export default function PDFDemoPage() {
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');

  const handleServerGenerate = async () => {
    setGenerating(true);
    setMessage('');
    
    try {
      const blob = await pdf(<MyDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'example.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setMessage('PDF generated successfully!');
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          react-pdf Demo
        </h1>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('Error') 
              ? 'bg-red-50 border border-red-200 text-red-800' 
              : 'bg-green-50 border border-green-200 text-green-800'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Interactive PDF Document</h2>
          <p className="text-gray-600 mb-4">
            This is a simple PDF document created with react-pdf using React primitives.
            Click the button below to download it.
          </p>
          
          <div className="flex gap-4">
            <PDFDownloadLink 
              document={<MyDocument />} 
              fileName="example.pdf"
              className="flex-1 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 text-center no-underline"
            >
              {({ loading }) =>
                loading ? 'Preparing document...' : '📥 Download PDF'
              }
            </PDFDownloadLink>

            <button
              onClick={handleServerGenerate}
              disabled={generating}
              className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {generating ? 'Generating...' : '⚡ Generate with Blob'}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Features Demonstrated:</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>✅ React components for PDF structure (Document, Page, Text, View)</li>
            <li>✅ StyleSheet with Flexbox layout and CSS properties</li>
            <li>✅ Client-side PDF generation (browser)</li>
            <li>✅ PDFDownloadLink component for easy download</li>
            <li>✅ Programmatic PDF generation with Blob API</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-yellow-900 mb-2">💡 Next Steps</h3>
          <p className="text-yellow-800 text-sm">
            Check out the <a href="https://react-pdf.org/" target="_blank" rel="noopener noreferrer" className="underline">react-pdf documentation</a> for more advanced features like:
            images, links, tables, headers, footers, page numbers, and more complex layouts.
          </p>
        </div>
      </div>
    </div>
  );
}
