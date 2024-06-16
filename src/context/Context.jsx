import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext()

const ContextProvider = (props) => {
  const [input, setInput] = useState("")
  const [recentPrompt, setRecentPrompt] = useState("")
  const [previousPrompt, setPreviousPrompt] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState("")

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord)
    }, 75 * index)
  };

  const onSent = async (prompt) => {
    setResultData("")
    setLoading(true)
    setShowResult(true)

    try {
      let response;
      if (prompt !== undefined) {
        setPreviousPrompt((prev) => [...prev, input])
        setRecentPrompt(prompt)
        response = await run(prompt)
      } else {
        setPreviousPrompt((prev) => [...prev, input])
        setRecentPrompt(input)
        response = await run(input)
      }

      const responseArray = response.split("**")
      let newResponse = ""

      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 0) {
          newResponse += responseArray[i]
        } else {
          newResponse += `<b>${responseArray[i]}</b>`
        }
      }

      const formattedResponse = newResponse.split("*").join("<br>")
      setResultData(formattedResponse);
    } catch (error) {
      console.error("Error during API call:", error);
      setResultData("An error occurred while processing your request.")
    }

    setLoading(false)
    setInput("")
  }

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const contextValue = {
    previousPrompt,
    setPreviousPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  }

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider
