# 📂 CSV File Uploader & Viewer

A simple web application to upload, store, and view CSV files using **React, Firebase, and PapaParse**. This app allows users to upload CSV files, parse the data, and store it in Firebase Realtime Database. Users can then view the data in a table format with sorting functionality.

## 🚀 Features
- Upload CSV files and store data in Firebase
- Parse CSV files using **PapaParse**
- Display CSV data in a structured table format
- Sort data based on columns (including size-based sorting)
- Save uploaded data in **localStorage** for quick access
- Dynamic document titles based on file names
- Responsive UI with **Tailwind CSS**

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Firebase Realtime Database
- **Parsing Library**: PapaParse

## 📂 Folder Structure
```
📦 csv-uploader-viewer
├── 📁 src
│   ├── 📁 components
│   │   ├── Home.js (File Upload Page)
│   │   ├── CSVViewer.js (CSV Data Viewer Page)
│   ├── 📁 config
│   │   ├── firebaseConfig.js (Firebase Configuration)
│   ├── App.js (Main Application Entry)
│   ├── index.js (React Root)
├── 📄 package.json
├── 📄 README.md
```
## 📌 Usage
### Uploading a CSV File
1. Click on **Upload CSV**.
2. Select a valid `.csv` file.
3. The file will be parsed and stored in Firebase.
4. The app will redirect to `/csv/{filename}` to display the data.

### Viewing & Sorting Data
- The uploaded CSV data is displayed in a table.
- Click on column headers to **sort data** (supports numeric, text, and size sorting).
- Data is also saved in **localStorage** for quick access.

## 🏗️ Future Enhancements
- ✅ Pagination for large CSV files
- ✅ Download CSV data
- ✅ Multi-file management
- ✅ Authentication with Firebase

## 💖 Contributing
Feel free to submit pull requests, open issues, or suggest improvements. Let's make this app better together!

