/* empty css                                */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DdE926XU.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_DHYehPis.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Flow Volume 3", "desc": "HitaHita\u306B\u3088\u308B\u30AA\u30FC\u30C7\u30A3\u30AA\u30D3\u30B8\u30E5\u30A2\u30EB\u30D1\u30D5\u30A9\u30FC\u30DE\u30F3\u30B9\u30A4\u30D9\u30F3\u30C8\u3001FLOW\u306E\u30A6\u30A7\u30D6\u30DA\u30FC\u30B8", "favicon": "/favicon.ico", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-zetdm5md> <!-- TITLE --> <div class="font-shan fullWid text-white gap-10 p-10 min-h-screen flex justify-center items-center flex-col" data-astro-cid-zetdm5md> <h1 class="m-0 flex justify-center" data-astro-cid-zetdm5md> <img class="flicker w-3/4" src="/images/Flow_Logo_Large.webp" alt="FLOWのロゴ" data-astro-cid-zetdm5md> </h1> <p class="text-4xl" data-astro-cid-zetdm5md>
404<br data-astro-cid-zetdm5md> </p> <a href="/" class="" data-astro-cid-zetdm5md>BACK TO TOP -- ></a> </div> </main> ` })} `;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/pages/404.astro", void 0);

const $$file = "C:/Users/sabarin/Documents/Deno/Flow-site/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
