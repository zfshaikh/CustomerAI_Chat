// "use client";

// import { Box, Button, Stack, TextField, Typography } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { useState } from "react";

// export default function Home() {
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content: "Hi! I'm your LingoMate AI. How can I help you today?",
//     },
//   ]);

//   const [message, setMessage] = useState("");

//   const sendMessage = async () => {
//     setMessage("");
//     setMessages((messages) => [
//       ...messages,
//       { role: "user", content: message },
//       { role: "assistant", content: "" },
//     ]);

//     const response = fetch("/api/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify([...messages, { role: "user", content: message }]),
//     }).then(async (res) => {
//       const reader = res.body.getReader();
//       const decoder = new TextDecoder();

//       let result = "";
//       return reader.read().then(function processText({ done, value }) {
//         if (done) {
//           return result;
//         }
//         const text = decoder.decode(value || new Int8Array(), { stream: true });
//         setMessages((messages) => {
//           let lastMessage = messages[messages.length - 1];
//           let otherMessages = messages.slice(0, messages.length - 1);
//           return [
//             ...otherMessages,
//             {
//               ...lastMessage,
//               content: lastMessage.content + text,
//             },
//           ];
//         });
//         return reader.read().then(processText);
//       });
//     });
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "lightblue",
//         backgroundImage: "url(/robot.png)",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         width: "100vw",
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         p: 2,
//       }}
//     >
//       <Stack
//         sx={{
//           backgroundColor: "rgba(255, 255, 255, 0.5)",
//           width: { xs: "100%", sm: "550px" },
//           height: "650px",
//           borderRadius: "20px",
//           boxShadow: 8,
//           p: 3,
//         }}
//       >
//         <Typography
//           sx={{
//             fontWeight: "bold",
//             fontSize: "20px",
//             variant: "h4",
//             mb: 2,
//             textAlign: "center",
//             color: "#002884",
//           }}
//         >
//           Welcome to LingoMate AI
//         </Typography>

//         <Stack
//           sx={{
//             flexDirection: "column",
//             flexGrow: 1,
//             overflowY: "auto",
//             maxHeight: "100%",
//             p: 1,
//           }}
//         >
//           {messages.map((message, index) => (
//             <Box
//               key={index}
//               sx={{
//                 display: "flex",
//                 justifyContent:
//                   message.role === "assistant" ? "flex-start" : "flex-end",
//                 mb: 2,
//               }}
//             >
//               <Box
//                 sx={{
//                   bgcolor: message.role === "assistant" ? "#90caf9" : "#e1bee7",
//                   color: "black",
//                   borderRadius: "16px",
//                   p: 2,
//                   maxWidth: "75%",
//                   boxShadow: 3,
//                 }}
//               >
//                 {message.content.split("\n").map((line, i) => (
//                   <Typography key={i} component="span">
//                     {line}
//                     <br />
//                   </Typography>
//                 ))}
//                 {/* {message.content} */}
//               </Box>
//             </Box>
//           ))}
//         </Stack>
//         <Stack direction="row" spacing={2} mt={2}>
//           <TextField
//             label="Enter Message"
//             fullWidth
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             variant="outlined"
//           />

//           <Button
//             variant="contained"
//             endIcon={<SendIcon />}
//             onClick={sendMessage}
//           >
//             Send
//           </Button>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// }

"use client";

import { Box, Button, Stack, TextField, Typography, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { auth } from "../firebase/configFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { marked } from 'marked'; // Import marked for Markdown parsing
import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your LingoMate AI. How can I help you today?",
    },
  ]);

  const [message, setMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState(0); // State for the selected tab
  const router = useRouter();
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // Redirect to login/signup page if not authenticated
        window.location.href = "/sign-up";
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const sendMessage = async () => {
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
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
      });
    });
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // redirect to start page after logout
    } catch (error) {
      console.error('Logout failed: ', error);
    }
  };

  const handleCancelLogout = async () => {
    setConfirmLogout(false); // close confirmation dialogue and return to home tab
  }

  const renderMarkdown = (markdownText) => {
    const html = marked.parse(markdownText);
    return { __html: html };
  };

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "lightblue",
          backgroundImage: "url(/robot.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            color: "#002884",
          }}
        >
          Loading...
        </Typography>
      </Box>
    );
  }

  const teamMembers = [
    // Example team members; uncomment and populate with real data if needed
    // { name: "John Doe", role: "Developer", image: "/john.png" },
    // { name: "Jane Smith", role: "Designer", image: "/jane.png" },
    // { name: "Alice Johnson", role: "Project Manager", image: "/alice.png" },
    // { name: "Bob Brown", role: "QA Engineer", image: "/bob.png" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "lightblue",
        backgroundImage: "url(/robot.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      {/* Tabs placed outside the chatbot container */}
      <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Home" />
        <Tab label="Our Team" />
      </Tabs>

      <Stack
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          width: { xs: "100%", sm: "550px" },
          height: "650px",
          borderRadius: "20px",
          boxShadow: 8,
          p: 3,
          overflow: "hidden", // Prevents content overflow
        }}
      >
        {selectedTab === 0 && (
          // Content for Home tab
          <>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                mb: 2,
                textAlign: "center",
                color: "#002884",
              }}
            >
              Welcome to LingoMate AI
            </Typography>

            <Stack
              sx={{
                flexDirection: "column",
                flexGrow: 1,
                overflowY: "auto",
                p: 1,
              }}
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      message.role === "assistant" ? "flex-start" : "flex-end",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor:
                        message.role === "assistant" ? "#90caf9" : "#e1bee7",
                      color: "black",
                      borderRadius: "16px",
                      p: 2,
                      maxWidth: "75%",
                      boxShadow: 3,
                      '& ol, & ul': {
                        listStylePosition: 'inside',
                        margin: 0,
                        padding: 0,
                      },
                    }}
                    dangerouslySetInnerHTML={renderMarkdown(message.content)}
                  />
                </Box>
              ))}
            </Stack>
            <Stack direction="row" spacing={2} mt={2}>
              <TextField
                label="Enter Message"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant="outlined"
                sx={{ flexGrow: 1 }}
              />

              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={sendMessage}
              >
                Send
              </Button>
            </Stack>
          </>
        )}

        {selectedTab === 1 && (
          // Content for Our Team tab
          <Stack sx={{ mt: 2 }} spacing={2}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                mb: 2,
                textAlign: "center",
                color: "#002884",
              }}
            >
              Our Team
            </Typography>
            {teamMembers.map((member, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "10px",
                  p: 2,
                  boxShadow: 2,
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    marginRight: "16px",
                  }}
                />
                <Box>
                  <Typography sx={{ fontWeight: "bold", color: "#002884" }}>
                    {member.name}
                  </Typography>
                  <Typography>{member.role}</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
          
      <Dialog
        open={confirmLogout}
        onClose={() => setConfirmLogout(false)}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCancelLogout}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      </Stack>
      <Button
        variant="outlined"
        color="error"
        onClick={() => setConfirmLogout(true)}
        sx={{
          mt: 2,
          backgroundColor: '#3399ff',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#0066ff',
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
