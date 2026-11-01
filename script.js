(() => {
  'use strict';
  document.documentElement.classList.add('js-ready');
  const translations = {
    it: {
      'nav.philosophy':'Filosofia','nav.focus':'Competenze','nav.products':'Prodotti in gestione','nav.treasury':'Patrimonio gestito','nav.founder':'Il fondatore','nav.contact':'Contatti',
      'hero.eyebrow':'PRIVATE CAPITAL · DIGITAL ASSETS',
      'hero.headline':'Il capitale merita <em>una visione.</em>',
      'hero.description':'Strategie di investimento orientate al lungo periodo. Un approccio personale ai patrimoni privati, con una conoscenza dei mercati delle criptovalute maturata dal 2017.',
      'hero.cta1':'Scopri la nostra visione','hero.cta2':'Conosci il fondatore','hero.marker':'ANALISI · DISCIPLINA · CONTROLLO DEL RISCHIO',
      'hero.artlabel':'UNA VISIONE INDIPENDENTE','hero.artbottom':'BUILT ON CONVICTION.','hero.scroll':'ESPLORA IL NOSTRO APPROCCIO',
      'values.one':'VISIONE','values.two':'CONVINZIONE','values.three':'DISCIPLINA','values.four':'RESPONSABILITÀ',
      'philosophy.label':'LA FILOSOFIA','philosophy.title':'Non inseguire il mercato.<br/><em>Comprenderlo.</em>',
      'philosophy.lead':'Crediamo in scelte fondate su analisi, consapevolezza e una visione chiara del capitale.',
      'philosophy.body':'I mercati digitali offrono opportunità, ma comportano anche volatilità e rischi significativi. Per questo ogni decisione richiede metodo, attenzione all’esposizione e capacità di guardare oltre il breve periodo.',
      'philosophy.link':'Il nostro approccio','metric.first':'INIZIO DEL PERCORSO NEI MERCATI CRYPTO','metric.second':'VISIONE PERSONALE DEL CAPITALE','metric.third':'ATTENZIONE AL LUNGO PERIODO',
      'expertise.label':'AMBITI DI INTERESSE','expertise.title':'Tre pilastri.<br/><em>Un’unica direzione.</em>',
      'expertise.intro':'Una lettura del mercato che unisce conoscenza dell’ecosistema crypto, attenzione al patrimonio e visione strategica.',
      'service.one.title':'Digital assets','service.one.text':'Analisi dei mercati crypto, delle tecnologie blockchain e delle opportunità offerte dall’evoluzione degli asset digitali.','service.one.tag':'RICERCA & MERCATI',
      'service.two.title':'Patrimoni privati','service.two.text':'Una prospettiva focalizzata sulle esigenze del capitale privato, sulla selezione delle strategie e sull’equilibrio tra obiettivi e rischio.','service.two.tag':'STRATEGIA & CAPITALE',
      'service.three.title':'Gestione del rischio','service.three.text':'Disciplina operativa, attenzione alla volatilità e valutazione costante delle possibili perdite: il rischio è parte integrante di ogni scelta.','service.three.tag':'METODO & RESPONSABILITÀ',
      'products.label':'PRODOTTI IN GESTIONE','products.title':'Tecnologia dedicata<br/><em>agli asset digitali.</em>',
      'products.intro':'Sviluppiamo strumenti per rendere più chiaro e accessibile il monitoraggio degli investimenti digitali.',
      'products.badge':'PIATTAFORMA DI MONITORAGGIO',
      'products.description':'Piattaforma dedicata al monitoraggio dell’andamento di Injective (INJ): prezzo di mercato, valore dei wallet, staking e reward, attraverso un’interfaccia dinamica con dati aggiornati.',
      'treasury.label':'PATRIMONIO GESTITO','treasury.title':'Il patrimonio.<br/><em>In tempo reale.</em>',
      'treasury.intro':'Una panoramica aggregata dei 5 wallet della INJ Node Treasury. Gli indirizzi non sono mostrati nella pagina, ma sono consultabili nel codice pubblico del sito.',
      'treasury.connecting':'Connessione ai dati...','treasury.online':'DATI AGGIORNATI','treasury.offline':'DATI NON DISPONIBILI',
      'treasury.total':'CONTROVALORE IN GESTIONE · USD','treasury.injBasis':'PATRIMONIO IN INJ',
      'treasury.pnlLabel':'P/L DI MERCATO · 24 ORE','treasury.estimate':'STIMA BASATA SULLA VARIAZIONE DI PREZZO INJ',
      'treasury.wallets':'WALLET INCLUSI','treasury.staking':'IN STAKING','treasury.rewards':'REWARD DISPONIBILI',
      'treasury.price':'PREZZO INJ · USD','treasury.waiting':'In attesa del primo aggiornamento',
      'treasury.refresh':'AGGIORNAMENTO AUTOMATICO · 30S','treasury.updated':'Ultimo aggiornamento',
      'treasury.error':'Connessione non disponibile · nuovo tentativo automatico',
      'treasury.note':'I valori comprendono soltanto INJ disponibili, in staking, in sblocco e reward non riscossi. Il P/L 24h è una stima dell’effetto della variazione di prezzo sui saldi correnti: non rappresenta il profitto effettivamente realizzato e non include flussi o altri asset. Se le fonti dati non sono disponibili, le cifre non vengono simulate.',
      'founder.label':'IL FONDATORE','founder.role':'FOUNDER & CEO','founder.portraitTag':'FOUNDER PROFILE','founder.photoPlaceholder':'IL TUO RITRATTO, QUI.','founder.photoNote':'CARICA UNA FOTO PER PERSONALIZZARE L’ANTEPRIMA','founder.upload':'Carica foto',
      'founder.intro':'Classe 1995 · Nei mercati crypto dal 2017.',
      'founder.skills.title':'COMPETENZE',
      'founder.skills.hint':'Scorri per esplorare',
      'founder.skill.investor':'Investitore',
      'founder.skill.investor.desc':'Mercati crypto dal 2017',
      'founder.skill.onchain':'Analisi on-chain',
      'founder.skill.onchain.desc':'Dati di rete, wallet e flussi',
      'founder.skill.defi':'DeFi',
      'founder.skill.defi.desc':'Protocolli e finanza decentralizzata',
      'founder.skill.staking':'Staking',
      'founder.skill.staking.desc':'Ricompense, validatori e reti PoS',
      'founder.skill.research':'Ricerca crypto',
      'founder.skill.research.desc':'Mercati e asset digitali',
      'founder.skill.risk':'Gestione del rischio',
      'founder.skill.risk.desc':'Disciplina e controllo dell\'esposizione',
      'founder.skill.tracking':'Portfolio tracking',
      'founder.skill.tracking.desc':'Monitoraggio del capitale con INJ Node',
      'founder.signature':'FONDATORE & CEO · B CAPITAL GROUP',
      'manifesto.label':'IL NOSTRO PRINCIPIO','manifesto.quote':'Il profitto è un obiettivo.<br/><em>Il metodo è ciò che ci guida.</em>',
      'manifesto.body':'Ricerca, pazienza e controllo del rischio sono la base di ogni decisione. Nessuna promessa di guadagno: solo la volontà di costruire strategie fondate su un processo consapevole.',
      'contact.label':'RESTIAMO IN CONTATTO','contact.title':'Ogni visione inizia<br/><em>da un confronto.</em>',
      'contact.body':'Per informazioni su B Capital Group e per approfondire la nostra visione, utilizza i canali di contatto ufficiali quando saranno attivati.',
      'contact.top':'Torna all’inizio',
      'footer.disclaimer':'I contenuti hanno finalità esclusivamente informative e non costituiscono un’offerta, una sollecitazione all’investimento o una garanzia di rendimento. Le criptovalute comportano il rischio di perdere il capitale investito. Eventuali servizi riservati saranno prestati solo nel rispetto delle autorizzazioni e della normativa applicabile.',
      'footer.foot':'VISIONE INDIPENDENTE'
    },
    en: {
      'nav.philosophy':'Philosophy','nav.focus':'Expertise','nav.products':'Managed products','nav.treasury':'Managed capital','nav.founder':'Founder','nav.contact':'Contact',
      'hero.eyebrow':'PRIVATE CAPITAL · DIGITAL ASSETS',
      'hero.headline':'Capital deserves <em>a vision.</em>',
      'hero.description':'Long-term investment thinking. A personal approach to private capital, built on an understanding of cryptocurrency markets developed since 2017.',
      'hero.cta1':'Explore our vision','hero.cta2':'Meet the founder','hero.marker':'RESEARCH · DISCIPLINE · RISK AWARENESS',
      'hero.artlabel':'AN INDEPENDENT VISION','hero.artbottom':'BUILT ON CONVICTION.','hero.scroll':'EXPLORE OUR APPROACH',
      'values.one':'VISION','values.two':'CONVICTION','values.three':'DISCIPLINE','values.four':'RESPONSIBILITY',
      'philosophy.label':'THE PHILOSOPHY','philosophy.title':'Don’t chase the market.<br/><em>Understand it.</em>',
      'philosophy.lead':'We believe in decisions shaped by research, awareness, and a clear perspective on capital.',
      'philosophy.body':'Digital markets create opportunities, but they also involve substantial volatility and risk. Every decision therefore calls for a methodical approach, an understanding of exposure, and the ability to look beyond the short term.',
      'philosophy.link':'Our approach','metric.first':'START OF THE CRYPTO INVESTMENT JOURNEY','metric.second':'ONE PERSONAL VISION FOR CAPITAL','metric.third':'FOCUS ON THE LONG TERM',
      'expertise.label':'AREAS OF FOCUS','expertise.title':'Three pillars.<br/><em>One direction.</em>',
      'expertise.intro':'A view of markets that brings together knowledge of the crypto ecosystem, capital awareness, and strategic thinking.',
      'service.one.title':'Digital assets','service.one.text':'Research into cryptocurrency markets, blockchain technology, and opportunities arising from the evolution of digital assets.','service.one.tag':'RESEARCH & MARKETS',
      'service.two.title':'Private capital','service.two.text':'A perspective focused on private capital needs, investment strategy selection, and the balance between objectives and risk.','service.two.tag':'STRATEGY & CAPITAL',
      'service.three.title':'Risk awareness','service.three.text':'Operational discipline, attention to volatility, and ongoing evaluation of potential losses: risk is part of every decision.','service.three.tag':'METHOD & RESPONSIBILITY',
      'products.label':'MANAGED PRODUCTS','products.title':'Technology built<br/><em>for digital assets.</em>',
      'products.intro':'We develop tools to make digital investment monitoring clearer and more accessible.',
      'products.badge':'MONITORING PLATFORM',
      'products.description':'A platform for tracking Injective (INJ): market price, wallet values, staking and rewards, through a dynamic interface with regularly refreshed data.',
      'treasury.label':'MANAGED CAPITAL','treasury.title':'Capital.<br/><em>In real time.</em>',
      'treasury.intro':'An aggregate view of the five INJ Node Treasury wallets. Wallets are not shown on the page, but their public addresses are accessible in the website source.',
      'treasury.connecting':'Connecting to data...','treasury.online':'DATA UPDATED','treasury.offline':'DATA UNAVAILABLE',
      'treasury.total':'ASSETS UNDER MONITORING · USD','treasury.injBasis':'INJ HOLDINGS',
      'treasury.pnlLabel':'MARKET P/L · 24 HOURS','treasury.estimate':'ESTIMATE BASED ON THE INJ PRICE CHANGE',
      'treasury.wallets':'WALLETS INCLUDED','treasury.staking':'IN STAKING','treasury.rewards':'UNCLAIMED REWARDS',
      'treasury.price':'INJ PRICE · USD','treasury.waiting':'Waiting for first update',
      'treasury.refresh':'AUTO-REFRESH · 30S','treasury.updated':'Last updated',
      'treasury.error':'Connection unavailable · automatically retrying',
      'treasury.note':'Figures include only liquid INJ, staked INJ, unbonding INJ and unclaimed rewards. The 24h P/L estimates the effect of INJ market price movements on current holdings; it is not realized profit and does not account for cash flows or other assets. Values are never simulated if live sources are unavailable.',
      'founder.label':'THE FOUNDER','founder.role':'FOUNDER & CEO','founder.portraitTag':'FOUNDER PROFILE','founder.photoPlaceholder':'YOUR PORTRAIT GOES HERE.','founder.photoNote':'UPLOAD A PHOTO TO CUSTOMIZE THIS PREVIEW','founder.upload':'Upload photo',
      'founder.intro':'Born in 1995 · Active in crypto markets since 2017.',
      'founder.skills.title':'EXPERTISE',
      'founder.skills.hint':'Drag to explore',
      'founder.skill.investor':'Investor',
      'founder.skill.investor.desc':'In crypto markets since 2017',
      'founder.skill.onchain':'On-chain analysis',
      'founder.skill.onchain.desc':'Network data, wallets and flows',
      'founder.skill.defi':'DeFi',
      'founder.skill.defi.desc':'Decentralized-finance protocols',
      'founder.skill.staking':'Staking',
      'founder.skill.staking.desc':'Rewards, validators and PoS networks',
      'founder.skill.research':'Crypto research',
      'founder.skill.research.desc':'Markets and digital assets',
      'founder.skill.risk':'Risk management',
      'founder.skill.risk.desc':'Discipline and exposure control',
      'founder.skill.tracking':'Portfolio tracking',
      'founder.skill.tracking.desc':'Capital monitoring with INJ Node',
      'founder.signature':'FOUNDER & CEO · B CAPITAL GROUP',
      'manifesto.label':'OUR GUIDING PRINCIPLE','manifesto.quote':'Profit is the objective.<br/><em>Method is the guide.</em>',
      'manifesto.body':'Research, patience, and risk management underpin every decision. We make no promises of guaranteed returns — only a commitment to building strategies through a considered process.',
      'contact.label':'LET’S CONNECT','contact.title':'Every vision starts<br/><em>with a conversation.</em>',
      'contact.body':'For information about B Capital Group and our philosophy, use the official contact channels once they become available.',
      'contact.top':'Back to top',
      'footer.disclaimer':'This site is for informational purposes only. It does not constitute an offer, investment solicitation, or guarantee of returns. Crypto-assets involve the risk of losing invested capital. Any regulated services will only be offered in compliance with applicable laws and authorizations.',
      'footer.foot':'INDEPENDENT VISION'
    }
  };
  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);
  const header = $('.site-header');
  const menu = $('#navLinks');
  const menuButton = $('#menuButton');
  const langSwitch = $('#langSwitch');
  let currentLang = 'it';
  try { currentLang = localStorage.getItem('bcg-lang') === 'en' ? 'en' : 'it'; } catch(_) { /* local storage can be restricted */ }
  function applyLanguage(lang) {
    currentLang = lang;
    const dict = translations[lang];
    $$('[data-i18n]').forEach(el => { const key = el.getAttribute('data-i18n'); if (dict[key]) el.textContent = dict[key]; });
    $$('[data-i18n-html]').forEach(el => { const key = el.getAttribute('data-i18n-html'); if (dict[key]) el.innerHTML = dict[key]; });
    document.documentElement.lang = lang;
    $('#langLabel').textContent = lang === 'it' ? 'EN' : 'IT';
    langSwitch.setAttribute('aria-label',lang === 'it' ? 'Switch to English' : 'Passa all’italiano');
    menuButton.setAttribute('aria-label',lang === 'it' ? 'Apri menu' : 'Open menu');
    document.title = lang === 'it' ? 'B Capital Group — Private Capital & Digital Assets' : 'B Capital Group — Private Capital & Digital Assets';
    try { localStorage.setItem('bcg-lang',lang); } catch(_) {}
    document.dispatchEvent(new CustomEvent('bcg:language', {detail:{lang}}));
  }
  langSwitch.addEventListener('click',() => applyLanguage(currentLang === 'it' ? 'en' : 'it'));
  applyLanguage(currentLang);
  function closeMenu() { menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open'); }
  menuButton.addEventListener('click',() => { const open = menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open); });
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click',e => { if (!e.target.closest('.navigation')) closeMenu(); });
  function handleScroll() {
    const y=window.scrollY;
    header.classList.toggle('scrolled',y>25);
    const root=document.documentElement;
    const max=Math.max(1,root.scrollHeight - root.clientHeight);
    $('#progressLine').style.width = (Math.min(100,Math.max(0,(y / max)*100))) + '%';
  }
  window.addEventListener('scroll',handleScroll,{passive:true});
  window.addEventListener('resize',handleScroll,{passive:true});
  handleScroll();
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.11,rootMargin:'0px 0px -25px 0px'});
    revealItems.forEach(el=>revealObserver.observe(el));
  } else {revealItems.forEach(el=>el.classList.add('visible'));}
  if ('IntersectionObserver' in window) {
    const sections = $$('main section[id]');
    const links = Array.from(menu.querySelectorAll('a'));
    const navObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}}),{rootMargin:'-30% 0px -60% 0px'});
    sections.forEach(el=>navObserver.observe(el));
  }
  function initFounderSkills() {
    const viewport = $('#founderSkills');
    const track = $('#founderSkillTrack');
    if (!viewport || !track) return;
    const first = track.querySelector('.founder-skill-set');
    if (!first) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let span=0, offset=0, previousTime=0, pointerId=null, lastX=0;
    let visible=true;
    const speed=29; // pixels per second, right-to-left
    const normalize=() => {
      if (span<=0) return;
      offset=((offset % span)+span)%span-span;
    };
    const paint=() => { track.style.transform='translate3d('+offset.toFixed(2)+'px,0,0)'; };
    const measure=() => { span=first.getBoundingClientRect().width; normalize(); paint(); };
    const onPointerEnd=(event) => {
      if (event.pointerId!==pointerId) return;
      if (viewport.hasPointerCapture?.(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
      pointerId=null;
      viewport.classList.remove('is-dragging');
    };
    viewport.addEventListener('pointerdown',event=>{
      if (event.pointerType==='mouse' && event.button!==0) return;
      pointerId=event.pointerId; lastX=event.clientX;
      viewport.setPointerCapture?.(event.pointerId);
      viewport.classList.add('is-dragging');
    });
    viewport.addEventListener('pointermove',event=>{
      if (event.pointerId!==pointerId) return;
      offset+=event.clientX-lastX; lastX=event.clientX;
      normalize(); paint();
    });
    viewport.addEventListener('pointerup',onPointerEnd);
    viewport.addEventListener('pointercancel',onPointerEnd);
    viewport.addEventListener('lostpointercapture',()=>{pointerId=null;viewport.classList.remove('is-dragging');});
    viewport.addEventListener('keydown',event=>{
      if (event.key!=='ArrowLeft' && event.key!=='ArrowRight') return;
      event.preventDefault();
      offset+=event.key==='ArrowLeft'?48:-48;normalize();paint();
    });
    document.addEventListener('bcg:language',event=>{
      viewport.setAttribute('aria-label',event.detail.lang==='en'?'Founder expertise, drag to explore':'Competenze del fondatore, trascina per scorrere');
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;},{threshold:0}).observe(viewport);
    }
    window.addEventListener('resize',measure,{passive:true});
    const tick=time=>{
      const elapsed=previousTime?Math.min(time-previousTime,64):0;
      previousTime=time;
      if (visible && !document.hidden && pointerId===null && !reducedMotion.matches && span>0) {
        offset-=speed*elapsed/1000;normalize();paint();
      }
      requestAnimationFrame(tick);
    };
    measure();
    requestAnimationFrame(tick);
  }
  initFounderSkills();
  $('#year').textContent=new Date().getFullYear();
})();
