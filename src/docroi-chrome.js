const logoUrl = 'https://docroi.marketing/wp-content/uploads/2024/12/Logo_Doctor_ROI.jpg';
const botiquinUrl = 'https://el-botiquin-del-doc-roi.vercel.app/';

function injectChromeStyle() {
  if (document.getElementById('docroi-chrome-style')) return;
  const style = document.createElement('style');
  style.id = 'docroi-chrome-style';
  style.textContent = `
    body{background:radial-gradient(circle at top left,rgba(216,236,248,.82),transparent 34rem),linear-gradient(180deg,#fff 0%,#F4F8FB 42%,#fff 100%)!important}.top{min-height:80px!important;padding:.75rem clamp(1rem,4vw,3rem)!important;background:linear-gradient(90deg,#03060C 0%,#071926 100%)!important;border-bottom:1px solid rgba(216,236,248,.16)!important;box-shadow:0 18px 50px rgba(0,22,35,.22)!important;display:flex!important;align-items:center!important;justify-content:space-between!important}.docroi-brand-link{display:inline-flex;align-items:center;text-decoration:none}.docroi-brand-link img{width:188px!important;height:54px!important;object-fit:contain!important;background:transparent!important;border-radius:0!important}.docroi-header-nav{display:none;align-items:center;gap:clamp(1rem,3vw,2rem)}.docroi-header-nav button{background:transparent!important;border:0!important;box-shadow:none!important;color:#EAF6FB!important;font-size:clamp(1rem,1.5vw,1.18rem)!important;font-weight:900!important;padding:.35rem 0!important;min-height:36px!important}.docroi-header-nav button:hover{color:#fff!important;border-bottom:2px solid #D8ECF8!important;transform:none!important}.tabs{top:80px!important;background:rgba(255,255,255,.94)!important}.card,.score,.recipe,.compare article,.hero aside{border-radius:8px!important;box-shadow:0 18px 44px rgba(11,15,25,.06)!important}pre{background:linear-gradient(135deg,#07111D 0%,#003B5C 100%)!important}.docroi-final{width:min(1120px,calc(100% - 2rem));margin:0 auto 2rem;overflow:hidden;border-radius:0 0 18px 18px;box-shadow:0 24px 70px rgba(11,15,25,.12)}.docroi-final-inner{max-width:980px;margin:0 auto}.docroi-diiip{background:#003B5C;color:#fff;padding:56px clamp(1.25rem,5vw,4.5rem) 48px}.diiip-heading{display:grid;gap:1rem;align-items:start}.diiip-heading h2,.docroi-kai h2{margin:0;color:inherit;font-size:clamp(2.3rem,6vw,3.35rem);line-height:1;font-weight:950}.diiip-heading p{margin:0;color:#EAF6FB;line-height:1.55;font-weight:800;max-width:580px}.diiip-cards{display:grid;grid-template-columns:1fr;gap:12px;margin-top:26px}.diiip-cards article{background:#fff;color:#667085;border:1px solid #E5E7EB;border-radius:8px;padding:24px 18px;min-height:88px;display:flex;align-items:center;font-size:clamp(1rem,2vw,1.15rem);line-height:1.45;font-weight:800}.docroi-kai{background:#fff;color:#0B0F19;padding:48px clamp(1.25rem,5vw,4.5rem)}.kai-grid{display:grid;gap:1rem;align-items:start}.docroi-kai p{margin:0;color:#526175;line-height:1.7;font-weight:700}.docroi-legal-footer{background:#06101F;color:#fff;padding:42px clamp(1.25rem,5vw,4.5rem) 32px}.legal-grid{display:grid;gap:1.5rem;align-items:end}.footer-logo{display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px}.footer-logo img{height:42px;width:auto}.docroi-legal-footer strong,.docroi-legal-footer span{display:block}.docroi-legal-footer strong{font-size:1.05rem;font-weight:950}.docroi-legal-footer span{color:#9CA3AF;font-size:.82rem;margin-top:3px}.back-top{justify-self:start;display:inline-flex;align-items:center;justify-content:center;min-height:54px;padding:0 1.4rem;border-radius:999px;background:#fff;color:#003B5C;text-decoration:none;font-weight:950}.footer-links{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:12px;color:#D1D5DB;font-size:13px;line-height:1.6;margin:28px 0 12px}.footer-links a,.footer-owner a{color:#D1D5DB;text-decoration:none}.footer-links span{opacity:.4}.footer-owner{margin:0;color:#C0C7D1;text-align:center;font-size:14px;line-height:1.8}.footer-owner a{display:block;color:#F3F4F6;font-weight:700}@media(min-width:760px){.docroi-header-nav{display:flex}.diiip-heading,.kai-grid,.legal-grid{grid-template-columns:.85fr 1.15fr}.diiip-cards{grid-template-columns:repeat(3,1fr)}.back-top{justify-self:end}}
  `;
  document.head.appendChild(style);
}

function cleanCopy() {
  document.getElementById('bloque-formativo')?.remove();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) if (walker.currentNode.nodeValue.includes('Aprende jugando a programar la máquina')) nodes.push(walker.currentNode);
  nodes.forEach((node) => { node.nodeValue = node.nodeValue.replace('Aprende jugando a programar la máquina', 'Aprende jugando a programar la IA generativa'); });
}

function applyHeader() {
  const header = document.querySelector('.top');
  if (!header || header.dataset.docroiReady) return;
  header.dataset.docroiReady = 'true';
  header.innerHTML = `<a class="docroi-brand-link" href="${botiquinUrl}" target="_blank" rel="noreferrer" aria-label="Ir al Botiquín Doc ROI"><img src="${logoUrl}" alt="Doc ROI"></a><nav class="docroi-header-nav" aria-label="Navegación principal Doc ROI"><button type="button" data-tab="qué es">Píldoras</button><button type="button" data-tab="fórmulas">Vitaminas</button><button type="button" data-tab="corrector">Medicinas</button><button type="button" data-tab="receta">Recetas</button></nav>`;
  header.querySelectorAll('[data-tab]').forEach((button) => button.addEventListener('click', () => [...document.querySelectorAll('.tabs button')].find((tab) => tab.textContent.trim() === button.dataset.tab)?.click()));
}

function applyFooter() {
  const root = document.getElementById('root');
  if (!root || document.querySelector('.docroi-final')) return;
  root.insertAdjacentHTML('afterend', `<footer class="docroi-final" id="docroi-final"><section class="docroi-diiip" aria-label="Metodología DIIIP"><div class="docroi-final-inner"><div class="diiip-heading"><h2>DIIIP</h2><p>Diagnosticar, interpretar, implementar, iterar y proyectar. El prompt no es el final: es la entrada a un sistema de mejora.</p></div><div class="diiip-cards"><article>Detecta el problema real antes de pedir producción.</article><article>Convierte información dispersa en criterio útil.</article><article>Baja la respuesta a una acción concreta.</article></div></div></section><section class="docroi-kai"><div class="docroi-final-inner kai-grid"><h2>KAI · ROI</h2><p>Cuando la IA se integra en procesos medibles, deja de ser una prueba suelta y se convierte en activo operativo.</p></div></section><section class="docroi-legal-footer"><div class="docroi-final-inner legal-grid"><div><a href="${botiquinUrl}" target="_blank" rel="noreferrer" class="footer-logo" aria-label="Ir al Botiquín Doc ROI"><img src="${logoUrl}" alt="Doc ROI"></a><strong>Doc ROI · Connection 00</strong><span>Ingeniería de Prompts · Aprende jugando</span></div><a href="#top" class="back-top">Volver arriba</a></div><div class="footer-links"><a href="https://docroi.marketing/aviso-legal/" target="_blank" rel="noreferrer">Política de privacidad</a><span>|</span><a href="https://docroi.marketing/aviso-legal/" target="_blank" rel="noreferrer">Aviso legal</a><span>|</span><a href="https://docroi.marketing/aviso-legal/" target="_blank" rel="noreferrer">Propiedad intelectual</a></div><p class="footer-owner">La propiedad intelectual del ecosistema Doc ROI pertenece al <a href="https://docroi.marketing/ph-d-jorge-lucio/" target="_blank" rel="noreferrer">Ph. D. Jorge Lucio Sánchez Galán.</a></p></section></footer>`);
}

export function enhanceDocRoiChrome() {
  injectChromeStyle();
  cleanCopy();
  applyHeader();
  applyFooter();
}

export function installDocRoiChrome() {
  const run = () => setTimeout(enhanceDocRoiChrome, 40);
  requestAnimationFrame(run);
  setTimeout(run, 250);
  document.addEventListener('click', (event) => { if (event.target.closest('.tabs button')) run(); });
}
