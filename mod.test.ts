import { assertEquals } from "https://deno.land/std@0.155.0/testing/asserts.ts";
import { render } from "./mod.ts";

Deno.test(function renderTest() {
  const value = render(`\
# Hello, world!

## Section 1

| Type | Value |
| ---- | ----- |
| x    | 42    |

## Section2

### Sub-section 1

\`\`\`svelte
<script>
  let count = 0;
</script>

<button on:click={ () => count++ }>Hello</button>

<h1>{ count }</h1>

<ul>
  {#each Array(10).map((_, i) => i) as }
    <li on:click={() => count = i}>Set count to {i}</li>
  {/each}
</ul>
\`\`\`

### Sub-section 2
`);

  assertEquals(value.contents, [
    {
      level: 2,
      heading: "Section 1",
      id: "section-1",
    },
    {
      level: 2,
      heading: "Section2",
      id: "section2",
    },
    {
      level: 3,
      heading: "Sub-section 1",
      id: "section2-sub-section-1",
    },
    {
      level: 3,
      heading: "Sub-section 2",
      id: "section2-sub-section-2",
    },
  ]);
  assertEquals(
    value.html,
    '<h1>Hello, world!</h1><h2 id="section-1">Section 1</h2><table>\n<thead>\n<tr>\n<th>Type</th>\n<th>Value</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>x</td>\n<td>42</td>\n</tr>\n</tbody></table>\n<h2 id="section2">Section2</h2><h3 id="section2-sub-section-1">Sub-section 1</h3><pre class="highlight highlight-source-svelte notranslate"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">on:</span>click=</span><span class="token language-javascript"><span class="token punctuation">{</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> count<span class="token operator">++</span> <span class="token punctuation">}</span></span><span class="token punctuation">></span></span>Hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token language-javascript"><span class="token punctuation">{</span> count <span class="token punctuation">}</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>\n  <span class="token each"><span class="token punctuation">{</span><span class="token keyword">#each</span> <span class="token language-javascript"><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">_<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> i<span class="token punctuation">)</span> </span><span class="token keyword">as</span> <span class="token language-javascript"><span class="token punctuation">}</span></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name"><span class="token namespace">on:</span>click=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> count <span class="token operator">=</span> i<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>Set count to <span class="token language-javascript"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n  <span class="token each"><span class="token punctuation">{</span><span class="token keyword">/each</span><span class="token punctuation">}</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span></pre><h3 id="section2-sub-section-2">Sub-section 2</h3>'
  );
});
