import { emojify, htmlEscape, Marked, Prism } from "./deps.ts";

export type TableOfContents = {
  level: number;
  heading: string;
  id: string;
};

export const render = (markdown: string) => {
  const tableOfContents: TableOfContents[] = [];

  let lastHeading = "";

  class Renderer extends Marked.Renderer {
    code(code: string, language?: string) {
      // a language of `ts, ignore` should really be `ts`
      language = language?.split(",")?.[0];
      const grammar =
        language && Object.hasOwnProperty.call(Prism.languages, language)
          ? Prism.languages[language]
          : undefined;
      if (grammar === undefined) {
        return `<pre><code class="notranslate">${htmlEscape(
          code
        )}</code></pre>`;
      }
      const html = Prism.highlight(code, grammar, language!);
      return `<pre class="highlight highlight-source-${language} notranslate">${html}</pre>`;
    }

    heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6): string {
      const re = new RegExp(/^(.+?)(?:{: #(.+) })?(?:{:|$)/);
      const match = re.exec(text);
      if (!match) throw new Error("oops");
      let [_, heading, id] = match;

      if (level === 2) {
        lastHeading = text;
      }

      if (!id) {
        if (level === 2) id = heading.replace(/\s+/g, "-").toLowerCase();
        else if (level === 3)
          id = `${lastHeading}-${heading}`.replace(/\s+/g, "-").toLowerCase();
      }

      if (level === 2 || level === 3)
        tableOfContents.push({
          level,
          heading,
          id,
        });

      return `<h${level}${id ? ` id="${id}"` : ""}>${text}</h${level}>`;
    }
  }

  markdown = emojify(markdown);

  const html = Marked.marked(markdown, {
    renderer: new Renderer(),
  });

  console.log("exiting", html);
  return { contents: tableOfContents, html };
};
