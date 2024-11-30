/* empty css                                   */
import { c as createComponent, r as renderTemplate, a as addAttribute, e as renderHead, f as renderSlot, b as createAstro, m as maybeRenderHead, d as renderComponent } from '../../chunks/astro/server_DdE926XU.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                                    */
/* empty css                                   */
import { $ as $$Card, a as $$Container } from '../../chunks/Card_C8y7WdEr.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$2 = createAstro();
const $$MinimumLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MinimumLayout;
  const { title, desc, favicon } = Astro2.props;
  return renderTemplate`<html lang="ja"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(desc, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml"${addAttribute(favicon, "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/layouts/MinimumLayout.astro", void 0);

const $$Astro$1 = createAstro();
const $$V3TopList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$V3TopList;
  const { upper, lower } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<ul class="text-end my-2"> <li class="text-3xl font-bold">${upper}</li> <li class="text-lg">${lower}</li> </ul>`;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/components/v3/v3TopList.astro", void 0);

const $$V3Statements = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<p>
人が成果を上げている、新しいことを試している、挑戦している、
    そのようなものを日々目にすると、焦ってしまいます　
    そちらに引っ張られて動かないと動かないと・・・といって四方八方に意識が散ってしまうような感覚を覚えます。
    SNSを見ますが、そこではその回数が目まぐるしい。<br>
そこで、ひたひたと・・・と唱えることで、自身の中に「自身のやりたいことを
    自身のペース・やり方でやる」という意識を芽生えさせることができます。
</p> <p>
そんな、ひたひたと活動することに決めた米田ときむらのチームが「HitaHita」です。
</p> <p>
そして、HitaHitaが打ち出すオーディオビジュアルイベント「Flow」は
    パフォーマンスを行う人、そのパフォーマンスを見る人を含めた
    場全体でひたることを目指します。
</p> <p>
それぞれがひたる音や映像は様々です。<br>
そして、私たちはそれらをどれも拒みません。
</p> <p>
vol.1とvol.2に引き続き、vol.3は
<span class="mx-2">立命館大学テラスゲート</span>にて開催させていただきます。<br>
多くの音や映像を吸収しながらもなかなか自らが放出する場のなかった学生が
    自分なりにひたり、パフォーマンスする。そして、その場にいる全員が同じ音と映像でひたる。
</p> <p>
そんな空間に、ぜひ遊びに来てください。
</p>`;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/components/v3/v3Statements.astro", void 0);

const $$P5Bg = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="p5Parent" data-astro-cid-bgcgalo2></div>  `;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/components/P5bg.astro", void 0);

const $$Astro = createAstro();
const $$Performer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Performer;
  const { name, img1, img2, start, invert } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-12" data-astro-cid-hqtcpoiw> <span class="mb-2 xl:mb-0 xl:hidden self-start col-span-12 xl:col-span-2 flex items-center" data-astro-cid-hqtcpoiw> ${String(start.hr).padStart(2, "0")} : ${String(start.mn).padStart(2, "0")} ～
</span> <div class="performer grid grid-cols-6 gap-3 xl:gap-10 col-span-12 xl:col-span-10" data-astro-cid-hqtcpoiw> <img${addAttribute(["profile-img", img2 == "NOIMG" ? "col-span-6 xl:col-span-2 single inline-block" : "col-span-3 xl:col-span-1"], "class:list")}${addAttribute("/images/profile/" + img1 + ".webp", "src")}${addAttribute(`${name}\u306E\u753B\u50CF`, "alt")} data-astro-cid-hqtcpoiw> <img${addAttribute(["profile-img col-span-3 xl:col-span-1", img2 == "NOIMG" ? "hidden" : ""], "class:list")}${addAttribute("/images/profile/" + img2 + ".webp", "src")}${addAttribute(`${name}\u306E\u753B\u50CF`, "alt")} data-astro-cid-hqtcpoiw> <h3 class="flex items-center profile-name col-span-6 xl:col-span-3 text-2xl" data-astro-cid-hqtcpoiw>${name}</h3> </div> <span class="hidden xl:flex items-center justify-end col-span-2" data-astro-cid-hqtcpoiw> ${String(start.hr).padStart(2, "0")} : ${String(start.mn).padStart(2, "0")} ～
</span> </div> `;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/components/v3/Performer.astro", void 0);

const $$ExternalLinks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 px-2"> ${renderComponent($$result, "Card", $$Card, { "title": "Discord\u30B5\u30FC\u30D0\u30FC", "body": "\u958B\u50AC\u4E2D\u306E\u30C1\u30E3\u30C3\u30C8\u4EA4\u6D41\u3001\u51FA\u6F14\u8005\u52DF\u96C6\u3001Flow\u306E\u958B\u50AC\u544A\u77E5\u306A\u3069\u3092\u3053\u3061\u3089\u3067\u884C\u3044\u307E\u3059\u3002\u662F\u975E\u3054\u53C2\u52A0\u304F\u3060\u3055\u3044\uFF01", "href": "https://discord.gg/XCqhqjks9c" })} ${renderComponent($$result, "Card", $$Card, { "title": "T\u30B7\u30E3\u30C4\u3042\u308A\u307E\u3059\uFF01", "body": "Flow\u306E\u30B0\u30C3\u30BA\u3068\u3057\u3066T\u30B7\u30E3\u30C4\u3092\u4F5C\u6210\u3057\u307E\u3057\u305F\uFF01\n\u305C\u3072\u7740\u7528\u3057\u3066\u30A4\u30D9\u30F3\u30C8\u3067\u6D78\u3063\u3066\u304F\u3060\u3055\u3044\uFF01", "href": "https://hitahita.base.shop/items/91322001" })} </div>`;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/components/ExternalLinks.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div data-astro-cid-v2cbyr3p> <p class="mb-4" data-astro-cid-v2cbyr3p>
HitaHitaは きむらこうや & 米田菜々穂 のチームです。<br data-astro-cid-v2cbyr3p>
VJ や DJ , クリエイティブコーディングなどの活動を幅広く行っています。<br data-astro-cid-v2cbyr3p>
ぜひ、こちらのページからご覧ください。
</p> <a href="https://hita-hita.notion.site/HitaHita-cf92f88d0cde45b4b48da76bca617f47" data-astro-cid-v2cbyr3p>HitaHita</a> </div> `;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/components/About.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="py-4"> <small class="block text-center">&copy; 2024 HitaHita</small> <small class="block text-center">Created by sbm</small> </footer>`;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/layouts/Footer.astro", void 0);

const $$Content = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mx-5"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/components/v3/Content.astro", void 0);

const $$Vol3 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MinimumLayout", $$MinimumLayout, { "title": "FLOW vol.3", "desc": "FLOW\u306E\u7B2C3\u56DE\u30022024\u5E7412\u67084\u65E5\u306B\u958B\u50AC\u3002", "favicon": "/favicon.ico", "data-astro-cid-a6irokuy": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-a6irokuy> ${renderComponent($$result2, "P5Bg", $$P5Bg, { "data-astro-cid-a6irokuy": true })} <section id="top" class="py-5
            fullWid min-h-screen
            flex justify-between items-center flex-col" data-astro-cid-a6irokuy> <p class="font-nijimi" data-astro-cid-a6irokuy>オーディオビジュアルイベント / フロウ vol.3</p> <div class="font-shan w-4/5 md:w-1/3 pt-24" data-astro-cid-a6irokuy> <h1 class="font-nijimi mb-10" data-astro-cid-a6irokuy> <img src="/images/Flow_Logo_Large.webp" alt="Flowのロゴ" class="w-full object-contain" data-astro-cid-a6irokuy> </h1> <div class="flex flex-col items-end" data-astro-cid-a6irokuy> ${renderComponent($$result2, "V3TopList", $$V3TopList, { "upper": "12/4.WED", "lower": "18:00~21:00", "data-astro-cid-a6irokuy": true })} ${renderComponent($$result2, "V3TopList", $$V3TopList, { "upper": "at TERRACE GATE", "lower": "on Ritsumeikan Univ. OIC", "data-astro-cid-a6irokuy": true })} </div> </div> <div class="
                w-full flex
                flex-col sm:flex-row justify-around items-center gap-4
                px-5
                font-nijimi" data-astro-cid-a6irokuy> <p data-astro-cid-a6irokuy>参加無料・予約不要・入退室自由</p> <div class="flex gap-2 items-center" data-astro-cid-a6irokuy> <p class="font-nijimi" data-astro-cid-a6irokuy>Produced by HitaHita</p> <img src="/images/poyo.webp" alt="HitaHitaのロゴ" style="height:50px; width:auto;" data-astro-cid-a6irokuy> </div> </div> </section> <!-- BG FADE IN --> <div id="bg-fade" data-astro-cid-a6irokuy></div> <div id="bg-black" data-astro-cid-a6irokuy> <section data-astro-cid-a6irokuy> ${renderComponent($$result2, "Container", $$Container, { "data-astro-cid-a6irokuy": true }, { "default": ($$result3) => renderTemplate` <h2 class="text-justify" style="margin-top: 0;" data-astro-cid-a6irokuy>
Flowは<span class="text-3xl mx-1" data-astro-cid-a6irokuy>「ひたる」</span>オーディオビジュアルイベントです。
</h2> ${renderComponent($$result3, "Content", $$Content, { "data-astro-cid-a6irokuy": true }, { "default": ($$result4) => renderTemplate` <div class="my-10 grid grid-cols-1 gap-10" data-astro-cid-a6irokuy> ${renderComponent($$result4, "V3Statements", $$V3Statements, { "data-astro-cid-a6irokuy": true })} </div> ` })} ` })} </section> <!-- <Container><hr></Container> --> <section id="performers" data-astro-cid-a6irokuy> ${renderComponent($$result2, "Container", $$Container, { "data-astro-cid-a6irokuy": true }, { "default": ($$result3) => renderTemplate` <h2 data-astro-cid-a6irokuy>Flow vol.3 出演者</h2> ${renderComponent($$result3, "Content", $$Content, { "data-astro-cid-a6irokuy": true }, { "default": ($$result4) => renderTemplate` <div class="flex flex-col gap-12 xl:gap-5 p-3" data-astro-cid-a6irokuy> ${renderComponent($$result4, "Performer", $$Performer, { "name": "vein+", "img1": "vein_01", "img2": "vein_02", "start": { hr: 18, mn: 0 }, "invert": false, "data-astro-cid-a6irokuy": true })} ${renderComponent($$result4, "Performer", $$Performer, { "name": "ATm & \u306B\u3068\u308A\u3093", "img1": "ATm", "img2": "nitorin", "start": { hr: 18, mn: 25 }, "invert": false, "data-astro-cid-a6irokuy": true })} ${renderComponent($$result4, "Performer", $$Performer, { "name": "\u65E9\u304F\u5BDD\u307E\u3059 & sbm", "img1": "ruito_hasegawa", "img2": "sbm", "start": { hr: 18, mn: 50 }, "invert": false, "data-astro-cid-a6irokuy": true })}${renderComponent($$result4, "Performer", $$Performer, { "name": "HitaHita", "img1": "hitahita", "img2": "NOIMG", "start": { hr: 19, mn: 15 }, "invert": false, "data-astro-cid-a6irokuy": true })} ${renderComponent($$result4, "Performer", $$Performer, { "name": "EchoFrame", "img1": "kosei_nakajima", "img2": "shigemoto-reina", "start": { hr: 19, mn: 40 }, "invert": false, "data-astro-cid-a6irokuy": true })} ${renderComponent($$result4, "Performer", $$Performer, { "name": "M4ss0 & \u53EF\u30CE\u30A6 \u661F", "img1": "m4ss0", "img2": "kanosei", "start": { hr: 20, mn: 5 }, "invert": false, "data-astro-cid-a6irokuy": true })} ${renderComponent($$result4, "Performer", $$Performer, { "name": "\u5E30\u3063\u3066\u304D\u305F\u30A8\u30A4\u30BE\u30A6\u304F\u3093", "img1": "kondou", "img2": "sbm", "start": { hr: 20, mn: 30 }, "invert": false, "data-astro-cid-a6irokuy": true })} </div> ` })} ` })} </section> <!-- <Container><hr></Container> --> <section id="externalLinks" data-astro-cid-a6irokuy> ${renderComponent($$result2, "Container", $$Container, { "data-astro-cid-a6irokuy": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", $$Content, { "data-astro-cid-a6irokuy": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "ExternalLinks", $$ExternalLinks, { "data-astro-cid-a6irokuy": true })} ` })} ` })} </section> <!-- <Container><hr></Container> --> <section id="about" data-astro-cid-a6irokuy> ${renderComponent($$result2, "Container", $$Container, { "data-astro-cid-a6irokuy": true }, { "default": ($$result3) => renderTemplate` <h2 data-astro-cid-a6irokuy>HitaHitaとは</h2> ${renderComponent($$result3, "Content", $$Content, { "data-astro-cid-a6irokuy": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "About", $$About, { "data-astro-cid-a6irokuy": true })} ` })} ` })} </section> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-a6irokuy": true })} </div> </main> ` })} `;
}, "C:/Users/sabarin/Documents/Deno/Flow-site/src/pages/events/vol3.astro", void 0);

const $$file = "C:/Users/sabarin/Documents/Deno/Flow-site/src/pages/events/vol3.astro";
const $$url = "/events/vol3";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Vol3,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
