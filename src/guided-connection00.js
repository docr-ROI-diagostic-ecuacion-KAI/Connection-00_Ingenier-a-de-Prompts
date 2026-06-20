const logoUrl = 'https://docroi.marketing/wp-content/uploads/2024/12/Logo_Doctor_ROI.jpg';
const botiquinUrl = 'https://el-botiquin-del-doc-roi.vercel.app/';
const buyerPersonaUrl = 'https://el-botiquin-del-doc-roi.vercel.app/';
const productSheetUrl = 'https://el-botiquin-del-doc-roi.vercel.app/';

const fields = ['objective', 'buyerPersona', 'product', 'visualIdentity', 'references', 'tone', 'outputFormat', 'context'];

function readBrief() {
  try { return JSON.parse(localStorage.getItem('docroi.connection00.brief') || '{}'); } catch { return {}; }
}
function writeBrief(next) {
  localStorage.setItem('docroi.connection00.brief', JSON.stringify(next));
}
function buildPrompt(brief) {
  return [
    ['OBJETIVO DEL RESULTADO', brief.objective],
    ['BUYER PERSONA', brief.buyerPersona],
    ['FICHA DE PRODUCTO', brief.product],
    ['IDENTIDAD VISUAL', brief.visualIdentity],
    ['URL / REFERENCIAS', brief.references],
    ['TONO Y ESTILO', brief.tone],
    ['FORMATO DE SALIDA', brief.outputFormat],
    ['CONTEXTO Y CUMPLIMIENTO', brief.context],
    ['MATERIALES ADICIONALES', [brief.includeLogo && 'Subir logo después.', brief.includeBuyerFile && 'Adjuntar ficha Buyer Persona.', brief.includeProductFile && 'Adjuntar ficha de producto.', brief.includeImages && 'Adjuntar fotos reales.'].filter(Boolean).join('\n')]
  ].filter(([, value]) => value && String(value).trim()).map(([label, value]) => `${label}:\n${String(value).trim()}`).join('\n\n');
}

function injectStyle() {
  if (document.getElementById('connection00-guided-style')) return;
  const style = document.createElement('style');
  style.id = 'connection00-guided-style';
  style.textContent = `
    .connection00-builder{display:grid;grid-template-columns:1fr;gap:16px;align-items:start}.connection00-main{display:grid;gap:16px}.connection00-objective,.connection00-card,.connection00-preview{background:#fff;border:1px solid #E6EAF0;border-radius:8px;padding:clamp(18px,3vw,24px);box-shadow:0 18px 44px rgba(11,15,25,.06)}.connection00-objective{background:#06101F;color:#fff}.connection00-objective span{display:inline-flex;color:#D8ECF8;font-size:12px;font-weight:950;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px}.connection00-objective h2{margin:0 0 12px;color:#fff;font-size:clamp(30px,6vw,48px);line-height:1.04;font-weight:950}.connection00-objective p{color:#EAF6FB;line-height:1.7;max-width:780px;margin:0 0 16px}.connection00-objective a{color:#fff;font-weight:950;text-decoration-thickness:2px;text-underline-offset:4px}.connection00-builder textarea{width:100%;min-height:150px;border:1px solid #E6EAF0;border-radius:8px;padding:14px;font:inherit;line-height:1.55;resize:vertical}.connection00-builder input{width:100%;border:1px solid #E6EAF0;border-radius:8px;padding:12px;font:inherit}.connection00-grid{display:grid;grid-template-columns:1fr;gap:12px}.connection00-card h3{margin:0;color:#0B0F19;font-size:18px;font-weight:950}.connection00-card p{margin:6px 0 14px;color:#4B5563;line-height:1.6}.connection00-title{display:flex;align-items:center;justify-content:space-between;gap:12px}.connection00-help{width:34px;height:34px;min-height:34px;padding:0;border-radius:999px;background:#D8ECF8;color:#003B5C;border:1px solid #B7D9EA;font-weight:950}.connection00-tip{display:none;margin:12px 0 14px;padding:12px;border:1px solid #B7D9EA;border-radius:8px;background:#F7FBFE;color:#4B5563}.connection00-tip.is-open{display:block}.connection00-tip a{display:inline-flex;margin-top:8px;color:#003B5C;font-weight:950;text-decoration:none}.connection00-pair{display:grid;grid-template-columns:1fr;gap:12px}.connection00-preview{position:relative;display:grid;gap:14px}.connection00-preview pre{min-height:320px;white-space:pre-wrap;word-break:break-word;background:linear-gradient(135deg,#07111D 0%,#003B5C 100%);color:#fff;border-radius:8px;padding:16px;line-height:1.55}.connection00-actions{display:grid;gap:10px}.connection00-actions button{width:100%}.connection00-primary{background:#003B5C!important;color:#fff!important;border-color:#003B5C!important}.connection00-checklist{display:grid;gap:10px}.connection00-checklist label{display:grid;grid-template-columns:22px 1fr;align-items:start;gap:8px;background:#F7FBFE;border:1px solid #E6EAF0;border-radius:8px;padding:12px;color:#4B5563;font-size:14px;line-height:1.4}.connection00-checklist input{width:18px;height:18px;padding:0;accent-color:#003B5C}@media(min-width:880px){.connection00-builder{grid-template-columns:minmax(0,1fr)360px}.connection00-preview{position:sticky;top:150px}.connection00-pair{grid-template-columns:1fr 1fr}}
  `;
  document.head.appendChild(style);
}

function fieldMarkup() {
  return `
    <section class="connection00-builder">
      <div class="connection00-main">
        <article class="connection00-objective"><span>Objetivo del resultado</span><h2>Aprende jugando a programar la IA generativa</h2><p>Explica qué quieres conseguir. Puedes apoyarte en la píldora de <a href="${buyerPersonaUrl}" target="_blank" rel="noreferrer">Buyer Persona</a> y en la <a href="${productSheetUrl}" target="_blank" rel="noreferrer">ficha de producto</a> para completar mejor el prompt.</p><textarea data-field="objective" placeholder="Ej. Quiero crear un prompt para generar una landing de venta clara, profesional y coherente con Doc ROI."></textarea></article>
        <article class="connection00-card"><div class="connection00-title"><h3>Buyer Persona</h3><button class="connection00-help" data-tip="buyer" type="button">?</button></div><div class="connection00-tip" id="tip-buyer">Si haces clic te lleva a la píldora de Buyer Persona. Si aún no la tienes, describe aquí a quién quieres dirigirte.<br><a href="${buyerPersonaUrl}" target="_blank" rel="noreferrer">Abrir píldora Buyer Persona →</a></div><textarea data-field="buyerPersona" placeholder="Perfil, necesidades, objeciones, tono, nivel de conocimiento y motivaciones."></textarea></article>
        <article class="connection00-card"><div class="connection00-title"><h3>Ficha de producto / conocimiento</h3><button class="connection00-help" data-tip="product" type="button">?</button></div><div class="connection00-tip" id="tip-product">Si haces clic te lleva a la ficha de producto. Si aún no existe, describe aquí qué vendes o qué quieres explicar.<br><a href="${productSheetUrl}" target="_blank" rel="noreferrer">Abrir ficha de producto →</a></div><textarea data-field="product" placeholder="Propuesta de valor, beneficios, precio, objeciones, prueba social, disponibilidad y uso."></textarea></article>
        <article class="connection00-card"><h3>Identidad visual</h3><p>Define marca, tono, colores, enlaces y estilo visual.</p><div class="connection00-pair"><input data-field="visualIdentity" placeholder="Marca, colores, estilo visual"><input data-field="references" placeholder="URL, logo o referencia"><input data-field="tone" placeholder="Tono: claro, cercano, experto"><input data-field="outputFormat" placeholder="Formato esperado"></div></article>
        <article class="connection00-card"><h3>Contexto y cumplimiento</h3><p>Incluye datos de contacto, restricciones, límites legales o condiciones que la IA debe respetar.</p><textarea data-field="context" placeholder="Teléfono, email, dirección, sector, país, claims permitidos o información sensible que no debe inventarse."></textarea></article>
      </div>
      <aside class="connection00-preview"><h3>Prompt completo</h3><pre id="connection00-prompt-preview"></pre><div class="connection00-actions"><button type="button" id="connection00-copy">Copiar prompt</button><button type="button" id="connection00-save" class="connection00-primary">Guardar receta final</button></div><div class="connection00-checklist"><label><input type="checkbox" data-field="includeLogo">Subir logo después</label><label><input type="checkbox" data-field="includeBuyerFile">Adjuntar ficha Buyer Persona</label><label><input type="checkbox" data-field="includeProductFile">Adjuntar ficha de producto</label><label><input type="checkbox" data-field="includeImages">Adjuntar fotos reales</label></div></aside>
    </section>`;
}

export function enhanceConnection00() {
  injectStyle();
  const legacyBlock = document.getElementById('bloque-formativo');
  if (legacyBlock) legacyBlock.remove();

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const replacements = [];
  while (walker.nextNode()) {
    if (walker.currentNode.nodeValue.includes('Aprende jugando a programar la máquina')) replacements.push(walker.currentNode);
  }
  replacements.forEach((node) => { node.nodeValue = node.nodeValue.replace('Aprende jugando a programar la máquina', 'Aprende jugando a programar la IA generativa'); });

  const active = [...document.querySelectorAll('.tabs button')].find((button) => button.classList.contains('active'));
  if (!active || active.textContent.trim().toLowerCase() !== 'constructor') return;
  const main = document.querySelector('main');
  if (!main || main.querySelector('.connection00-builder')) return;
  main.innerHTML = fieldMarkup();

  const brief = readBrief();
  const render = () => {
    const next = readBrief();
    const prompt = buildPrompt(next) || 'OBJETIVO DEL RESULTADO:\n\nBUYER PERSONA:\n\nFICHA DE PRODUCTO:';
    const preview = document.getElementById('connection00-prompt-preview');
    if (preview) preview.textContent = prompt;
  };

  fields.forEach((field) => {
    const el = main.querySelector(`[data-field="${field}"]`);
    if (el) {
      el.value = brief[field] || '';
      el.addEventListener('input', () => { const next = readBrief(); next[field] = el.value; writeBrief(next); render(); });
    }
  });
  ['includeLogo', 'includeBuyerFile', 'includeProductFile', 'includeImages'].forEach((field) => {
    const el = main.querySelector(`[data-field="${field}"]`);
    if (el) {
      el.checked = Boolean(brief[field]);
      el.addEventListener('change', () => { const next = readBrief(); next[field] = el.checked; writeBrief(next); render(); });
    }
  });
  main.querySelectorAll('.connection00-help').forEach((button) => button.addEventListener('click', () => document.getElementById(`tip-${button.dataset.tip}`)?.classList.toggle('is-open')));
  main.querySelector('#connection00-copy')?.addEventListener('click', () => navigator.clipboard.writeText(buildPrompt(readBrief())));
  main.querySelector('#connection00-save')?.addEventListener('click', () => {
    localStorage.setItem('prompt', buildPrompt(readBrief()));
    localStorage.setItem('recipeName', 'Mi instrucción estructurada');
    [...document.querySelectorAll('.tabs button')].find((button) => button.textContent.trim().toLowerCase() === 'receta')?.click();
  });
  render();
}

export function installConnection00Hooks() {
  const run = () => setTimeout(enhanceConnection00, 40);
  requestAnimationFrame(run);
  setTimeout(run, 250);
  document.addEventListener('click', (event) => {
    if (event.target.closest('.tabs button')) run();
  });
}
