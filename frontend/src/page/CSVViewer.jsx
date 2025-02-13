import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Home from "./Home"; 

function CSVViewer() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const sizeOrder = ["XS", "Small", "Medium", "Large", "XL", "XXL"];

  useEffect(() => {
    document.title = `CSV File - ${id}`;
  }, [id]);

  useEffect(() => {
    const storedData = localStorage.getItem(`csvData-${id}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      setHeaders(Object.keys(parsedData[0] || {}));
    }
  }, [id]);

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
    <div className="p-6 bg-[#18181b] min-h-screen text-white md:text-lg ">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        ← Back to Home
      </button>

      {data.length === 0 ? (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">CSV Data Viewer</h1>
          <p>No data available</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <h1 className="text-2xl font-bold mb-4">CSV Data</h1>
          <table className="w-full border-collapse border border-gray-400">
            <thead className="bg-gray-800">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="border border-gray-600 px-4 py-2 cursor-pointer hover:bg-gray-700 transition"
                    onClick={() => handleSort(header)}
                  >
                    {header.toUpperCase()} {sortColumn === header && (sortOrder === "asc" ? " 🔼" : " 🔽")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex} className="border border-gray-600 px-4 py-2">
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

export default CSVViewer;
