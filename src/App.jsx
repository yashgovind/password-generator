import React, { useCallback, useEffect, useState, useRef } from 'react';
import './index.css';

function App() {
  // state variables.
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  // password generator logic
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$$%^*()_-=+/*.,;:'{}]|";
    }

    // Use the correct length of the string for random character selection
    for (let i = 0; i < length; i++){
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  const copyPassToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 9999);
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 text-orange-500 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-3 text-center rounded-l-lg focus:outline-none bg-white"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition duration-200"
            onClick={copyPassToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer"
            />
            <span className="text-white text-center text-xl">Length {length}</span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
                className="mr-1"
              />
              Numbers
            </label>
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={characterAllowed}
                onChange={() => setCharacterAllowed(prev => !prev)}
                className="mr-1"
              />
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
