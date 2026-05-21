import React from 'react';

interface ResultsCardProps {
  floodSeverity: string;
  insuranceAmount: number;
  onRetry: () => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ floodSeverity, insuranceAmount, onRetry }) => {
  return (
    <div className="results-card">
      <h2>Flood Severity Assessment</h2>
      <p><strong>Flood Severity:</strong> {floodSeverity}</p>
      <p><strong>Recommended Insurance Amount:</strong> ${insuranceAmount.toFixed(2)}</p>
      <button onClick={onRetry}>Assess Another Plot</button>
    </div>
  );
};

export default ResultsCard;