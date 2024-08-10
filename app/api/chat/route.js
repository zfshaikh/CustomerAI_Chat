import { NextResponse } from 'next/server'; // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai'; // Import OpenAI library for interacting with the OpenAI API


// POST function to handle incoming requests
export async function POST(req) {
	const openai = new OpenAI(); // Create a new instance of the OpenAI client
	const data = await req.json(); // Parse the JSON body of the incoming request
	console.log(data);

	// System prompt for the AI, providing guidelines on how to respond to users
	const systemPrompt = `Welcome to LingoMate AI, your personal language learning companion! I'm here to help you master a new language through interactive conversations, quizzes, and personalized feedback. Whether you're a beginner or advanced learner, I'll guide you every step of the way. Here's how I can assist you:

	1. Conversation Practice: Engage in real-time conversations with instant corrections on grammar, vocabulary, and pronunciation.
	2. Vocabulary Building: Learn new words and phrases with tailored quizzes and spaced repetition techniques.
	3. Grammar Guidance: Get explanations and practice exercises for tricky grammar rules.
	4. Cultural Insights: Learn about cultural nuances, idioms, and expressions to help you sound more like a native speaker.
	5. Progress Tracking: Keep track of your learning milestones and get recommendations on what to focus on next.
	6. Daily Challenges: Take on daily language challenges to keep your skills sharp and stay motivated.
	
	Feel free to ask me anything in the language you're learning, or let me know if you'd like help with specific topics or skills. Let's start learning and have fun while doing it!
	`;

	// Create a chat completion request to the OpenAI API
	const completion = await openai.chat.completions.create({
		messages: [{ role: 'system', content: systemPrompt }, ...data,], // Include the system prompt and user messages
		model: 'gpt-4o-mini', // Specify the model to use
		stream: true, // Enable streaming responses
	});

	// Create a ReadableStream to handle the streaming response
	const stream = new ReadableStream({
		async start(controller) {
			const encoder = new TextEncoder(); // Create a TextEncoder to convert strings to Uint8Array
			try {
				// Iterate over the streamed chunks of the response
				for await (const chunk of completion) {
					const content = chunk.choices[0]?.delta?.content; // Extract the content from the chunk
					if (content) {
						const text = encoder.encode(content); // Encode the content to Uint8Array
						controller.enqueue(text); // Enqueue the encoded text to the stream
					}
				}
			} catch (err) {
				controller.error(err); // Handle any errors that occur during streaming
			} finally {
				controller.close(); // Close the stream when done
			}
		},
	});

	return new NextResponse(stream); // Return the stream as the response
}
