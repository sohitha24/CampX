
import { GoogleGenAI } from "@google/genai";

// FIX: Always use a named parameter with process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askCourseAssistant(question: string, context: string) {
  try {
    // FIX: Use systemInstruction in config and simplified contents structure as per SDK guidelines
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: `You are an academic course assistant. Use the following context to answer student questions: ${context}.`,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });
    
    // FIX: Access response.text as a property, not a method
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment.";
  }
}
