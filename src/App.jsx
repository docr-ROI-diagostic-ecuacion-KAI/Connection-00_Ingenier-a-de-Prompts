import { useMemo, useState } from 'react';

const logoUrl = 'https://docroi.marketing/wp-content/uploads/2026/05/Logo_Negro_DoC_ROI.jpg';

const formulas = [
  ['APE', ['ACCIÓN', 'PROPÓSITO', 'EXPECTATIVA'], 'Para convertir una intención general en una petición con resultado esperado.'],
  ['COAST', ['CONTEXTO', 'OBJETIVO', 'ACCIONES', 'ESCENARIO', 'TAREA'], 'Para estrategias, planes y decisiones donde el contexto cambia la calidad de la respuesta.'],
  ['CREATE', ['CARACTERIZACIÓN', 'REQUISICIÓN', 'EJEMPLOS', 'AJUSTES', 'TIPO', 'EXTRAS'], 'Para piezas detalladas donde importan tono, ejemplos y condiciones de entrega.'],
  ['CREO', ['CONTEXTO', 'PEDIDO', 'EXPLICACIÓN', 'RESULTADO'], 'Para explicar una necesidad y pedir una salida clara.'],
  ['CTF', ['CONTEXTO', 'TAREA', 'FORMATO'], 'Para prompts rápidos que necesitan contexto, ejecución y formato.'],
  ['ERA', ['EXPECTATIVA', 'ROL', 'ACCIÓN'], 'Para mensajes y tareas concretas donde el rol y el tono son importantes.'],
  ['GRADE', ['META', 'PEDIDO', 'ACCIÓN', 'DETALLE', 'EJEMPLOS'], 'Para obtener respuestas evaluables con detalle y referencias.'],
  ['PAIN', ['PROBLEMA', 'ACCIÓN', 'INFORMACIÓN', 'PRÓXIMOS PASOS'], 'Para diagnósticos, análisis de causas y planes correctivos.'],
  ['PECRA', ['PROPÓSITO', 'EXPECTATIVA', 'CONTEXTO', 'PEDIDO', 'ACCIÓN'], 'Para alinear objetivo, contexto y acción en trabajos de negocio.'],
  ['RACE', ['ROL', 'ACCIÓN', 'CONTEXTO', 'EXPECTATIVA'], 'Para delegar una tarea a la IA con rol experto y expectativa clara.'],
  ['RASCEF', ['ROL', 'ACCIÓN', 'PASOS', 'CONTEXTO', 'EJEMPLOS', 'FORMATO'], 'Para procesos complejos con pasos y ejemplos de referencia.'],
  ['RDIREC', ['ROL', 'DEFINICIÓN', 'INTENCIÓN', 'PEDIDO', 'EJEMPLO', 'ACLARACIÓN'], 'Para tareas que necesitan definiciones, intención editorial y aclaraciones.'],
  ['RISE', ['ROL', 'ENTRADA', 'ETAPAS', 'EXPECTATIVA'], 'Para transformar insumos en una salida por etapas.'],
  ['ROSES', ['ROL', 'OBJETIVO', 'ESCENARIO', 'SOLUCIÓN ESPERADA', 'ETAPAS'], 'Para resolver escenarios con una solución esperada.'],
  ['RSCET', ['ROL', 'SITUACIÓN', 'COMPLICACIÓN', 'EXPECTATIVA', 'TAREA'], 'Para ordenar situaciones con restricciones o complicaciones.'],
  ['RTF', ['ROL', 'TAREA', 'FORMATO'], 'Para producir entregables rápidos y bien delimitados. Alias visual pendiente: RFT.'],
  ['SPARK', ['SITUACIÓN', 'PROBLEMA', 'ASPIRACIÓN', 'RESULTADOS', 'SUERTE O DESTINO'], 'Para explorar innovación, escenarios deseados y factores fuera de control.'],
  ['TAG', ['TAREA', 'ACCIÓN', 'META'], 'Para instrucciones breves orientadas a una meta.'],
  ['TREF', ['TAREA', 'REQUISITO', 'EXPECTATIVA', 'FORMATO'], 'Para tareas con criterios de calidad y formato definido.']
].map(([id, variables, use]) => ({ id, variables, use }));

const glossary = {
  Estrategia: {
    CONTEXTO: 'Información de fondo para entender la situación o el problema.', INFORMACIÓN: 'Datos o aclaraciones necesarias para orientar la respuesta.', PROPÓSITO: 'Motivo por el que se crea el prompt.', META: 'Lo que se espera lograr.', OBJETIVO: 'Resultado que se quiere conseguir.', INTENCIÓN: 'Motivo detrás de la petición.', ASPIRACIÓN: 'Estado ideal que se desea alcanzar.', EXPECTATIVA: 'Tipo de respuesta esperada.', SITUACIÓN: 'Contexto donde se inserta el prompt.', ESCENARIO: 'Circunstancias específicas de la tarea.', PEDIDO: 'Lo que se solicita al modelo.'
  },
  Principal: {
    ROL: 'Quién o qué realiza la acción.', ACCIÓN: 'Acción específica que se desea ejecutar.', DEFINICIÓN: 'Conceptos o términos clave.', ENTRADA: 'Información necesaria para iniciar la tarea.', PROBLEMA: 'Problema que debe resolverse.', REQUISITO: 'Criterios que la respuesta debe satisfacer.'
  },
  Secundaria: {
    AJUSTES: 'Mejoras o modificaciones específicas.', CARACTERIZACIÓN: 'Papel, perfil o función específica.', COMPLICACIÓN: 'Desafíos presentes en la situación.', EXPLICACIÓN: 'Detalle de la tarea.', FORMATO: 'Cómo debe estructurarse la respuesta.'
  },
  Adicional: {
    ACLARACIÓN: 'Detalles para minimizar malentendidos.', DETALLE: 'Especificaciones precisas.', EJEMPLO: 'Ejemplo de resultado esperado.', EJEMPLOS: 'Ejemplos de resultados esperados.', EXTRAS: 'Información adicional.', 'SUERTE O DESTINO': 'Factores fuera de control.', DESTINATARIO: 'Para quién está pensada la respuesta.'
  },
  Proceso: {
    ETAPAS: 'Secuencia de acciones.', PASOS: 'Procedimientos para completar la tarea.', 'PRÓXIMOS PASOS': 'Plan posterior.', TAREA: 'Qué necesita ser hecho.', ACCIONES: 'Acciones que deben incluirse.'
  },
  Salida: {
    REQUISICIÓN: 'Lo que se espera del modelo.', RESULTADO: 'Tipo de respuesta esperada.', RESULTADOS: 'Resultados esperados.', 'SOLUCIÓN ESPERADA': 'Respuesta que se espera.', TIPO: 'Tipo de salida.', SALIDA: 'Entregable final esperado.'
  }
};

const variableList = Object.entries(glossary).flatMap(([category, items]) => Object.entries(items).map(([name, definition]) => ({ category, name, definition })));
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
const variableNames = new Set(variableList.flatMap((v) => [v.name, normalize(v.name)]));
const matrixRows = [
  ['Análisis de Entorno y Mercado', ['COAST', 'PECRA', 'CTF', 'SPARK']],
  ['Identidad y Posicionamiento', ['CREATE', 'RACE', 'ROSES', 'CREO']],
  ['Oferta y Monetización', ['PECRA', 'RACE', 'TAG', 'RDIREC']],
  ['Objetivos y KPIs', ['GRADE', 'PAIN', 'PECRA', 'RSCET']],
  ['Estrategia de Comunicación y Relación', ['CREO', 'RSCET', 'COAST', 'RISE']],
  ['Infraestructura y Recursos', ['RSCET', 'RDIREC', 'PAIN', 'CREATE']]
];

function template(names) { return names.map((name) => `${name}:`).join('\n'); }
function parsePrompt(text) {
  return text.split(/\r?\n/).map((line) => line.match(/^([A-ZÁÉÍÓÚÑ ]+):\s*(.*)$/)).filter(Boolean).map((m) => ({ raw: m[1], name: normalize(m[1]), content: m[2].trim() }));
}
function validate(text, formula) {
  const declared = parsePrompt(text);
  const recognized = declared.filter((item) => variableNames.has(item.name));
  const unknown = declared.filter((item) => !variableNames.has(item.name));
  const present = new Set(recognized.map((item) => item.name));
  const missing = formula.variables.filter((name) => !present.has(normalize(name)));
  const empty = recognized.filter((item) => item.content.length < 4);
  const hasOutput = recognized.some((item) => ['SALIDA', 'FORMATO', 'RESULTADO', 'RESULTADOS', 'SOLUCION ESPERADA', 'TIPO'].includes(item.name));
  const hasContext = recognized.some((item) => ['CONTEXTO', 'SITUACION', 'ESCENARIO'].includes(item.name));
  let score = Math.round(40 * ((formula.variables.length - missing.length) / formula.variables.length));
  if (recognized.length) score += Math.round(20 * ((recognized.length - empty.length) / recognized.length));
  if (hasOutput) score += 20;
  if (hasContext) score += 10;
  if (recognized.length >= 3 && text.trim().length > 80) score += 10;
  return { declared, recognized, unknown, missing, empty, score: Math.max(0, Math.min(100, score)), hasOutput, hasContext };
}

export default function App() {
  const [tab, setTab] = useState('inicio');
  const [formulaId, setFormulaId] = useState(localStorage.getItem('formula') || 'RTF');
  const [prompt, setPrompt] = useState(localStorage.getItem('prompt') || '');
  const [recipeName, setRecipeName] = useState(localStorage.getItem('recipeName') || 'Mi instrucción estructurada');
  const [category, setCategory] = useState('Todas');
  const [query, setQuery] = useState('');
  const formula = formulas.find((item) => item.id === formulaId) || formulas[0];
  const result = useMemo(() => validate(prompt, formula), [prompt, formula]);
  const [blocks, setBlocks] = useState(() => JSON.parse(localStorage.getItem('blocks') || '[]'));
  const [quarantine, setQuarantine] = useState(() => JSON.parse(localStorage.getItem('quarantine') || '{}'));

  function savePrompt(next) { setPrompt(next); localStorage.setItem('prompt', next); }
  function useFormula(next) { setFormulaId(next.id); localStorage.setItem('formula', next.id); savePrompt(template(next.variables)); setBlocks(next.variables.map((name) => ({ id: crypto.randomUUID(), name, content: '' }))); setTab('corrector'); }
  function addVariable(name) { savePrompt(`${prompt.trim()}\n${name}: `.trimStart()); setTab('corrector'); }
  function builderPrompt() { return blocks.map((block) => `${block.name}: ${block.content}`).join('\n'); }
  function saveRecipe() { const next = builderPrompt() || prompt; savePrompt(next); localStorage.setItem('recipeName', recipeName); setTab('receta'); }

  return <>
    <header className="top"><button onClick={() => setTab('inicio')}><img src={logoUrl} alt="Doc ROI" />Connection 00</button></header>
    <nav className="tabs">{['inicio','qué es','fórmulas','glosario','corrector','simulador','constructor','cuarentena','matriz','receta'].map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}</nav>
    <main>
      {tab === 'inicio' && <section className="hero"><div><img className="hero-logo" src={logoUrl} alt="Doc ROI" /><p className="eyebrow">Botiquín Doc ROI</p><h1>Connection 00 · Ingeniería de Prompts</h1><p className="lead">Aprende a diseñar instrucciones precisas para convertir la IA en una herramienta de trabajo más clara, útil y controlable.</p><p>Esta conexión básica prepara la forma de pedir, estructurar y revisar resultados antes de activar conexiones más avanzadas.</p><p className="note">De la petición improvisada al criterio de instrucción.</p><button className="primary" onClick={() => setTab('qué es')}>Empezar Connection 00</button><button onClick={() => setTab('constructor')}>Ir al constructor</button><button onClick={() => setTab('glosario')}>Ver glosario</button></div><aside><strong>CONTEXTO:</strong><p>Estoy preparando una sesión de IA aplicada.</p><strong>ROL:</strong><p>Actúa como consultor senior.</p><strong>SALIDA:</strong><p>Devuelve una guía breve y práctica.</p></aside></section>}
      {tab === 'qué es' && <section><Title title="Qué es un prompt" text="En lenguaje Doc ROI, un prompt es una receta: si está incompleta, la IA improvisa; si está estructurada, trabaja con más precisión." /><div className="grid"><Card title="Disciplina" text="Prompt engineering potencia modelos de lenguaje mediante diseño y prueba de entradas." /><Card title="Objetivo" text="Encontrar la ruta correcta para obtener resultados adecuados, útiles y copiables." /><Card title="Ingredientes" text="Un prompt puede contener instrucción, contexto, datos de entrada e indicador de salida." /></div><Compare left="Hazme un resumen de marketing digital." right={'CONTEXTO: Estoy preparando una clase introductoria de marketing digital.\nROL: Actúa como profesor de marketing digital.\nACCIÓN: Resume los conceptos principales.\nDETALLE: Incluye SEO, SEM, redes sociales, email marketing e IA aplicada.\nSALIDA: Devuelve una explicación clara en máximo 300 palabras.'} /></section>}
      {tab === 'fórmulas' && <section><Title title="Fórmulas de prompts" text="Elige una estructura según el tipo de trabajo que quieres pedir a la IA." /><div className="grid">{formulas.map((item) => <article className="card" key={item.id}><h3>{item.id}</h3><p>{item.use}</p><div className="chips">{item.variables.map((v) => <span key={v}>{v}</span>)}</div><button className="primary" onClick={() => useFormula(item)}>Usar esta fórmula</button></article>)}</div></section>}
      {tab === 'glosario' && <section><Title title="Glosario de variables" text="Cada variable es una pieza de la instrucción. Añádela al editor y completa su contenido." /><div className="filters"><input placeholder="Buscar variable" value={query} onChange={(e) => setQuery(e.target.value)} /><select value={category} onChange={(e) => setCategory(e.target.value)}><option>Todas</option>{Object.keys(glossary).map((c) => <option key={c}>{c}</option>)}</select></div><div className="grid">{variableList.filter((v) => (category === 'Todas' || v.category === category) && `${v.name} ${v.definition}`.toLowerCase().includes(query.toLowerCase())).map((v) => <article className="card" key={v.name}><h3>{v.name}</h3><small>{v.category}</small><p>{v.definition}</p><button onClick={() => addVariable(v.name)}>Añadir al prompt</button></article>)}</div></section>}
      {tab === 'corrector' && <section><Title title="Corrector de prompts" text="Escribe variables en mayúsculas seguidas de dos puntos y revisa el diagnóstico." /><div className="toolbar"><select value={formulaId} onChange={(e) => setFormulaId(e.target.value)}>{formulas.map((item) => <option key={item.id}>{item.id}</option>)}</select><button onClick={() => useFormula(formula)}>Cargar variables</button></div><div className="work"><div><textarea value={prompt} onChange={(e) => savePrompt(e.target.value)} placeholder="CONTEXTO:\nROL:\nACCIÓN:\nSALIDA:" />{!result.recognized.length && <p className="error">Tu prompt todavía no tiene variables reconocibles. Empieza escribiendo CONTEXTO:, ROL:, ACCIÓN: o usa una fórmula del selector.</p>}{result.missing.length > 0 && <p className="error">Faltan variables para completar esta fórmula: {result.missing.join(', ')}.</p>}{result.empty.map((item) => <p className="warn" key={item.raw}>La variable {item.raw} está declarada, pero todavía no tiene contenido.</p>)}{result.unknown.length > 0 && <p className="warn">Esta variable no pertenece al glosario de Connection 00: {result.unknown.map((i) => i.raw).join(', ')}.</p>}</div><Score result={result} /></div></section>}
      {tab === 'simulador' && <section><Title title="Simulador antes/después" text="La diferencia no está en escribir más. Está en dar mejores instrucciones." /><Compare left="Hazme una estrategia de redes sociales." right={template(formula.variables)} /><button className="primary" onClick={() => useFormula(formula)}>Abrir en corrector</button></section>}
      {tab === 'constructor' && <section><Title title="Constructor por tags" text="Elige variables, ordénalas y guarda tu plantilla de trabajo." /><div className="builder"><div className="card"><div className="chips buttons">{['CONTEXTO','ROL','ACCIÓN','DETALLE','DESTINATARIO','SALIDA','FORMATO','TAREA','EXPECTATIVA','PROBLEMA','INFORMACIÓN','PRÓXIMOS PASOS'].map((name) => <button key={name} onClick={() => setBlocks([...blocks, { id: crypto.randomUUID(), name, content: '' }])}>{name}</button>)}</div><input value={recipeName} onChange={(e) => setRecipeName(e.target.value)} /></div><div>{blocks.map((b, index) => <article className="card" key={b.id}><strong>{b.name}:</strong><textarea value={b.content} onChange={(e) => setBlocks(blocks.map((x) => x.id === b.id ? { ...x, content: e.target.value } : x))} /><button onClick={() => setBlocks(blocks.filter((x) => x.id !== b.id))}>Eliminar</button>{index > 0 && <button onClick={() => { const next=[...blocks]; [next[index-1],next[index]]=[next[index],next[index-1]]; setBlocks(next); }}>Subir</button>}</article>)}<button className="primary" onClick={saveRecipe}>Guardar mi receta</button></div><pre>{builderPrompt()}</pre></div></section>}
      {tab === 'cuarentena' && <section><Title title="Cuarentena de prompts · 10 días" text="Durante estos 10 días no se trata de escribir prompts perfectos. Se trata de acostumbrarte a pensar en variables." /><div className="grid">{['RTF','CTF','COAST','ERA','PAIN','RACE','CREATE','PECRA','RASCEF','APE'].map((id, i) => { const f = formulas.find((x) => x.id === id); const text = quarantine[i]?.text || ''; const r = validate(text, f); return <article className="card" key={i}><h3>Día {i+1}: usa {i===9?'tu propia fórmula':id}</h3><div className="chips">{f.variables.map((v)=><span key={v}>{v}</span>)}</div><textarea value={text} onChange={(e)=>setQuarantine({...quarantine,[i]:{...quarantine[i],text:e.target.value}})} />{quarantine[i]?.touched && r.missing.length > 0 && <p className="error">Faltan variables: {r.missing.join(', ')}.</p>}<button onClick={()=>{ if(r.missing.length || r.empty.length || !r.recognized.length){setQuarantine({...quarantine,[i]:{...quarantine[i],text,touched:true}})} else {const next={...quarantine,[i]:{text,touched:true,done:true}}; setQuarantine(next); localStorage.setItem('quarantine',JSON.stringify(next));}}}>{quarantine[i]?.done?'Completado':'Marcar como completado'}</button></article>; })}</div></section>}
      {tab === 'matriz' && <section><Title title="Matriz de uso" text="Haz clic en una celda para seleccionar la fórmula y abrir el corrector." /><div className="table"><table><thead><tr><th>Área</th><th>Estrategia</th><th>Negocio</th><th>Soporte</th><th>Innovación</th></tr></thead><tbody>{matrixRows.map((row)=><tr key={row[0]}><th>{row[0]}</th>{row[1].map((id)=><td key={id}><button onClick={()=>useFormula(formulas.find((f)=>f.id===id))}>{id}<small>Encaja aquí porque ayuda a ordenar la decisión.</small></button></td>)}</tr>)}</tbody></table></div></section>}
      {tab === 'receta' && <section className="recipe"><img src={logoUrl} alt="Doc ROI" /><p className="eyebrow">Receta final</p><h2>{recipeName}</h2><p>Fórmula usada: {formula.id}</p><pre>{prompt || builderPrompt()}</pre><Score result={result} /><button className="primary" onClick={() => navigator.clipboard.writeText(prompt || builderPrompt())}>Copiar</button><button onClick={() => { const blob = new Blob([prompt || builderPrompt()], { type: 'text/plain' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'connection-00-prompt.txt'; a.click(); }}>Descargar .txt</button><p>Tu instrucción estructurada ya está lista. Ahora puedes copiarla y llevarla a ChatGPT, Gemini, Claude, Copilot o cualquier asistente de IA.</p><strong>Creado y compartido por Ph. D. Jorge Lucio · Doc ROI</strong></section>}
    </main>
  </>;
}

function Title({ title, text }) { return <div className="title"><h2>{title}</h2><p>{text}</p></div>; }
function Card({ title, text }) { return <article className="card"><h3>{title}</h3><p>{text}</p></article>; }
function Compare({ left, right }) { return <div className="compare"><article><h3>Prompt débil</h3><p>{left}</p></article><article><h3>Prompt estructurado</h3><pre>{right}</pre></article></div>; }
function Score({ result }) { const weak = !result.hasOutput ? 'FORMATO / SALIDA' : !result.hasContext ? 'CONTEXTO / SITUACIÓN' : 'DETALLE'; return <aside className="score"><h3>{result.score}/100</h3><progress value={result.score} max="100" /><p><strong>Diagnóstico:</strong> {result.score > 75 ? 'Tu prompt está bien estructurado.' : 'Tu prompt ya tiene base, pero puede guiar mejor a la IA.'}</p><p><strong>Variable débil:</strong> {weak}</p><p><strong>Impacto:</strong> La IA puede responder con una estructura menos útil si falta contexto o formato.</p><p><strong>Prescripción:</strong> Añade variables explícitas y contenido suficiente.</p></aside>; }
