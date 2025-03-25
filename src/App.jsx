import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);


  const getRandomDate = () => {
    const year = Math.floor(Math.random() * (new Date().getFullYear() - 2023 + 1)) + 2023;
    const month = Math.floor(Math.random() * 12) + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const apiKey = 'HZrNxYI9jYwE6a6XewsevLQ7NgvFeHL7yGh8H4NM';
    const randomDate = getRandomDate(); // Generate a random date
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
    return <div className="text-white w-screen h-screen self-center bg-black p-10 flex justify-center items-center">
      <p className='text-center text-6xl font-extrabold'>Loading..</p>
      </div>;
  }

  if (!imageData) {
    return <div className="text-white text-center p-4">No data available.</div>;
  }
  return (

    <div className="flex flex-col items-center w-full h-screen bg-black">
      <div className="w-[80%] flex flex-col items-center p-10 bg-blue-500/40 m-10 rounded-4xl">
        <div className="flex justify-between items-center">
              <img src="nasa.svg" alt="" className='w-30' />
              <h1 className="text-4xl font-extrabold mt-4 mb-6">NASA Daily</h1>
        </div>
        <div className="text-center max-w-3xl mx-4 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">{imageData.title}</h2>
        </div>
        <div className="">
          <p className="text-lg font-semibold mb-6">{imageData.explanation}</p>
        </div>
        <div className="relative w-full h-64 sm:h-96 md:h-[400px] lg:h-[500px] mb-6">
            <img
              src={imageData.url}
              alt={imageData.title}
              className="object-cover w-full h-full rounded-lg shadow-lg"
              />
        </div>
      </div>
    </div>
  );
}

