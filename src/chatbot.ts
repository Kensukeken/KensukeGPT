// chatbot.ts

/**
 * Returns a chatbot response based on the user's input.
 * 
 * The chatbot recognizes the following keywords:
 * - 'hi' or 'hello' to respond with a greeting.
 * - 'help' or 'assist' to respond with a brief description of what the chatbot can do.
 * - 'programming' to ask what programming language the user is working with.
 * - 'project management' to provide a brief description of project management.
 * - 'fun fact' to provide an interesting fact.
 * - 'bye' or 'goodbye' to respond with a farewell message.
 * - Anything else to respond with a message saying that the chatbot is not sure how to respond.
 * @param userInput The string provided by the user to the chatbot.
 * @returns A string that is the chatbot's response.
 */
export async function getChatbotResponse(userInput: string): Promise<string> {
  const lowerInput = userInput.toLowerCase();
  const responses = {
      greetings: ['hi', 'hello'], // Respond to greetings with a friendly message.
      help: ['help', 'assist'], // Respond to help-related terms with a description of the chatbot's capabilities.
      programming: ['programming'], // Ask about the user's programming language in response to 'programming'.
      projectManagement: ['project management'], // Respond to project management-related terms with a description.
      funFact: ['fun fact'], // Respond to requests for fun facts with an interesting fact.
      goodbye: ['bye', 'goodbye'] // Respond to goodbyes with a farewell message.
  };

  // Check for each keyword and respond accordingly.
  if (responses.greetings.some(greet => lowerInput.includes(greet))) {
      return 'Hi there! How can I help you today?';
  } else if (responses.help.some(helpWord => lowerInput.includes(helpWord))) {
      return 'I\'m here to help! You can ask me about programming, project management, or even fun facts!';
  } else if (responses.programming.some(term => lowerInput.includes(term))) {
      return 'What programming language are you working with? I can help with Python, JavaScript, Java, and more!';
  } else if (responses.projectManagement.some(term => lowerInput.includes(term))) {
      return 'Project management involves planning, executing, and overseeing projects. Do you have specific questions about tools or methodologies?';
  } else if (responses.funFact.some(term => lowerInput.includes(term))) {
      return 'Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old!';
  } else if (responses.goodbye.some(term => lowerInput.includes(term))) {
      return 'Goodbye! Have a great day! Feel free to come back if you need assistance.';
  } else {
      return 'I\'m not sure how to respond to that. Can you ask something else?';
  }
}
