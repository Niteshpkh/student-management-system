import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, loading = false, subtitle }) => {
  if (loading) {
    return (
      <div className="stat-card stat-card-skeleton">
        <div className="skeleton-bar skeleton-title"></div>
        <div className="skeleton-bar skeleton-value"></div>
        {subtitle && <div className="skeleton-bar skeleton-subtitle"></div>}
      </div>
    );
  }

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <h3 className="stat-card-title">{title || "Metric"}</h3>
        {icon && <div className="stat-card-icon">{icon}</div>}
      </div>

      <p className="stat-card-value">
        {value !== null && value !== undefined ? value : 0}
      </p>

      {subtitle && <p className="stat-card-subtitle">{subtitle}</p>}
    </div>
  );
};

export default StatCard;