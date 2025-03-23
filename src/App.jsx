import { useState } from "react";
import "./App.css";
import "./../public/scifi.mp4";
import "./../public/classic.mp4";

function App() {
  const [prompt, setPrompt] = useState("");
  const [storyText, setStoryText] = useState(""); // State to store generated story
  const [storyType, setStoryType] = useState("");
  const [storyCreativity, setStoryCreativity] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [hoveredWord, setHoveredWord] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedOption, setSelectedOption] = useState("");

  // Mock function to generate a story (Replace with actual API call)
  const generateStory = () => {
    console.log("Filters Selected:", {
      storyType,
      storyCreativity,
      ageGroup,
    });
    setStoryText(
      `Once upon a time... \n${prompt} \nAnd they lived happily ever after.`
    );
  };

  const handleWordHover = (word, event) => {
    setHoveredWord(word);
    setPopupPosition({ x: event.clientX, y: event.clientY });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setHoveredWord(null); // Hide the popup after selecting an option
    console.log("Selected option:", option);
    // Logic to modify the story based on the option can be added here
  };

  return (
    <>
      <div>

         {/* Video Background */}
         <video
          className=" backdrop-blur-sm mt-10 absolute top-0 left-0 w-[100%] h-[95.2%] object-cover z-[-1]"
          autoPlay
          loop
          muted
        >
          <source src="/horror.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> 


        {/* Navigation Bar */}
        <div className="nav bg-red-400 p-2 text-white">
          <h1>HELLO</h1>
        </div>

        <div className="flex justify-around mt-10 ml-20 body relative overflow-hidden p-5">
          {/* Dropdown Filters */}
          <div className="w-[1000px] flex flex-col text-black filters flex gap-4">
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
          </div>

          {/* Prompt Input */}
          <div>
            <textarea
              className="w-[1200px] h-[230px] mr-[80px] backdrop-blur-sm bg-black/10 border text-white border-gray-300 p-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto resize-none"
              style={{ direction: "rtl", textAlign: "left" }}
              placeholder="Enter your Descriptive Prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents a new line in the textarea
                  console.log("Final Input:", prompt);
                  console.log("Filters Selected:", {
                    storyType,
                    storyCreativity,
                    ageGroup,
                  });
                  setPrompt(""); // Clears the input after pressing Enter
                }
              }}
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col mt-20 items-center w-full h-full">
          {/* Button to Generate Story */}
          <button
            onClick={generateStory}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Generate Story
          </button>
          {/* Story Display Box */}
          <div className="mt-4 w-full h-full  flex justify-center items-center relative">
            <div
              className="w-[90%] h-60 backdrop-blur-sm bg-black/10 border border-gray-300 p-4 rounded-md overflow-y-auto text-white"
              style={{ direction: "rtl", textAlign: "left" }}
            >
              {storyText ? (
                storyText.split(" ").map((word, index) => (
                  <span
                    key={index}
                    onMouseEnter={(e) => handleWordHover(word, e)}
                    className="hover:bg-yellow-200 cursor-pointer"
                  >
                    {word} 
                  </span>
                ))
              ) : (
                <p className="text-gray-400">Your story will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Popup with Options */}
      {hoveredWord && (
        <div
          className="absolute bg-white border border-gray-300 shadow-md p-2 rounded-md"
          style={{ top: popupPosition.y, left: popupPosition.x }}
        >
          <p className="font-bold">Modify "{hoveredWord}"</p>
          <button className="block w-full text-left p-1 hover:bg-gray-200" onClick={() => handleOptionSelect("Rephrase")}>Rephrase</button>
          <button className="block w-full text-left p-1 hover:bg-gray-200" onClick={() => handleOptionSelect("Expand")}>Expand</button>
          <button className="block w-full text-left p-1 hover:bg-gray-200" onClick={() => handleOptionSelect("Simplify")}>Simplify</button>
        </div>
      )}
    </>
  );
}

function Dropdown({ label, options, setSelectedOption }) {
  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <select
        className="border border-gray-300 p-2 rounded-md"
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