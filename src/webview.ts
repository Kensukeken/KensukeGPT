// webview.ts
import * as vscode from 'vscode';
import { getChatbotResponse } from './chatbot';

/**
 * Creates and displays a webview panel in the VS Code extension.
 * 
 * @param context - The extension context provided by VS Code.
 */
export function createWebviewPanel(context: vscode.ExtensionContext) {
    // Create a new webview panel
    const panel = vscode.window.createWebviewPanel(
        'aiHelper', // Internal identifier for the webview
        'AI Helper', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to display the new panel in
        {
            enableScripts: true // Allow scripts to be run in the webview
        }
    );

    // Set the HTML content for the webview
    panel.webview.html = getWebviewContent();

    // Handle messages received from the webview
    panel.webview.onDidReceiveMessage(
        async message => {
            switch (message.command) {
                case 'send':
                    // Get a response from the chatbot based on the received message text
                    const response = await getChatbotResponse(message.text);
                    // Send the response back to the webview
                    panel.webview.postMessage({ command: 'response', text: response });
                    return;
            }
        },
        undefined,
        context.subscriptions
    );
}

// Function to generate the HTML content for the webview
/**
 * Returns the HTML content for the webview panel.
 * 
 * @returns {string} The HTML content for the webview panel.
 */
function getWebviewContent(): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Helper</title>
        <style>
            body {
                font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f5f5f5;
                color: #333;
            }
            h1 {
                text-align: center;
                font-size: 2em;
                font-weight: bold;
                color: rgb(79, 62, 121);
                margin-bottom: 20px;
            }
            textarea {
                width: 100%;
                height: 100px;
                padding: 15px;
                border: 1px solid #ccc;
                border-radius: 8px;
                font-size: 16px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                resize: none;
                margin-bottom: 10px;
            }
            button {
                display: block;
                width: 100%;
                padding: 10px 15px;
                margin-top: 10px;
                background-color: rgb(105, 85, 170);
                color: white;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            button:hover {
                background-color: rgb(136, 113, 236);
            }
            #responses {
                margin-top: 20px;
                max-height: 300px;
                overflow-y: auto;
                padding: 10px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .ai-response {
                margin: 5px 0;
                padding: 10px;
                background-color: #E1F5FE;
                border-left: 4px solid rgb(103, 174, 240);
                border-radius: 5px;
            }
            .user-input {
                margin: 5px 0;
                text-align: right;
                background-color: #E8F5E9;
                padding: 10px;
                border-left: 4px solid #43A047;
                border-radius: 5px;
            }
            .ai-response .ai-response-content,
            .user-input .user-input-content {
                display: inline-block;
                max-width: 70%;
                vertical-align: top;
            }
            .ai-response .ai-response-content {
                margin-left: 10px;
            }
            .user-input .user-input-content {
                margin-right: 10px;
            }
        </style>
    </head>
    <body>
        <h1>AI Helper Chat</h1>
        <textarea id="input" placeholder="Type your message here..."></textarea>
        <button id="send">Send</button>
        <div id="responses"></div>
        <script>
            // Acquire the VS Code API
            const vscode = acquireVsCodeApi();

            // Handle the 'send' button click
            document.getElementById('send').addEventListener('click', () => {
                const input = document.getElementById('input').value;
                if (input.trim()) {
                    // Add the user's message to the chat history
                    document.getElementById('responses').innerHTML += '<p class="user-input"><strong>You:</strong> ' + input + '</p>';

                    // Send the message to the extension
                    vscode.postMessage({ command: 'send', text: input });

                    // Clear the input field
                    document.getElementById('input').value = '';
                }
            });

            // Handle messages sent from the extension
            window.addEventListener('message', event => {
                const message = event.data; // The JSON data that the extension sent
                if (message.command === 'response') {
                    // Add the AI's response to the chat history
                    const responsesDiv = document.getElementById('responses');
                    responsesDiv.innerHTML += '<p class="ai-response"><strong>AI:</strong> ' + message.text + '</p>';

                    // Auto-scroll to the bottom of the chat history
                    responsesDiv.scrollTop = responsesDiv.scrollHeight;
                }
            });
        </script>
        <footer>
            <p style="text-align: center; margin-top: 20px;">&copy; 2025 Kensukeken.</p>
        </footer>
    </body>
    </html>`;
}
