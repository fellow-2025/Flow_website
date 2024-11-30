/* empty css                                */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DdE926XU.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_DHYehPis.mjs';
import { a as $$Container, $ as $$Card } from '../chunks/Card_C8y7WdEr.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Flow Volume 3", "desc": "HitaHita\u306B\u3088\u308B\u30AA\u30FC\u30C7\u30A3\u30AA\u30D3\u30B8\u30E5\u30A2\u30EB\u30D1\u30D5\u30A9\u30FC\u30DE\u30F3\u30B9\u30A4\u30D9\u30F3\u30C8\u3001FLOW\u306E\u30A6\u30A7\u30D6\u30DA\u30FC\u30B8", "favicon": "/favicon.ico", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="font-shan" data-astro-cid-j7pv25f6> <!-- TITLE --> <div class="fullWid p-10 min-h-screen flex justify-center items-center flex-col" data-astro-cid-j7pv25f6> <h1 class="m-0 flex justify-center" data-astro-cid-j7pv25f6> <img class="flicker w-3/4" src="/images/Flow_Logo_Large.webp" alt="FLOWのロゴ" data-astro-cid-j7pv25f6> </h1> </div> <!-- BACKNUMBERS --> ${renderComponent($$result2, "Container", $$Container, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate` <div class="text-white grid grid-cols-1 lg:grid-cols-3 gap-4" data-astro-cid-j7pv25f6> ${renderComponent($$result3, "Card", $$Card, { "title": "Vol.1", "body": "FLOW volume 1  *UNDER CONSTRUCTION*", "href": "/events/vol1", "data-astro-cid-j7pv25f6": true }, { "default": ($$result4) => renderTemplate` <small data-astro-cid-j7pv25f6>jie</small> ` })} ${renderComponent($$result3, "Card", $$Card, { "title": "Vol.2", "body": "FLOW volume 2  *UNDER CONSTRUCTION*", "href": "/events/vol2", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result3, "Card", $$Card, { "title": "Vol.3", "body": "FLOW volume 3", "href": "/events/vol3", "data-astro-cid-j7pv25f6": true })} </div> ` })} </main> ` })} `;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/pages/index.astro", void 0);

const $$file = "C:/Users/sabarin/Documents/Deno/Flow-site/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
