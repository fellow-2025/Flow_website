import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { g as decodeKey } from './chunks/astro/server_DdE926XU.mjs';

const NOOP_MIDDLEWARE_FN = (_, next) => next();

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/sabarin/Documents/Deno/Flow-site/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/vol3.BTNs9AoN.css"},{"type":"inline","content":"@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-cyrillic-ext-400-normal.BZJRkJ55.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-cyrillic-ext-400-normal.DtD_g0fW.woff) format(\"woff\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-cyrillic-400-normal.Bo6gnWEs.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-cyrillic-400-normal.h6inArLS.woff) format(\"woff\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-greek-ext-400-normal.DurV-KM9.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-greek-ext-400-normal.BfIWL1p1.woff) format(\"woff\");unicode-range:U+1F00-1FFF}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-greek-400-normal.CZJmCPdY.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-greek-400-normal.C-qB9CTB.woff) format(\"woff\");unicode-range:U+0370-03FF}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-vietnamese-400-normal.DmpbtSrx.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-vietnamese-400-normal.C_X2WPHN.woff) format(\"woff\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-latin-ext-400-normal.b0izRs8p.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-latin-ext-400-normal.B4yavu5O.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-latin-400-normal.tpsLXCSJ.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-latin-400-normal.R7DZS9ko.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\na[data-astro-cid-zetdm5md]{padding:5px;transition:all;transition-duration:.2s;border-bottom:1px dashed #999}a[data-astro-cid-zetdm5md]:hover{border-color:#fff}@keyframes flicker{0%,to{opacity:1}41.99%{opacity:1}42%{opacity:0}43%{opacity:0}43.01%{opacity:1}47.99%{opacity:1}48%{opacity:0}49%{opacity:0}49.01%{opacity:1}}.flicker[data-astro-cid-zetdm5md]{animation:flicker 2s linear infinite both}\n:root{--accent: 18, 18, 204;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}code[data-astro-cid-sckkx6r4]{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}@font-face{font-family:MaboroshiNoNijimi;src:url(/fonts/Nijimi/nijimi.woff)}html{background-color:#09090a}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BEei8o6z.js"}],"styles":[{"type":"external","src":"/_astro/vol3.BTNs9AoN.css"},{"type":"inline","content":"@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-cyrillic-ext-400-normal.BZJRkJ55.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-cyrillic-ext-400-normal.DtD_g0fW.woff) format(\"woff\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-cyrillic-400-normal.Bo6gnWEs.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-cyrillic-400-normal.h6inArLS.woff) format(\"woff\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-greek-ext-400-normal.DurV-KM9.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-greek-ext-400-normal.BfIWL1p1.woff) format(\"woff\");unicode-range:U+1F00-1FFF}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-greek-400-normal.CZJmCPdY.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-greek-400-normal.C-qB9CTB.woff) format(\"woff\");unicode-range:U+0370-03FF}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-vietnamese-400-normal.DmpbtSrx.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-vietnamese-400-normal.C_X2WPHN.woff) format(\"woff\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-latin-ext-400-normal.b0izRs8p.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-latin-ext-400-normal.B4yavu5O.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-latin-400-normal.tpsLXCSJ.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-latin-400-normal.R7DZS9ko.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n#p5Parent[data-astro-cid-bgcgalo2]{position:fixed;z-index:-10}:root{--prof-img-width: 120px}.profile-img[data-astro-cid-hqtcpoiw]{width:100%;height:auto;transition:all;transition-duration:.2s;transform:translate(0);box-shadow:0 0 #141414}.profile-img[data-astro-cid-hqtcpoiw]:hover{transform:translate(-1px,-1px);box-shadow:1px 1px .5px 1px #141414}.single[data-astro-cid-hqtcpoiw]{width:100%}a[data-astro-cid-v2cbyr3p]{border-bottom:1px dashed gray;padding:2px 3px}:root{--bg: #1e1cd0;--acc-light: #ffffff;--txt-light: var(--acc-light) }html{background-color:var(--bg);font-family:MaboroshiNoNijimi,serif;color:var(--txt-light)}hr[data-astro-cid-a6irokuy]{margin:30px 20px}h2[data-astro-cid-a6irokuy]{font-size:1.8rem;margin:15px 0;border-bottom:1px dashed #fff;padding-bottom:10px}#bg-fade[data-astro-cid-a6irokuy]{height:150px;background:#505050;background:linear-gradient(0deg,#505050b3,#50505000)}#bg-black[data-astro-cid-a6irokuy]{background:#505050;background:linear-gradient(0deg,#505050e6,#505050b3)}body{--sb-track-color: #2f2f33;--sb-thumb-color: #e2e2e2;--sb-size: 5px}body::-webkit-scrollbar{width:var(--sb-size)}body::-webkit-scrollbar-track{background:var(--sb-track-color);border-radius:3px}body::-webkit-scrollbar-thumb{background:var(--sb-thumb-color);border-radius:3px;border:1px solid #484848}@supports not selector(::-webkit-scrollbar){body{scrollbar-color:var(--sb-thumb-color) var(--sb-track-color)}}\n.link-card[data-astro-cid-dohjnao5]{transition:all;transition-duration:.2s;padding:20px;border:1px dashed #aaa;border-left:none;border-top:none}.link-card[data-astro-cid-dohjnao5]:hover,.link-card[data-astro-cid-dohjnao5]:active{border-color:#eee}\n"}],"routeData":{"route":"/events/vol3","isIndex":false,"type":"page","pattern":"^\\/events\\/vol3\\/?$","segments":[[{"content":"events","dynamic":false,"spread":false}],[{"content":"vol3","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/events/vol3.astro","pathname":"/events/vol3","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/vol3.BTNs9AoN.css"},{"type":"inline","content":"@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-cyrillic-ext-400-normal.BZJRkJ55.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-cyrillic-ext-400-normal.DtD_g0fW.woff) format(\"woff\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-cyrillic-400-normal.Bo6gnWEs.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-cyrillic-400-normal.h6inArLS.woff) format(\"woff\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-greek-ext-400-normal.DurV-KM9.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-greek-ext-400-normal.BfIWL1p1.woff) format(\"woff\");unicode-range:U+1F00-1FFF}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-greek-400-normal.CZJmCPdY.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-greek-400-normal.C-qB9CTB.woff) format(\"woff\");unicode-range:U+0370-03FF}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-vietnamese-400-normal.DmpbtSrx.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-vietnamese-400-normal.C_X2WPHN.woff) format(\"woff\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-latin-ext-400-normal.b0izRs8p.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-latin-ext-400-normal.B4yavu5O.woff) format(\"woff\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Source Sans Pro;font-style:normal;font-display:swap;font-weight:400;src:url(/_astro/source-sans-pro-latin-400-normal.tpsLXCSJ.woff2) format(\"woff2\"),url(/_astro/source-sans-pro-latin-400-normal.R7DZS9ko.woff) format(\"woff\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\n:root{--accent: 18, 18, 204;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}code[data-astro-cid-sckkx6r4]{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}@font-face{font-family:MaboroshiNoNijimi;src:url(/fonts/Nijimi/nijimi.woff)}html{background-color:#09090a}\n.link-card[data-astro-cid-dohjnao5]{transition:all;transition-duration:.2s;padding:20px;border:1px dashed #aaa;border-left:none;border-top:none}.link-card[data-astro-cid-dohjnao5]:hover,.link-card[data-astro-cid-dohjnao5]:active{border-color:#eee}\n@keyframes flicker{0%,to{opacity:1}41.99%{opacity:1}42%{opacity:0}43%{opacity:0}43.01%{opacity:1}47.99%{opacity:1}48%{opacity:0}49%{opacity:0}49.01%{opacity:1}}.flicker[data-astro-cid-j7pv25f6]{animation:flicker 2s linear infinite both}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/sabarin/Documents/Deno/Flow-site/src/pages/events/vol3.astro",{"propagation":"none","containsHead":true}],["C:/Users/sabarin/Documents/Deno/Flow-site/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/sabarin/Documents/Deno/Flow-site/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/events/vol3@_@astro":"pages/events/vol3.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_ByzJZiXY.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BEei8o6z.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/source-sans-pro-cyrillic-400-normal.Bo6gnWEs.woff2","/_astro/source-sans-pro-greek-ext-400-normal.DurV-KM9.woff2","/_astro/source-sans-pro-latin-400-normal.tpsLXCSJ.woff2","/_astro/source-sans-pro-cyrillic-ext-400-normal.BZJRkJ55.woff2","/_astro/source-sans-pro-greek-400-normal.CZJmCPdY.woff2","/_astro/source-sans-pro-vietnamese-400-normal.DmpbtSrx.woff2","/_astro/source-sans-pro-latin-ext-400-normal.b0izRs8p.woff2","/_astro/source-sans-pro-greek-ext-400-normal.BfIWL1p1.woff","/_astro/source-sans-pro-cyrillic-ext-400-normal.DtD_g0fW.woff","/_astro/source-sans-pro-cyrillic-400-normal.h6inArLS.woff","/_astro/source-sans-pro-latin-400-normal.R7DZS9ko.woff","/_astro/source-sans-pro-vietnamese-400-normal.C_X2WPHN.woff","/_astro/source-sans-pro-greek-400-normal.C-qB9CTB.woff","/_astro/source-sans-pro-latin-ext-400-normal.B4yavu5O.woff","/_astro/vol3.BTNs9AoN.css","/fav.png","/favicon.ico","/favicon_old.svg","/images/Flow_Logo_Large.webp","/images/Flow_Logo_Medium.webp","/images/Flow_Logo_Orig.webp","/images/Flow_Logo_Small.webp","/images/hitahita-logo.webp","/images/logo-circle-noname-bg-remove.png","/images/ogp.png","/images/poyo.webp","/images/tmp.bat","/_astro/hoisted.BEei8o6z.js","/fonts/Nijimi/nijimi.woff","/fonts/Nijimi/幻ノにじみ明朝.otf","/images/profile/ATm.webp","/images/profile/hitahita.webp","/images/profile/kanosei.webp","/images/profile/kondou.webp","/images/profile/kosei_nakajima.webp","/images/profile/m4ss0.webp","/images/profile/nitorin.webp","/images/profile/ruito_hasegawa.webp","/images/profile/sbm.webp","/images/profile/shigemoto-reina.webp","/images/profile/vein_01.webp","/images/profile/vein_02.webp"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"yAmmx5YnuonKUOJ4D/SmHPG6qXPQkb3tJEGkR+eklsE=","experimentalEnvGetSecretEnabled":false});

export { manifest };
