import { useState, useEffect } from "react";
import { useFirebase } from "../config/firebaseConfig"; // Import Firebase Context
import Papa from "papaparse";

function Home() {
  const [fileName, setFileName] = useState("");
  const { putData } = useFirebase(); // Use Firebase Context




  useEffect(() => {
    document.title = fileName ? `Upload - ${fileName}` : "CSV File Uploader";
  }, [fileName]);





  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "text/csv") {
      alert("Please upload a valid CSV file.");
      return;
    }

    const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
    setFileName(nameWithoutExtension);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        if (results.errors.length > 0) {
          alert("Error parsing CSV file. Please check the format.");
          return;
        }

        if (results.data.length === 0) return;

        const csvData = results.data;

        // Save to localStorage (Optional)
        localStorage.setItem(`csvData-${nameWithoutExtension}`, JSON.stringify(csvData));

        // Upload CSV data to Firebase Realtime Database
        putData(`csv-files/${nameWithoutExtension}`, csvData);

        // Redirect to a new page
        window.open(`/csv/${nameWithoutExtension}`, "_blank");
      },
    });
  };



  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#18181b] text-white">
      <h1 className="text-3xl font-bold mb-6">📂 CSV File Uploader</h1>

      <label className="relative bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer flex items-center gap-2 hover:bg-blue-700 transition duration-300 shadow-lg">
        Upload CSV
        <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
      </label>

      {fileName && (
        <p className="mt-4 text-gray-300 text-lg bg-gray-800 px-4 py-2 rounded-lg">
          Selected File: <span className="text-blue-400">{fileName}</span>
        </p>
      )}
    </div>
  );
}

export default Home;
