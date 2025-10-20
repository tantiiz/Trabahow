import React, { useState } from "react";

export default function PubmatModal({ data, onClose }) {
  const [activeTab, setActiveTab] = useState('preview');

  if (!data) return null;

  const handleDownload = (url, filename) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(url, '_blank');
    }
  };

  const renderImage = (src) => (
    <>
      <img src={src} alt="pubmat full" className="modal-img" />
      <div className="modal-actions">
        <a href={src} download className="btn">📥 Download Image</a>
        <button className="btn outline" onClick={onClose}>Close</button>
      </div>
    </>
  );

  const renderModule = (module) => {
    const firstPdf = module.handouts && module.handouts[0];
    
    return (
      <>
        <header className="modal-header">
          <div className="modal-logo-container">
            <img 
              src={module.logo} 
              alt={`${module.title} logo`}
              className="modal-logo"
              onError={(e) => {
                // Fallback to emoji icon if logo fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="modal-icon-fallback" style={{ display: 'none' }}>
              {module.icon}
            </div>
          </div>
          <div className="modal-title-section">
            <h2>{module.title}</h2>
            <p className="muted">{module.desc}</p>
          </div>
        </header>

        {/* Tab navigation */}
        <div className="modal-tabs">
          <button 
            className={`tab active`}
            onClick={() => setActiveTab('preview')}
          >
            📄 PDF Preview
          </button>
        </div>

        {/* Tab content */}
        <div className="modal-content">
          {firstPdf && (
            <div className="pdf-preview-container">
              <div className="pdf-preview-wrapper">
                <iframe
                  title={`${module.title} PDF preview`}
                  src={`${firstPdf}#view=FitH&toolbar=1&navpanes=1`}
                  className="pdf-iframe"
                  onError={() => {
                    // Fallback if iframe fails
                    const iframe = document.querySelector('.pdf-iframe');
                    if (iframe) {
                      iframe.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'pdf-fallback';
                      fallback.innerHTML = `
                        <div class="fallback-content">
                          <div class="fallback-icon">📄</div>
                          <h3>PDF Preview Unavailable</h3>
                          <p>Click the button below to open the PDF in a new tab</p>
                          <button class="btn" onclick="window.open('${firstPdf}', '_blank')">
                            📖 Open PDF in New Tab
                          </button>
                        </div>
                      `;
                      iframe.parentNode.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <div className="pdf-info">
                <p>📚 <strong>{module.title}</strong> - Complete Guide</p>
                <p className="muted">Scroll through the PDF above or download for offline reading</p>
                <div className="pdf-actions">
                  <button 
                    className="btn outline"
                    onClick={() => window.open(firstPdf, '_blank')}
                  >
                    📖 Open in New Tab
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          {firstPdf && (
            <button 
              onClick={() => handleDownload(
                firstPdf, 
                `${module.title.replace(/[^a-zA-Z0-9]/g, '_')}_Guide.pdf`
              )}
              className="btn"
            >
              📚 Download PDF Guide
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-content-wrapper">
          {data.type === "image" && renderImage(data.src)}
          {data.type === "module" && renderModule(data.module)}
        </div>
      </div>
    </div>
  );
}
