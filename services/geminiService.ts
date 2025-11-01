
import { GoogleGenAI, Type } from "@google/genai";
import { BrandingData } from '../types';
import { FONT_FACES, FONT_WEIGHTS } from '../constants';

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might show a more user-friendly error
  // but for this context, we assume the key is present.
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    projectName: { type: Type.STRING, description: "A creative and relevant name for the project." },
    projectDescription: { type: Type.STRING, description: "A short, one-sentence description of the project." },
    brandName: { type: Type.STRING, description: "A catchy and professional brand name related to the user's prompt." },
    lightTheme: {
      type: Type.OBJECT,
      properties: {
        colors: {
          type: Type.OBJECT,
          properties: {
            primary: { type: Type.STRING, description: "A vibrant primary color in hex format (e.g., #6366f1) for light mode." },
            secondary: { type: Type.STRING, description: "A complementary secondary color in hex format for light mode." },
            success: { type: Type.STRING, description: "A success color (green) in hex format for light mode." },
            warning: { type: Type.STRING, description: "A warning color (yellow/orange) in hex format for light mode." },
            error: { type: Type.STRING, description: "An error color (red) in hex format for light mode." },
            background: { type: Type.STRING, description: "A light background color (e.g., off-white) in hex format for light mode." },
            text: { type: Type.STRING, description: "A dark, readable text color in hex format for light mode." },
          },
        },
        typography: {
          type: Type.OBJECT,
          properties: {
            primaryFont: { type: Type.STRING, description: `A modern, readable font for headings. Choose one from: ${FONT_FACES.join(', ')}.` },
            secondaryFont: { type: Type.STRING, description: `An elegant, readable font for body text. Choose one from: ${FONT_FACES.join(', ')}.` },
          },
        },
      },
    },
    darkTheme: {
      type: Type.OBJECT,
      properties: {
        colors: {
          type: Type.OBJECT,
          properties: {
            primary: { type: Type.STRING, description: "A vibrant primary color in hex format for dark mode, accessible on a dark background." },
            secondary: { type: Type.STRING, description: "A complementary secondary color in hex format for dark mode." },
            success: { type: Type.STRING, description: "A success color (green) in hex format for dark mode." },
            warning: { type: Type.STRING, description: "A warning color (yellow/orange) in hex format for dark mode." },
            error: { type: Type.STRING, description: "An error color (red) in hex format for dark mode." },
            background: { type: Type.STRING, description: "A dark background color (e.g., dark blue/gray) in hex format for dark mode." },
            text: { type: Type.STRING, description: "A light, readable text color in hex format for dark mode." },
          },
        },
        typography: {
          type: Type.OBJECT,
          properties: {
            primaryFont: { type: Type.STRING, description: `The same primary font as the light theme. Choose one from: ${FONT_FACES.join(', ')}.` },
            secondaryFont: { type: Type.STRING, description: `The same secondary font as the light theme. Choose one from: ${FONT_FACES.join(', ')}.` },
          },
        },
      },
    },
    globalTypography: {
      type: Type.OBJECT,
      properties: {
        fontWeight: { type: Type.STRING, description: `A suitable default font weight. Choose one from: ${Object.keys(FONT_WEIGHTS).join(', ')}.` },
        fontSize: { type: Type.STRING, description: "A suitable base font size in pixels (e.g., '16px')." },
      },
    },
  },
};

export const getBrandingSuggestion = async (prompt: string): Promise<BrandingData | null> => {
  if(!API_KEY) {
      throw new Error("Gemini API key is not configured.");
  }
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Based on the following brand description, generate a complete branding guideline. Description: "${prompt}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // Basic validation to ensure the structure is correct
    if (parsedData && parsedData.lightTheme && parsedData.darkTheme) {
        return parsedData as BrandingData;
    }
    return null;

  } catch (error) {
    console.error("Error fetching branding suggestion from Gemini:", error);
    throw new Error("Failed to communicate with the AI. Please check your API key and try again.");
  }
};
   