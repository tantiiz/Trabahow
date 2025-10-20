import React from "react";

/**
 * Clean ModuleCard with separated content and buttons
 * props:
 *  - module: { title, desc, pubmats: [url,...], handouts: [url,...], icon, logo }
 *  - onOpenModule: function to open module modal
 */
export default function ModuleCard({ module, onOpenModule }) {
  // Enhanced download handler for PDFs
  const handleDownload = (url, filename) => {
    try {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
  };

  // Generate quick tips based on module type
  const getQuickTips = (moduleId) => {
    const tipsMap = {
      "philippines-labor-market": ["📊 Current job trends", "💼 Industry insights", "🎯 Career opportunities"],
      "communication-training": ["🗣️ Public speaking", "📝 Written communication", "👥 Team collaboration"],
      "practice-networking": ["🤝 Professional connections", "👨‍🏫 Mentor relationships", "💡 Industry insights"],
      "what-is-kadakareer": ["🌟 Career services", "📚 Training programs", "🎓 Student support"],
      "networking-begins-school": ["🎓 Campus connections", "👥 Peer networking", "📈 Early career building"],
      "resume-tips-stand-out": ["📄 ATS optimization", "✨ Visual appeal", "🎯 Keyword targeting"],
      "ace-your-interview": ["💪 Confidence building", "❓ Common questions", "🎯 Success strategies"]
    };
    return tipsMap[moduleId] || ["📚 Valuable resources", "🎯 Practical tips", "🌟 Expert guidance"];
  };

  return (
    <article className="module-card">
      {/* Card Header with Logo */}
      <div className="card-header">
        <div className="card-logo">
          <img 
            src={module.logo} 
            alt={`${module.title} logo`}
            className="module-logo"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="module-icon-fallback" style={{ display: 'none' }}>
            {module.icon}
          </div>
        </div>
        <div className="card-title-section">
          <h2 className="card-title">{module.title}</h2>
          <p className="card-description">{module.desc}</p>
        </div>
      </div>

      {/* Visual Preview Thumbnail */}
      <div className="card-thumbnail">
        <div className="thumbnail-placeholder">
          <div className="placeholder-icon">{module.icon}</div>
          <span>PDF Guide Available</span>
        </div>
      </div>

      {/* Quick Tips Section */}
      <div className="card-tips">
        {getQuickTips(module.id).map((tip, index) => (
          <span key={index} className="tip-tag">{tip}</span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="card-actions">
        <button 
          onClick={() => onOpenModule && onOpenModule(module)} 
          className="btn btn-preview"
          title="Preview PDF content"
        >
          📄 Preview PDF
        </button>
        {module.handouts && module.handouts.length > 0 && (
          <button 
            onClick={() => handleDownload(
              module.handouts[0], 
              `${module.title.replace(/[^a-zA-Z0-9]/g, '_')}_Guide.pdf`
            )}
            className="btn btn-download"
            title={`Download ${module.title} PDF Guide`}
          >
            📚 Download PDF
          </button>
        )}
      </div>
    </article>
  );
}
