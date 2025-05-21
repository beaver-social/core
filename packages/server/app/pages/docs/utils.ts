import MarkdownIt from "markdown-it";

// Create markdown parser instance
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

// Helper function to load and render markdown content
export async function generateDocContent(data: string): Promise<string> {
  try {
    // Parse markdown to HTML
    const html = md.render(data);
    return html;
  } catch (error) {
    console.error(`Error parsing markdown.`, error);
    return `
      <h2>Documentation Error</h2>
      <p>We're sorry, but there was an error loading the documentation.</p>
      <p>Please try another topic from the navigation menu.</p>
    `;
  }
}
