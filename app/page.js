'use client';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';


export default function Home() {
	const [messages, setMessages] = useState([
		{
			role: 'assistant',
			content: "Hi! I'm your LingoMate AI. How can I help you today?",
		},
	]);

	const [message, setMessage] = useState('');

	const sendMessage = async () => {
		setMessage('');
		setMessages((messages) => [
			...messages, 
			{ role: 'user', content: message }, 
			{ role: 'assistant', content: '' }
		]);

		
		const response =  fetch('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify([...messages, { role: 'user', content: message }]),
			}).then(async (res) => {
				const reader = res.body.getReader();
				const decoder = new TextDecoder();

				let result = ''
				return reader.read().then(function processText({done, value}){
					if (done){
						return result
					}					
					const text = decoder.decode(value || new Int8Array(), { stream: true });
					setMessages((messages) => {
						let lastMessage = messages[messages.length - 1];
						let otherMessages = messages.slice(0, messages.length - 1);
						return [
							...otherMessages, 
							{ 
								...lastMessage, 
								content: lastMessage.content + text, 
							},
						];
					});
					return reader.read().then(processText);
				})
			})
		};
		

		return (
			<Box
				sx={{
					backgroundColor: 'lightblue',
					backgroundImage: 'url(/robot.png)',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					width: '100vw',
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					p: 2,
				}}
			>
				<Stack
					sx={{
						backgroundColor: 'rgba(255, 255, 255, 0.5)',
						width: { xs: '100%', sm: '550px' },
						height: '650px',
						borderRadius: '20px',
						boxShadow: 8,
						p: 3,
					}}
				>
					<Typography
						sx={{
							fontWeight: 'bold',
							fontSize: '20px',
							variant: 'h4',
							mb: 2,
							textAlign: 'center',
							color: '#002884',
						}}
					>
						Welcome to LingoMate AI 
					</Typography>

					<Stack
						sx={{
							flexDirection: 'column',
							flexGrow: 1,
							overflowY: 'auto',
							maxHeight: '100%',
							p: 1,
						}}
					>
						{messages.map((message, index) => (
							<Box
								key={index}
								sx={{
									display: 'flex',
									justifyContent: message.role === 'assistant' ? 'flex-start' : 'flex-end',
									mb: 2,
								}}
							>
								<Box
									sx={{
										bgcolor: message.role === 'assistant' ? '#90caf9' : '#e1bee7',
										color: 'black',
										borderRadius: '16px',
										p: 2,
										maxWidth: '75%',
										boxShadow: 3,
									}}
								>
									{message.content.split('\n').map((line, i) => (
                                    	<Typography key={i} component="span">
                                        	{line}
                                        	<br />
                                    	</Typography>
                                	))}
									{/* {message.content} */}
									
								</Box>
							</Box>
						))}
					</Stack>
					<Stack direction='row' spacing={2} mt={2}>
						<TextField
							label='Enter Message'
							fullWidth
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							variant='outlined'
						/>
						
						<Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
  							Send
						</Button>
					</Stack>
				</Stack>
			</Box>
		);
	};
