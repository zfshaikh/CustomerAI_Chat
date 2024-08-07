import { NextResponse } from 'next/server'; // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai'; // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users

// Use your own system prompt here
const systemPrompt = `
Welcome to HeadStarter's Customer Support! As your virtual assistant, I am here to help you navigate and make the most of your interview practice experience. Please feel free to ask me any questions you have about our services, features, and how to best prepare for your technical interviews. Here are some ways I can assist you:

Account Assistance: Help with creating, managing, and troubleshooting your HeadStarter account.
Interview Practice: Guidance on how to start an interview session, tips for effective practice, and how to review your performance.
Technical Support: Assistance with any technical issues you encounter on the site.
Subscription and Billing: Information on subscription plans, billing inquiries, and payment issues.
Resource Guidance: Recommendations for additional resources, tutorials, and study materials available on HeadSta
`;

// POST function to handle incoming requests
export async function POST(req) {
	const openai = new OpenAI(); // Create a new instance of the OpenAI client
	const data = await req.json(); // Parse the JSON body of the incoming request
	console.log(data);

	// Create a chat completion request to the OpenAI API
	const completion = await openai.chat.completions.create({
		messages: [{ role: 'system', content: systemPrompt }, ...data], // Include the system prompt and user messages
		model: 'gpt-3.5-turbo', // Specify the model to use
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
