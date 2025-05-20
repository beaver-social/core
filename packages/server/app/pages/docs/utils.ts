// Helper function to generate sample documentation content
export function generateDocContent(docId: string): string {
  switch (docId) {
    case "installation":
      return `
        <h2>Installation</h2>
        <p>Get started with Beaver Social by installing our SDK using npm or yarn:</p>
        <pre><code>npm install @beaver/client @beaver/react</code></pre>
        <p>For TypeScript users, our package includes type definitions out of the box.</p>
        
        <h3>Requirements</h3>
        <ul>
          <li>Node.js 16 or higher</li>
          <li>React 17 or higher (for React integration)</li>
        </ul>
        
        <h3>Configuration</h3>
        <p>After installation, you'll need to configure the client with your API keys. Create a <code>.env</code> file in your project root:</p>
        <pre><code>BEAVER_API_KEY=your_api_key_here
BEAVER_APP_ID=your_app_id_here</code></pre>
      `;

    case "quick-start":
      return `
        <h2>Quick Start Guide</h2>
        <p>Follow these steps to quickly integrate Beaver Social into your application:</p>
        
        <h3>1. Initialize the Client</h3>
        <pre><code>import { BeaverClient } from '@beaver/client';

const client = new BeaverClient({
  apiKey: process.env.BEAVER_API_KEY,
  appId: process.env.BEAVER_APP_ID
});</code></pre>

        <h3>2. Set Up React Provider</h3>
        <pre><code>import { BeaverProvider } from '@beaver/react';

function App() {
  return (
    <BeaverProvider client={client}>
      <YourApp />
    </BeaverProvider>
  );
}</code></pre>

        <h3>3. Use Hooks in Components</h3>
        <pre><code>import { useBeaver } from '@beaver/react';

function UserProfile() {
  const beaver = useBeaver();
  
  // Now you can access Beaver functionality
  const { data: user } = beaver.useUser('userId');
  
  return (
    <div>
      <h1>{user?.name}</h1>
      {/* Rest of your component */}
    </div>
  );
}</code></pre>
      `;

    default:
      return `
                <h2>Documentation</h2>
                <p>Select a topic from the navigation menu to view detailed documentation.</p>
                
                <blockquote>
                  <p>Beaver Social provides a comprehensive SDK for building decentralized social applications on the Sui blockchain.</p>
                </blockquote>
                
                <p>Our documentation covers everything from basic setup to advanced topics like custom smart contracts and wallet integration.</p>
                
                <h3>Explore the Docs</h3>
                <p>Use the navigation tree on the left to browse through different sections:</p>
                <ul>
                  <li><strong>Getting Started</strong> - Basic setup and configuration</li>
                  <li><strong>Core Concepts</strong> - Fundamental principles and architecture</li>
                  <li><strong>SDK Reference</strong> - Detailed API documentation</li>
                  <li><strong>Examples</strong> - Code examples and snippets</li>
                  <li><strong>Tutorials</strong> - Step-by-step guides for common tasks</li>
                </ul>
            `;
  }
}
