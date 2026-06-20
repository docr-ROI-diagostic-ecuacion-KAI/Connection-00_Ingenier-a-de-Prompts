import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const logoUrl = 'https://docroi.marketing/wp-content/uploads/2024/12/Logo_Doctor_ROI.jpg';
const botiquinUrl = 'https://el-botiquin-del-doc-roi.vercel.app/';

function injectDocRoiStyle() {
  if (document.getElementById('docroi-visual-kit')) return;
  const style = document.createElement('style');
  style.id = 'docroi-visual-kit';
  style.textContent = `
    body{background:radial-gradient(circle at top left,rgba(216,236,248,.82),transparent 34rem),linear-gradient(180deg,#fff 0%,#F4F8FB 42%,#fff 100%)!important;color:#0B0F19!important}.top{min-height:80px!important;padding:.75rem clamp(1rem,4vw,3rem)!important;background:linear-gradient(90deg,#03060C 0%,#071926 100%)!important;border-bottom:1px solid rgba(216,236,248,.16)!important;box-shadow:0 18px 50px rgba(0,22,35,.22)!important;display:flex!important;align-items:center!important;justify-content:space-between!important}.docroi-brand-link{display:inline-flex;align-items:center;text-decoration:none}.docroi-brand-link img{width:188px!important;height:54px!important;object-fit:contain!important;background:transparent!important;border-radius:0!important}.docroi-header-nav{display:none;align-items:center;gap:clamp(1rem,3vw,2rem)}.docroi-header-nav button{background:transparent!important;border:0!important;box-shadow:none!important;color:#EAF6FB!important;font-size:clamp(1rem,1.5vw,1.18rem)!important;font-weight:900!important;padding:.35rem 0!important;min-height:36px!important}.docroi-header-nav button:hover{color:#fff!important;border-bottom:2px solid #D8ECF8!important;transform:none!important}.tabs{top:80px!important;background:rgba(255,255,255,.94)!important}.card,.score,.recipe,.compare article,.hero aside{border-radius:8px!important;box-shadow:0 18px 44px rgba(11,15,25,.06)!important}.hero aside{box-shadow:0 28px 70px rgba(0,59,92,.12)!important}pre{background:linear-gradient(135deg,#07111D 0%,#003B5C 100%)!important}.docroi-footer{background:#000;color:#D1D5DB;padding:68px 24px 54px;text-align:center}.docroi-footer-inner{max-width:920px;margin:0 auto}.docroi-footer-logo{display:inline-flex;align-items:center;justify-content:center;margin-bottom:24px}.docroi-footer-logo img{height:72px;width:auto;display:block}.docroi-footer-consult{display:inline-flex;color:#fff;text-decoration:none;font-size:15px;font-weight:900;border-bottom:1px solid rgba(255,255,255,.42);padding-bottom:4px;margin-bottom:28px}.docroi-footer-links{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:14px;font-size:14px;line-height:1.6;margin-bottom:24px}.docroi-footer a{color:#D1D5DB;text-decoration:none}.docroi-footer-links span{opacity:.4}.docroi-footer p{margin:0;color:#C0C7D1;font-size:15px;line-height:1.9}.docroi-footer p a{display:block;color:#F3F4F6;font-weight:600}@media (min-width:760px){.docroi-header-nav{display:flex}}
  `;
  document.head.appendChild(style);
}

function applyDocRoiChrome() {
  injectDocRoiStyle();
  const header = document.querySelector('.top');
  if (header && !header.dataset.docroiReady) {
    header.dataset.docroiReady = 'true';
    header.innerHTML = `
      <a class="docroi-brand-link" href="${botiquinUrl}" target="_blank" rel="noreferrer" aria-label="Ir al Botiquín Doc ROI"><img src="${logoUrl}" alt="Doc ROI"></a>
      <nav class="docroi-header-nav" aria-label="Navegación principal Doc ROI">
        <button type="button" data-tab="qué es">Píldoras</button>
        <button type="button" data-tab="fórmulas">Vitaminas</button>
        <button type="button" data-tab="corrector">Medicinas</button>
        <button type="button" data-tab="receta">Recetas</button>
      </nav>`;
    header.querySelectorAll('[data-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        const target = [...document.querySelectorAll('.tabs button')].find((tab) => tab.textContent.trim() === button.dataset.tab);
        if (target) target.click();
      });
    });
  }

  const root = document.getElementById('root');
  if (root && !document.querySelector('.docroi-footer')) {
    root.insertAdjacentHTML('afterend', `
      <footer class="docroi-footer">
        <div class="docroi-footer-inner">
          <a href="${botiquinUrl}" target="_blank" rel="noreferrer" class="docroi-footer-logo" aria-label="Ir al Botiquín Doc ROI"><img src="${logoUrl}" alt="Doc ROI"></a>
          <div><a href="https://doc-roi-executive.vercel.app/" target="_blank" rel="noreferrer" class="docroi-footer-consult">Consulta con Doc ROI →</a></div>
          <div class="docroi-footer-links"><a href="https://docroi.marketing/aviso-legal/" target="_blank" rel="noreferrer">Política de privacidad</a><span>|</span><a href="https://docroi.marketing/aviso-legal/" target="_blank" rel="noreferrer">Aviso legal</a><span>|</span><a href="https://docroi.marketing/aviso-legal/" target="_blank" rel="noreferrer">Propiedad intelectual</a></div>
          <p>La propiedad intelectual del ecosistema Doc ROI pertenece al <a href="https://docroi.marketing/ph-d-jorge-lucio/" target="_blank" rel="noreferrer">Ph. D. Jorge Lucio Sánchez Galán.</a></p>
        </div>
      </footer>`);
  }
}

function cleanConnection00Copy() {
  const legacyBlock = document.getElementById('bloque-formativo');
  if (legacyBlock) legacyBlock.remove();

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const replacements = [];
  while (walker.nextNode()) {
    if (walker.currentNode.nodeValue.includes('Aprende jugando a programar la máquina')) {
      replacements.push(walker.currentNode);
    }
  }
  replacements.forEach((node) => {
    node.nodeValue = node.nodeValue.replace(
      'Aprende jugando a programar la máquina',
      'Aprende jugando a programar la IA generativa'
    );
  });
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

requestAnimationFrame(() => {
  cleanConnection00Copy();
  applyDocRoiChrome();
});
setTimeout(() => {
  cleanConnection00Copy();
  applyDocRoiChrome();
}, 250);
