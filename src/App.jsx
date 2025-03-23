import { useState } from "react";
import "./App.css";
import "./../public/horror.mp4";

function App() {
  const [prompt, setPrompt] = useState("");
  const [storyText, setStoryText] = useState("");
  const [storyType, setStoryType] = useState("");
  const [storyCreativity, setStoryCreativity] = useState("");
  const [ageGroup, setAgeGroup] = useState("");

  const generateStory = () => {
    console.log("Filters Selected:", { storyType, storyCreativity, ageGroup });
    setStoryText(
      `Once upon a time... \n${prompt} \nWhat happens next? Choose an option below.`
    );
  };

  // Placeholder function for the "What Next" options
  const handleNextOption = (option) => {
    console.log("Next option selected:", option);
    // Add logic here to dynamically update storyText based on the option
    setStoryText((prev) => `${prev} \n${option} was chosen, and the story continues...`);
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Left Panel with Controls */}
        
        <div className="w-1/3 bg-gray-800 p-6 flex flex-col gap-6 text-white">
          {/* Navigation Bar */}

          {/* Dropdown Filters */}
          <Dropdown
            label="Story Type"
            options={["Humor", "Thriller", "Original", "SciFi", "Horror", "Classic", "Action", "Realism"]}
            setSelectedOption={setStoryType}
          />
          <Dropdown
            label="Story Creativity"
            options={["Standard", "Conservative", "Innovative", "Imaginative", "Visionary", "Inspired"]}
            setSelectedOption={setStoryCreativity}
          />
          <Dropdown
            label="Age group"
            options={["4-8", "8-12", "13-17", "18-24", "25+"]}
            setSelectedOption={setAgeGroup}
          />

          {/* Prompt Input */}
          <textarea
            className="w-full h-40 bg-black/20 border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto resize-none text-white"
            placeholder="Enter your Descriptive Prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                console.log("Final Input:", prompt);
                console.log("Filters Selected:", { storyType, storyCreativity, ageGroup });
                setPrompt("");
              }
            }}
          ></textarea>

          {/* Generate Story Button */}
          <button
            onClick={generateStory}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Generate Story
          </button>
        </div>

        {/* Right Panel with Video and Story */}
        <div className="w-2/3 relative">
          {/* Video Background */}
          <video
            className="w-full h-full object-cover opacity-90" // Reduced opacity instead of blur
            autoPlay
            loop
            muted
          >
            <source src="/horror.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Story Display Overlay */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-6">
            <div
              className="w-full flex-1 bg-black/30 border border-gray-300 p-6 rounded-md overflow-y-auto text-white"
            >
              {storyText ? (
                storyText.split("\n").map((line, index) => (
                  <p key={index} className="mb-2">
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-gray-300">Your story will appear here...</p>
              )}
            </div>

            {/* What Next Options */}
            {storyText && (
              <div className="flex justify-around mt-4">
                <button
                  onClick={() => handleNextOption("The hero escapes")}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Option 1: Escape
                </button>
                <button
                  onClick={() => handleNextOption("The villain strikes")}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Option 2: Confrontation
                </button>
                <button
                  onClick={() => handleNextOption("A twist unfolds")}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                >
                  Option 3: Twist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Dropdown({ label, options, setSelectedOption }) {
  return (
    <div>
      <label className="block text-gray-300 mb-1">{label}</label>
      <select
        className="w-full border border-gray-300 p-2 rounded-md bg-gray-700 text-white"
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;