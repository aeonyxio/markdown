import { assertEquals } from "https://deno.land/std@0.155.0/testing/asserts.ts";
import { render } from "./mod.ts";

Deno.test(function renderTest() {
  assertEquals(
    render(`# Hello, world!

| Type | Value |
| ---- | ----- |
| x    | 42    |

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
\`\`\``),
    `<h1 id="hello-world">Hello, world!</h1>
<table>
<thead>
<tr>
<th>Type</th>
<th>Value</th>
</tr>
</thead>
<tbody><tr>
<td>x</td>
<td>42</td>
</tr>
</tbody></table>
<pre><code class="notranslate">&lt;script&gt;
  let count = 0;
&lt;/script&gt;

&lt;button on:click={ () =&gt; count++ }&gt;Hello&lt;/button&gt;

&lt;h1&gt;{ count }&lt;/h1&gt;

&lt;ul&gt;
  {#each Array(10).map((_, i) =&gt; i) as }
    &lt;li on:click={() =&gt; count = i}&gt;Set count to {i}&lt;/li&gt;
  {/each}
&lt;/ul&gt;</code></pre>`
  );
});
