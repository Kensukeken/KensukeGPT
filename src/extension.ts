// extension.ts
import * as vscode from 'vscode';
import { createWebviewPanel } from './webview';
import { getChatbotResponse } from './chatbot'; 

/**
 * Activates the extension.
 * 
 * @param context - The extension context provided by VS Code.
 */
export function activate(context: vscode.ExtensionContext) {
    // Log a message to indicate that the extension is now active
    console.log('Your extension "my-ai-helper" is now active!');

    // Register the command to open the chat.
    // When the command is invoked, it will create and display a webview panel.
    const disposable = vscode.commands.registerCommand('my-ai-helper.ai-helper', () => {
        createWebviewPanel(context);
    });

    // Add the disposable to the context's subscriptions
    // This ensures that the command is properly disposed of when the extension is deactivated
    context.subscriptions.push(disposable);
}

export function deactivate() {}
