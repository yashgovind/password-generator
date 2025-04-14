import React, { useCallback, useEffect, useState, useRef } from 'react';
import './index.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_-+=[]{}~`";
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 9999);
    navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-4 bg-gray-800 rounded-xl shadow-2xl p-6">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
          Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            value={password}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Generate password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassToClipboard}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Length Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-white text-sm md:text-base">Length</label>
              <span className="text-blue-400 font-mono text-lg">{length}</span>
            </div>
            <input
              type="range"
              min="6"
              max="100"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-600"
              />
              <span className="text-white text-sm md:text-base">Numbers</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={characterAllowed}
                onChange={() => setCharacterAllowed(prev => !prev)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-600"
              />
              <span className="text-white text-sm md:text-base">Special Characters</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;