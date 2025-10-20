import React from "react";

/**
 * TeamMemberCard component for displaying team member information
 * props:
 *  - member: { id, name, role, contribution, image, icon }
 */
export default function TeamMemberCard({ member }) {
  return (
    <div className="team-member">
      {/* Profile Image/Icon */}
      <div className="team-profile">
        {member.image ? (
          <img 
            src={member.image} 
            alt={`${member.name} profile`}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="team-profile-icon" 
          style={{ display: member.image ? 'none' : 'flex' }}
        >
          {member.icon}
        </div>
      </div>

      {/* Member Information */}
      <h3 className="team-name">{member.name}</h3>
      <div className="team-role">{member.role}</div>
      <p className="team-contribution">{member.contribution}</p>
    </div>
  );
}
