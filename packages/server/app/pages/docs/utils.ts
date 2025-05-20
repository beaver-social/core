import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";

// Create markdown parser instance
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

// Helper function to load and render markdown content
export function generateDocContent(docId: string): string {
  try {
    // Map of doc IDs to their corresponding markdown files
    const docFileMap: Record<string, string> = {
      installation: "1_getting_started.md",
      "quick-start": "1_getting_started.md",
      authentication: "1_getting_started.md",
      "social-graph": "2_architecture.md",
      "content-model": "2_architecture.md",
      "web3-integration": "2_architecture.md",
      "client-api": "4_beaver_client_sdk.md",
      hooks: "3_beaver_react_sdk.md",
      utilities: "4_beaver_client_sdk.md",
      "social-feed": "3_beaver_react_sdk.md",
      "user-profiles": "3_beaver_react_sdk.md",
      "wallet-connect": "3_beaver_react_sdk.md",
      "build-profile": "4_beaver_client_sdk.md",
      "create-post": "3_beaver_react_sdk.md",
      "follow-users": "3_beaver_react_sdk.md",
    };

    // Get the appropriate file for this docId
    const fileName = docFileMap[docId] || "README.md";

    // Load markdown file
    const filePath = path.join(
      process.cwd(),
      "packages/server/app/pages/docs/data",
      fileName
    );
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Parse markdown to HTML
    const html = md.render(fileContent);

    return html;
  } catch (error) {
    console.error(`Error loading documentation for ${docId}:`, error);
    return `
      <h2>Documentation Error</h2>
      <p>We're sorry, but there was an error loading the documentation for "${docId}".</p>
      <p>Please try another topic from the navigation menu.</p>
    `;
  }
}
