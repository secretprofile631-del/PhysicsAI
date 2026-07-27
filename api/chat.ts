import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const {
      message,
      imageBase64,
      mimeType,
      history,
      language
    } = req.body;


    if (!message && !imageBase64) {
      return res.status(400).json({
        error: "Message or image is required."
      });
    }


    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY missing");
    }


    const ai = new GoogleGenAI({
      apiKey
    });


    const contents: any[] = [];


    const isSinhala =
      language === "sinhala" ||
      /[\u0D80-\u0DFF]/.test(message || "");


    const systemPrompt = `
You are "A/L Physics AI Master Bot".

You are an Advanced Level Physics tutor.

Rules:
1. Explain physics step-by-step.
2. Solve numerical problems clearly.
3. Use correct formulas and SI units.
4. Explain concepts simply.
5. Answer in Sinhala if the user uses Sinhala.
6. Answer in English otherwise.

${isSinhala
? "Respond completely in Sinhala using Sri Lankan A/L Physics terminology."
: "Respond in clear English."
}
`;


    if (history && Array.isArray(history)) {

      for (const h of history) {

        contents.push({
          role: h.role === "assistant"
            ? "model"
            : "user",

          parts: [
            {
              text: h.content
            }
          ]
        });

      }

    }


    const parts:any[] = [];


    if(imageBase64){

      parts.push({

        inlineData:{
          mimeType: mimeType || "image/jpeg",

          data:imageBase64.replace(
            /^data:image\/\w+;base64,/,
            ""
          )
        }

      });

    }


    parts.push({

      text:
      `${systemPrompt}

Student Question:
${message || "Analyze this physics image."}`

    });



    contents.push({

      role:"user",

      parts

    });



    const response =
      await ai.models.generateContent({

        model:"gemini-2.0-flash",

        contents,

        config:{
          tools:[
            {
              googleSearch:{}
            }
          ]
        }

      });



    res.json({

      success:true,

      reply:
        response.text || 
        "I could not generate a response.",

      groundingSources:[]

    });


  }

  catch(error:any){

    console.log(error);


    res.json({

      success:true,

      reply:
      "Physics AI is temporarily using offline mode. Please try again.",

      groundingSources:[]

    });

  }

}