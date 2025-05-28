// src/components/FlagGame.jsx
import { useEffect, useState } from "react";

const FlagGame = () => {
  const [countries, setCountries] = useState([]);
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((c) => c.flags && c.name);
        setCountries(filtered);
        getNewQuestion(filtered);
      });
  }, []);

  const getNewQuestion = (data = countries) => {
    const random = data[Math.floor(Math.random() * data.length)];
    const choices = [random];
    while (choices.length < 4) {
      const next = data[Math.floor(Math.random() * data.length)];
      if (!choices.find((c) => c.name.common === next.name.common)) {
        choices.push(next);
      }
    }
    setCurrent(random);
    setOptions(shuffleArray(choices));
    setMessage("");
  };

  const shuffleArray = (array) =>
    array.sort(() => Math.random() - 0.5);

  const handleChoice = (name) => {
    if (name === current.name.common) {
      setScore(score + 1);
      setMessage("✅ Correct!");
    } else {
      setMessage(`❌ Wrong! It was ${current.name.common}`);
    }
    setTimeout(() => getNewQuestion(), 1500);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">🌍 Flag Guess Game</h2>

      {current && (
        <>
          <img
            src={current.flags.svg}
            alt="flag"
            className="w-64 h-40 object-contain mx-auto mb-4 border rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            {options.map((option) => (
              <button
                key={option.name.common}
                onClick={() => handleChoice(option.name.common)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                {option.name.common}
              </button>
            ))}
          </div>
          <p className="mt-4 text-lg">{message}</p>
          <p className="mt-2 text-sm text-gray-500">Score: {score}</p>
        </>
      )}
    </div>
  );
};

export default FlagGame;
