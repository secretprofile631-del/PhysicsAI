export default async function handler(req: any, res: any) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }


    try {

        const { message } = req.body;


        if (!message) {
            return res.status(400).json({
                error: "Message required"
            });
        }


        const question = message.toLowerCase();


        let reply = "";


        // Newton Laws
        if (
            question.includes("newton") ||
            question.includes("force")
        ) {

            reply = `
Newton's Laws of Motion:

Newton's First Law:
An object remains at rest or continues moving with constant velocity unless an external force acts on it.

Newton's Second Law:

F = ma

Where:
F = Force (N)
m = Mass (kg)
a = Acceleration (m/s²)

Example:
If a 5kg object accelerates at 2m/s²:

F = 5 × 2
F = 10N

Newton's Third Law:
Every action has an equal and opposite reaction.
`;

        }


        // Motion
        else if (
            question.includes("velocity") ||
            question.includes("acceleration") ||
            question.includes("motion")
        ) {

            reply = `
Motion Concepts:

Velocity:
Velocity is the rate of change of displacement.

Formula:

v = s/t

where:
v = velocity
s = displacement
t = time


Acceleration:

a = (v-u)/t

where:
u = initial velocity
v = final velocity
t = time
`;

        }


        // Energy
        else if (
            question.includes("energy") ||
            question.includes("work")
        ) {

            reply = `
Energy and Work:

Work:

W = F × d

where:
W = Work done
F = Force
d = Distance


Kinetic Energy:

KE = 1/2 mv²


Potential Energy:

PE = mgh
`;

        }


        // Electricity
        else if (
            question.includes("electric") ||
            question.includes("voltage") ||
            question.includes("current")
        ) {

            reply = `
Electricity:

Ohm's Law:

V = IR

Where:

V = Voltage (V)
I = Current (A)
R = Resistance (Ω)


Electrical Power:

P = VI
`;

        }


        // General physics
        else {

            reply = `
I am Physics AI Tutor.

I can help with:

• Mechanics
• Newton's Laws
• Motion
• Energy
• Electricity
• Physics formulas
• A/L Physics concepts

Please ask a specific physics question.
`;

        }



        return res.json({

            success:true,

            reply: reply,

            groundingSources:[]

        });


    }


    catch(error) {

        console.log(error);


        return res.status(500).json({

            success:false,

            error:"Physics engine error"

        });

    }

}