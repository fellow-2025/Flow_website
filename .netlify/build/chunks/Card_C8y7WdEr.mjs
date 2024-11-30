import { c as createComponent, r as renderTemplate, m as maybeRenderHead, f as renderSlot, a as addAttribute, b as createAstro } from './astro/server_DdE926XU.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                        */

const $$Container = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mx-5 md:mx-56 mb-16"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/layouts/Container.astro", void 0);

const $$Astro = createAstro();
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Card;
  const { href, title, body } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="link-card" data-astro-cid-dohjnao5> <a${addAttribute(href, "href")} data-astro-cid-dohjnao5> <h2 class="text-lg mb-3" data-astro-cid-dohjnao5> ${title} <span data-astro-cid-dohjnao5>&rarr;</span> </h2> <p data-astro-cid-dohjnao5> ${body} </p> </a> </div> `;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/components/Card.astro", void 0);

export { $$Card as $, $$Container as a };
