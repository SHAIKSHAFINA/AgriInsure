import React, { useState, ChangeEvent, FormEvent } from 'react';

const PlotForm: React.FC = () => {
  const [fieldArea, setFieldArea] = useState<string>('');
  const [cropType, setCropType] = useState<string>('');
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleFieldAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldArea(e.target.value);
  };

  const handleCropTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCropType(e.target.value);
  };

  const handleCsvFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to handle form submission, such as sending data to the backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fieldArea">Field Area (in acres):</label>
        <input
          type="number"
          id="fieldArea"
          value={fieldArea}
          onChange={handleFieldAreaChange}
          required
        />
      </div>
      <div>
        <label htmlFor="cropType">Crop Type:</label>
        <input
          type="text"
          id="cropType"
          value={cropType}
          onChange={handleCropTypeChange}
          required
        />
      </div>
      <div>
        <label htmlFor="csvFile">Upload CSV File:</label>
        <input
          type="file"
          id="csvFile"
          accept=".csv"
          onChange={handleCsvFileChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PlotForm;