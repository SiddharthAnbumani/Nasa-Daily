import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRandomDate = () => {
    const year = Math.floor(Math.random() * (new Date().getFullYear() - 2023 + 1)) + 2023;
    const month = Math.floor(Math.random() * 12) + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const apiKey = "HZrNxYI9jYwE6a6XewsevLQ7NgvFeHL7yGh8H4NM";
    const randomDate = getRandomDate();
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${randomDate}`;

    axios
      .get(url)
      .then((response) => {
        setImageData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-white text-center flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!imageData) {
    return <div className="text-white text-center flex items-center justify-center h-screen">No data available.</div>;
  }

  return (
    <div className="bg-blue-900 h-screen w-full flex flex-col items-center justify-between p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6">NASA Daily</h1>

      {/* Content Wrapper */}
      <div className="flex flex-col items-center flex-1 w-full max-w-4xl gap-6">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center">{imageData.title}</h2>

        {/* Image */}
        <div className="flex justify-center w-full flex-1">
          <img src={imageData.url} alt={imageData.title} className="w-full max-w-3xl rounded-lg shadow-lg object-contain" />
        </div>

        {/* Explanation */}
        <p className="text-lg text-center px-4">{imageData.explanation}</p>
      </div>
    </div>
  );
}

