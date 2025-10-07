import React from "react";
import { FileText, ArrowRight } from "lucide-react";

export default function AddFlashSet() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [fileName, setFileName] = React.useState('');
  const [chapterName, setChapterName] = React.useState('');
  const [language, setLanguage] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('');
  const [uploadStatus, setUploadStatus] = React.useState('');

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 
    'Japanese', 'Hindi', 'Arabic', 'Portuguese', 'Russian'
  ];

  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Expert'];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      setFileName(file.name);
      setUploadStatus('');
    } else {
      setUploadStatus('Please select a valid CSV file');
      setSelectedFile(null);
      setFileName('');
    }
  };

const handleSubmit = async () => {
  if (!selectedFile || !chapterName || !language || !difficulty) {
    setUploadStatus('Please fill in all fields');
    return;
  }

  setUploadStatus('Uploading...');

  try {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('set_name', chapterName);
    formData.append('language', language);
    formData.append('difficulty_level', difficulty);

    const response = await fetch('http://localhost:3000/api/admin/addFlashCardSet', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload');
    }
    setUploadStatus('Upload successful!');

    // Reset form
    setSelectedFile(null);
    setFileName('');
    setChapterName('');
    setLanguage('');
    setDifficulty('');
  } catch (err) {
    console.error(err);
    setUploadStatus('Upload failed. Please try again.');
  }
};
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white w-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Upload learning materials and manage content</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Upload CSV File
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-amber-500 transition bg-slate-50"
                >
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-700">
                      {fileName || 'Click to upload CSV file'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">CSV files only</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Chapter Name
              </label>
              <input
                type="text"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
                placeholder="Enter chapter name"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white"
              >
                <option value="">Select a language</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white"
              >
                <option value="">Select difficulty level</option>
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {uploadStatus && (
              <div className={`p-4 rounded-lg ${
                uploadStatus.includes('successful') 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : uploadStatus.includes('Uploading')
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {uploadStatus}
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-amber-500 text-white px-8 py-4 rounded-lg hover:bg-amber-600 transition font-semibold text-lg flex items-center justify-center space-x-2 group"
            >
              <span>Upload Content</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Uploads</h2>
            <div className="space-y-3">
              {[
                { chapter: 'Introduction to React', language: 'English', difficulty: 'Medium', date: '2 hours ago' },
                { chapter: 'Advanced JavaScript', language: 'English', difficulty: 'Hard', date: '1 day ago' },
                { chapter: 'Python Basics', language: 'Spanish', difficulty: 'Easy', date: '2 days ago' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">{item.chapter}</p>
                    <p className="text-sm text-slate-600">{item.language} • {item.difficulty}</p>
                  </div>
                  <span className="text-sm text-slate-500">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}