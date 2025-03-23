import { useState } from "react";
import axios from "axios";
import "./App.css";
import "./../public/horror.mp4";

function App() {
  const [prompt, setPrompt] = useState("");
  const [storyText, setStoryText] = useState("");
  const [storyType, setStoryType] = useState("");
  const [storyCreativity, setStoryCreativity] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [plotOptions, setPlotOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const generateStory = async () => {
    setIsLoading(true);
    setError("");
    const payload = {
      storyType,
      storyCreativity,
      ageGroup,
      storyStart: prompt,
    };
    console.log("Sending request to backend with payload:", payload);

    try {
      // Test the health check endpoint first
      const healthResponse = await axios.get("http://localhost:3000/health");
      console.log("Health check response:", healthResponse.data);

      // Proceed with the story generation request
      const response = await axios.post("http://localhost:3000/story/initiate", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Backend response:", response.data);
      const { plotOptions } = response.data;
      setPlotOptions(plotOptions);
      setStoryText("");
    } catch (error) {
      console.error("Error generating story:", error);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response data:", error.response.data);
        setError(`Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.log("No response received:", error.request);
        setError("No response from backend. Is the backend running on port 3000?");
      } else {
        console.log("Request setup error:", error.message);
        setError(`Request error: ${error.message}`);
      }
      setStoryText("Failed to generate story. Check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlotOptionSelect = async (selectedPlot) => {
    setIsLoading(true);
    setError("");
    try {
      const updatedStory = storyText ? `${storyText}\n${selectedPlot}` : selectedPlot;
      setStoryText(updatedStory);

      console.log("Continuing story with:", { completedStory: updatedStory });
      const response = await axios.post("http://localhost:3000/story/continue", {
        completedStory: updatedStory,
        storyType,
        storyCreativity,
        ageGroup,
      });
      console.log("Continue response:", response.data);
      const { nextPlotOptions } = response.data;
      setPlotOptions(nextPlotOptions);
    } catch (error) {
      console.error("Error continuing story:", error);
      if (error.response) {
        setError(`Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        setError("No response from backend. Is the backend running on port 3000?");
      } else {
        setError(`Request error: ${error.message}`);
      }
      setStoryText(`${storyText}\nFailed to continue story. Check the console for details.`);
    } finally {
      setIsLoading(false);
    }
  };

  const reloadPlots = async () => {
    setIsLoading(true);
    setError("");
    try {
      console.log("Reloading plots with:", {
        completedStory: storyText || undefined,
        storyType,
        storyCreativity,
        ageGroup,
        storyStart: storyText ? undefined : prompt,
      });
      const response = await axios.post("http://localhost:3000/api/story/reload", {
        completedStory: storyText || undefined,
        storyType,
        storyCreativity,
        ageGroup,
        storyStart: storyText ? undefined : prompt,
      });
      console.log("Reload response:", response.data);
      const { plotOptions } = response.data;
      setPlotOptions(plotOptions);
    } catch (error) {
      console.error("Error reloading plots:", error);
      if (error.response) {
        setError(`Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        setError("No response from backend. Is the backend running on port 3000?");
      } else {
        setError(`Request error: ${error.message}`);
      }
      setStoryText(`${storyText}\nFailed to reload plots. Check the console for details.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Left Panel with Controls */}
        <div className="w-1/3 bg-gray-800 p-6 flex flex-col gap-6 text-white">
          {/* Navigation Bar */}
          <div className="nav bg-pink-400 p-2 text-white rounded-3xl">
            <h1 className="text-2xl">StoryGen</h1>
          </div>

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
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Story"}
          </button>
        </div>

        {/* Right Panel with Video and Story */}
        <div className="w-2/3 relative">
          {/* Video Background */}
          <video
            className="w-full h-full object-cover opacity-90"
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
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            {/* What Next Options */}
            {plotOptions.length > 0 && (
              <div className="flex flex-wrap justify-around mt-4 gap-2">
                {plotOptions.map((plot, index) => (
                  <button
                    key={index}
                    onClick={() => handlePlotOptionSelect(plot)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                    disabled={isLoading}
                  >
                    Option {index + 1}: {plot.slice(0, 20)}...
                  </button>
                ))}
                <button
                  onClick={reloadPlots}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Reloading..." : "Reload Plots"}
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