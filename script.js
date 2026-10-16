(() => {
  'use strict';
  document.documentElement.classList.add('js-ready');
  const translations = {
    it: {
      'nav.philosophy':'Filosofia','nav.focus':'Competenze','nav.founder':'Il fondatore','nav.contact':'Contatti',
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
      'founder.label':'IL FONDATORE','founder.role':'FOUNDER & CEO','founder.portraitTag':'FOUNDER PROFILE','founder.photoPlaceholder':'IL TUO RITRATTO, QUI.','founder.photoNote':'CARICA UNA FOTO PER PERSONALIZZARE L’ANTEPRIMA','founder.upload':'Carica foto',
      'founder.intro':'31 anni, classe 1995, una passione per gli investimenti e un interesse concreto per il mondo crypto dal 2017.',
      'founder.story':'Ho iniziato a investire nelle criptovalute nel 2017, sviluppando negli anni un approccio personale all’analisi dei mercati digitali. Con B Capital Group metto questa esperienza al centro di una visione dedicata ai patrimoni privati.',
      'founder.mission':'Il mio obiettivo è perseguire risultati positivi nel tempo, lavorando con disciplina, attenzione al rischio e consapevolezza che nessun investimento può garantire un profitto.',
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
      'nav.philosophy':'Philosophy','nav.focus':'Expertise','nav.founder':'Founder','nav.contact':'Contact',
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
      'founder.label':'THE FOUNDER','founder.role':'FOUNDER & CEO','founder.portraitTag':'FOUNDER PROFILE','founder.photoPlaceholder':'YOUR PORTRAIT GOES HERE.','founder.photoNote':'UPLOAD A PHOTO TO CUSTOMIZE THIS PREVIEW','founder.upload':'Upload photo',
      'founder.intro':'31 years old, born in 1995, passionate about investing and active in crypto markets since 2017.',
      'founder.story':'I began investing in cryptocurrencies in 2017, developing my own approach to digital market research over the years. With B Capital Group, I bring that experience into a vision focused on private capital.',
      'founder.mission':'My goal is to pursue positive results over time with discipline, risk awareness, and the understanding that no investment can guarantee a profit.',
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
  // The default portrait can be permanently published by adding assets/ivan-barbacini.jpg.
  const portrait=$('#portraitPhoto');
  const placeholder=$('#portraitPlaceholder');
  function showPortrait(src) {portrait.src=src;portrait.hidden=false;placeholder.hidden=true;placeholder.style.display='none';}
  let hasLocalPreview=false;
  try {
    const savedPhoto=localStorage.getItem('bcg-preview-photo');
    if(savedPhoto && savedPhoto.startsWith('data:image/')){showPortrait(savedPhoto);hasLocalPreview=true;}
  } catch(_) {}
  if (!hasLocalPreview) {
    const publishedPhoto = new Image();
    publishedPhoto.onload=()=>showPortrait('assets/ivan-barbacini.jpg');
    publishedPhoto.src='assets/ivan-barbacini.jpg';
  }
  $('.photo-upload').addEventListener('keydown', e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#photoFile').click();}});
  $('#photoFile').addEventListener('change',event=>{
    const file=event.target.files && event.target.files[0];
    if(!file)return;
    if(!file.type.startsWith('image/')){alert(currentLang==='it'?'Seleziona una fotografia valida.':'Please choose an image.');return;}
    const reader=new FileReader();
    reader.onload=()=>{
      const source=new Image();
      source.onload=()=>{
        const limit=1300,scale=Math.min(1,limit/Math.max(source.width,source.height));
        const canvas=document.createElement('canvas');
        canvas.width=Math.round(source.width*scale);canvas.height=Math.round(source.height*scale);
        const context=canvas.getContext('2d');
        context.drawImage(source,0,0,canvas.width,canvas.height);
        const data=canvas.toDataURL('image/jpeg',.83);
        showPortrait(data);
        try {localStorage.setItem('bcg-preview-photo',data);}catch(_){}
      };
      source.onerror=()=>alert(currentLang==='it'?'Formato immagine non supportato.':'Unsupported image format.');
      source.src=reader.result;
    };
    reader.readAsDataURL(file);
    event.target.value='';
  });
  $('#year').textContent=new Date().getFullYear();
})();
