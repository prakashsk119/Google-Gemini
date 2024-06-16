import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyCKLTLVvSE_XgwVE0w3ChKzz6ny51UDk6g";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 0,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

const run = async (prompt) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const response = result.response;
    const textResponse = await response.text(); 

    console.log(textResponse);
    return textResponse;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error; 
  }
};

export default run;

