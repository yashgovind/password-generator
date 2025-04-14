import React,{ useCallback, useEffect, useState , useRef} from 'react'
import "./index.css";

function App() {
  // state variables.
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  // password generator logic
  const passwordGenerator = useCallback(
    () => {

      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if (numberAllowed) {
        str += "0123456789";
      }
      if (characterAllowed) {
        str += "!@#$$%^*()_-=+/*.,;:'{}]|";
      }


      for (let i = 0; i < length; i++){
        let char = Math.floor(Math.random() * length + 1);
       pass+= str.charAt(char);
      }

      setPassword(pass);


    }
    , [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {

    passwordGenerator()

  }, [length, numberAllowed, characterAllowed, setPassword, passwordGenerator])

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,36)
      window.navigator.clipboard.writeText(password)
},[password])



    return (
      <>
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-0 my-8 py-8 text-orange-500 bg-gray-800 ">
          <h1 className="text-white text-center text-3xl mb-6">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input type="text"
              value={password}
              className='outline-none w-full py-1 px-3 bg-white text-center rounded-lg'
              placeholder='Password'
              ref={passwordRef}
               readOnly
            />
            <button
              className="outline-none bg-blue-700 text-white px-3 py-2 5 shrink-0 rounded-lg cursor-pointer"
              onClick={copyPassToClipboard}
            >Copy</button>
          </div>
          <div className="flex text-lg gap-x-4">
            <div className="flex items-center gap-x-1">
              <input type="range"
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {
                  setLength(e.target.value)
                }}
              />
              <label>Length:{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox"
                defaultChecked={numberAllowed}
                id='numberInput'
                onChange={() => {
                  setNumberAllowed((prev)=>(!prev))
                }}
                />
                <label>Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox"
                defaultChecked={numberAllowed}
                id='characterInput'
                onChange={() => {
                  setCharacterAllowed((prev)=>(!prev))
                }}
                />
                <label>Characters</label>
            </div>
          </div>
      </div>
      </>
   )

}

export default App
