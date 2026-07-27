import OpenAI from "openai";

export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }


  try {

    const {
      message,
      history,
      language
    } = req.body;


    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }


    const apiKey = process.env.OPENROUTER_API_KEY;


    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY missing");
    }


    const client = new OpenAI({

      apiKey: apiKey,

      baseURL:
        "https://openrouter.ai/api/v1"

    });



    const isSinhala =
      language === "sinhala" ||
      /[\u0D80-\u0DFF]/.test(message);



    const systemPrompt = `

You are "A/L Physics AI Master Bot".

You are an Advanced Level Physics tutor.

Rules:

- Explain physics step by step.
- Solve calculations clearly.
- Show formulas and SI units.
- Explain difficult concepts simply.
- Answer Sinhala questions in Sinhala.
- Answer English questions in English.

${isSinhala 
? "Use Sri Lankan A/L Physics Sinhala terminology."
: "Use clear English."}

`;



    const messages:any[] = [

      {
        role:"system",
        content:systemPrompt
      }

    ];



    if(history && Array.isArray(history)) {

      history.forEach((h:any)=>{

        messages.push({

          role:
          h.role === "assistant"
          ? "assistant"
          : "user",

          content:h.content

        });

      });

    }



    messages.push({

      role:"user",

      content:message

    });



    const response =
      await client.chat.completions.create({

        model:
        "meta-llama/llama-3.1-8b-instruct:free",

        messages

      });



    const reply =
      response.choices[0]
      .message.content;



    res.json({

      success:true,

      reply:
      reply ||
      "No response generated."

    });



  } catch(error:any) {


    console.log(error);


    res.json({

      success:false,

      reply:
      "Physics AI is temporarily unavailable. Please try again."

    });


  }

}