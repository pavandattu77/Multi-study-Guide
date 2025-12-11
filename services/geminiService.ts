import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to convert file to base64
export const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeImage = async (file: File, prompt: string) => {
  try {
    const imagePart = await fileToGenerativePart(file);
    
    // Using gemini-3-pro-preview for superior multimodal understanding
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [imagePart, { text: prompt }],
      },
      config: {
         // Thinking budget for deep analysis of diagrams/notes
         thinkingConfig: { thinkingBudget: 2048 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};

export const generateStudyPlan = async (syllabus: string, days: number): Promise<any> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Create a structured ${days}-day study plan for the following syllabus/exam: ${syllabus}. 
      The output must be a valid JSON array of objects.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.INTEGER },
              topic: { type: Type.STRING },
              activities: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["day", "topic", "activities"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Error generating plan:", error);
    throw error;
  }
};

export const generateQuiz = async (topic: string, difficulty: string): Promise<any> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Faster for simple text generation
      contents: `Generate 5 multiple choice questions for the topic: ${topic}. Difficulty: ${difficulty}. for Indian competitive exams context if applicable.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
             required: ["question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};

export const cleanNotes = async (file: File): Promise<string> => {
    try {
        const imagePart = await fileToGenerativePart(file);
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: {
                parts: [
                    imagePart,
                    { text: "Transcribe these handwritten notes into clean, formatted Markdown. Correct any obvious spelling errors. Organize with clear headings and bullet points. If there are diagrams, describe them briefly in italics." }
                ]
            }
        });
        return response.text || "Could not process notes.";
    } catch (error) {
        console.error("Error cleaning notes", error);
        throw error;
    }
}
