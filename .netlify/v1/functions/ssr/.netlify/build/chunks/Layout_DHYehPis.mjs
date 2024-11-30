import { c as createComponent, r as renderTemplate, a as addAttribute, e as renderHead, f as renderSlot, b as createAstro } from './astro/server_DdE926XU.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */
/* empty css                         */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, desc, favicon } = Astro2.props;
  return renderTemplate`<html lang="ja" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description"${addAttribute(desc, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml"${addAttribute(favicon, "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])}   </body></html>`;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
