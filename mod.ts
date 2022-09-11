import { emojify, htmlEscape, Marked, Prism } from "./deps.ts";

class Renderer extends Marked.Renderer {
  code(code: string, language?: string) {
    // a language of `ts, ignore` should really be `ts`
    language = language?.split(",")?.[0];
    const grammar =
      language && Object.hasOwnProperty.call(Prism.languages, language)
        ? Prism.languages[language]
        : undefined;
    if (grammar === undefined) {
      return `<pre><code class="notranslate">${htmlEscape(code)}</code></pre>`;
    }
    const html = Prism.highlight(code, grammar, language!);
    return `<pre class="highlight highlight-source-${language} notranslate">${html}</pre>`;
  }
}

export const render = (markdown: string): string => {
  markdown = emojify(markdown);

  const html = Marked.marked(markdown, {
    renderer: new Renderer(),
  });

  return html;
};

// await Deno.writeTextFile(
//   "./demo.html",
//   render(`# Hello, world!

// | Type | Value |
// | ---- | ----- |
// | x    | 42    |

// \`\`\`svelte
// <script>
//   let count = 0;
// </script>

// <button on:click={ () => count++ }>Hello</button>

// <h1>{ count }</h1>

// <ul>
//   {#each Array(10).map((_, i) => i) as }
//     <li on:click={() => count = i}>Set count to {i}</li>
//   {/each}
// </ul>
// \`\`\``)
// );

// // Learn more at https://deno.land/manual/examples/module_metadata#concepts
// if (import.meta.main) {
//   console.log("Add 2 + 3 =", add(2, 3));
// }
