import { useState } from 'react';
import Papa from 'papaparse';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const sizeOrder = ["XS", "Small", "Medium", "Large", "XL", "XXL"];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        console.log(results.data);

        if (results.data.length === 0) {
          console.log("Empty CSV file");
          return;
        }

        setHeaders(Object.keys(results.data[0]));
        setData(results.data);
      },
    });
  };

  const handleSort = (column) => {
    if (!column) return;

    const newOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);

    const isSizeColumn = data.every(row => sizeOrder.includes(row[column]));

    const sortedData = [...data].sort((a, b) => {
      let valA = a[column];
      let valB = b[column];

      if (isSizeColumn) {

        valA = sizeOrder.indexOf(valA);
        valB = sizeOrder.indexOf(valB);
      } else if (!isNaN(valA) && !isNaN(valB)) {

        valA = Number(valA);
        valB = Number(valB);
      } else {
        
        valA = valA.toString().toLowerCase();
        valB = valB.toString().toLowerCase();
      }

      return newOrder === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

    setData(sortedData);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-[#18181b] min-h-screen">
      {/* File Upload Button */}
      <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
        Upload CSV
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileUpload} 
          className="hidden"
        />
      </label>

      {/* Display Table If Data Exists */}
      {data.length > 0 && (
        <div className="overflow-x-auto mt-6 w-full max-w-[90vw] md:text-xl ">
          <table className="w-full border-collapse border border-gray-300 shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                {headers.map((header, index) => (
                  <th 
                    key={index} 
                    className="border border-gray-400 px-4 py-2 cursor-pointer hover:bg-gray-700 transition"
                    onClick={() => handleSort(header)}
                  >
                    {header.toUpperCase()} 
                    {sortColumn === header && (sortOrder === "asc" ? " 🔼" : " 🔽")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr 
                  key={index} 
                  className={index % 2 === 0 ? "bg-[#1f1f2d] text-white" : "bg-[#34344b] text-white"}
                >
                  {headers.map((header, i) => (
                    <td key={i} className="border border-gray-400 px-4 py-2">
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
