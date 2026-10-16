(() => {
  'use strict';
  const ui = {
    root:document.getElementById('patrimonio'),
    usd:document.getElementById('treasuryValue'),
    holdings:document.getElementById('treasuryHoldings'),
    staked:document.getElementById('treasuryStaked'),
    rewards:document.getElementById('treasuryRewards'),
    price:document.getElementById('treasuryPrice'),
    pnl:document.getElementById('treasuryPnl'),
    pct:document.getElementById('treasuryPct'),
    updated:document.getElementById('treasuryUpdated'),
    status:document.getElementById('treasuryStatus'),
    statusText:document.getElementById('treasuryStatusText')
  };
  if (!ui.root) return;

  const dictionary = {
    it: {
      connecting:'CONNESSIONE', online:'LIVE', offline:'DATI NON DISPONIBILI',
      stale:'ULTIMO DATO DISPONIBILE', waiting:'Connessione ai cinque wallet...',
      updated:'Ultimo aggiornamento', outdated:'Dati non aggiornati',
      invalid:'Cinque wallet non configurati',
      error:'API non raggiungibili · nuovo tentativo automatico',
      realtime:'LIVE PREZZO INJ · realtime', fallback:'PREZZO INJ · aggiornamento periodico'
    },
    en: {
      connecting:'CONNECTING', online:'LIVE', offline:'DATA UNAVAILABLE',
      stale:'LAST AVAILABLE DATA', waiting:'Connecting to the five wallets...',
      updated:'Last update', outdated:'Outdated data',
      invalid:'Five wallets not configured',
      error:'APIs unavailable · automatically retrying',
      realtime:'INJ PRICE LIVE · realtime', fallback:'INJ PRICE · periodic update'
    }
  };
  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'it';
  const dict = () => dictionary[lang()];
  const wallets = window.BCG_TREASURY_WALLETS;
  const configured = Array.isArray(wallets) && wallets.length === 5 && new Set(wallets).size === 5 && wallets.every(a => typeof a === 'string' && /^inj1[a-z0-9]{38,64}$/.test(a));
  const LCD = ['https://lcd.injective.network', 'https://sentry.lcd.injective.network'];
  const POLL_MS = 60000;
  const PRICE_POLL_MS = 30000;
  const WS_URL = 'wss://stream.binance.com:9443/ws/injusdt@ticker';
  const TIMEOUT_MS = 11000;
  const DENOM = 'inj';
  const SCALE = 1e18;
  const PRICE_COIN = 'coingecko:injective-protocol';
  const state = {
    holdings:null,
    priceUsd:null,
    priceChange24hPct:null,
    lastWalletUpdate:null,
    lastPriceUpdate:null,
    wsConnected:false,
    walletTimer:null,
    priceTimer:null,
    ws:null,
    updatingWallets:false,
    lastSnapshot:null
  };
  let active = 0;
  const MAX_CONCURRENT = 5;
  const jobQueue = [];

  const nfUSD = () => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', minimumFractionDigits:2, maximumFractionDigits:2});
  const nfINJ = () => new Intl.NumberFormat(lang() === 'it' ? 'it-IT' : 'en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
  const fmtUSD = n => nfUSD().format(n);
  const fmtINJ = n => nfINJ().format(n);
  const fmtPercent = n => `${n >= 0 ? '+' : '−'}${Math.abs(n).toFixed(2)}%`;
  const safeNum = n => (n === null || n === undefined || n === '') ? null : (Number.isFinite(Number(n)) ? Number(n) : null);

  function setStatus(stateName, label) {
    ui.status.dataset.state = stateName;
    ui.statusText.textContent = label;
  }
  function setError() {
    if (state.lastSnapshot) {
      setStatus('offline', dict().stale);
      const at = new Date(state.lastSnapshot.updatedAt);
      ui.updated.textContent = `${dict().updated}: ${at.toLocaleTimeString(lang() === 'it' ? 'it-IT':'en-US')} · ${dict().outdated}`;
    } else {
      setStatus('offline', dict().offline);
      ui.updated.textContent = configured ? dict().error : dict().invalid;
    }
  }

  // Animate ONLY the digits that really changed. At rest every number is neutral.
  function renderAnimated(el, text, direction='neutral', highlight=true) {
    const prev = el.dataset.displayValue || '';
    if (prev === text) return;
    el.dataset.displayValue = text;
    el.setAttribute('aria-label', text);

    // First paint and language changes are quiet: never flash a whole value.
    if (!prev || !highlight || direction === 'neutral') {
      el.textContent = text;
      return;
    }
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      // Match from right to left to keep grouping and decimal positions stable.
      const older = prev[prev.length - (text.length - i)];
      if (char !== older && /[0-9]/.test(char)) {
        const digit = document.createElement('span');
        digit.className = 'bcg-digit-' + direction;
        digit.textContent = char;
        fragment.appendChild(digit);
      } else {
        fragment.appendChild(document.createTextNode(char));
      }
    }
    el.replaceChildren(fragment);
  }

  function numberDirection(next, prev) {
    if (!Number.isFinite(next) || !Number.isFinite(prev)) return 'neutral';
    if (next > prev + 1e-9) return 'up';
    if (next < prev - 1e-9) return 'down';
    return 'neutral';
  }

  function draw(snapshot, force=false) {
    if (!snapshot) return;
    const previous = state.lastSnapshot;
    state.lastSnapshot = snapshot;
    const dirValue = previous ? numberDirection(snapshot.usdTotal, previous.usdTotal) : 'neutral';
    const dirInj = previous ? numberDirection(snapshot.injTotal, previous.injTotal) : 'neutral';
    const dirStaked = previous ? numberDirection(snapshot.stakedINJ, previous.stakedINJ) : 'neutral';
    const dirRewards = previous ? numberDirection(snapshot.rewardINJ, previous.rewardINJ) : 'neutral';
    const dirPrice = previous ? numberDirection(snapshot.priceUsd, previous.priceUsd) : 'neutral';
    const dirPnl = previous ? numberDirection(snapshot.marketPnl24hUsd, previous.marketPnl24hUsd) : 'neutral';
    const dirPct = previous ? numberDirection(snapshot.priceChange24hPct, previous.priceChange24hPct) : 'neutral';
    const showChange = Boolean(previous) && !force;

    renderAnimated(ui.usd, fmtUSD(snapshot.usdTotal), dirValue, showChange);
    renderAnimated(ui.holdings, `${fmtINJ(snapshot.injTotal)} INJ`, dirInj, showChange);
    renderAnimated(ui.staked, `${fmtINJ(snapshot.stakedINJ)} INJ`, dirStaked, showChange);
    renderAnimated(ui.rewards, `${fmtINJ(snapshot.rewardINJ)} INJ`, dirRewards, showChange);
    renderAnimated(ui.price, fmtUSD(snapshot.priceUsd), dirPrice, showChange);

    // No persistent profit/loss color: flash briefly, then return to neutral.
    for (const el of [ui.pnl, ui.pct]) el.classList.remove('positive','negative','neutral');
    if (Number.isFinite(snapshot.marketPnl24hUsd) && Number.isFinite(snapshot.priceChange24hPct)) {
      renderAnimated(ui.pnl, `${snapshot.marketPnl24hUsd >= 0 ? '+' : '−'}${fmtUSD(Math.abs(snapshot.marketPnl24hUsd))}`, dirPnl, showChange);
      renderAnimated(ui.pct, fmtPercent(snapshot.priceChange24hPct), dirPct, showChange);
    } else {
      renderAnimated(ui.pnl, '—', 'neutral');
      renderAnimated(ui.pct, '—', 'neutral');
    }

    const time = new Date(snapshot.updatedAt).toLocaleTimeString(lang() === 'it' ? 'it-IT' : 'en-US', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
    ui.updated.textContent = `${dict().updated}: ${time} · ${state.wsConnected ? dict().realtime : dict().fallback}`;
    setStatus('online', dict().online);
  }

  async function getJson(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, { signal:controller.signal, cache:'no-store', credentials:'omit' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } finally { clearTimeout(timeout); }
  }

  function limited(task) {
    return new Promise((resolve,reject) => { jobQueue.push({task,resolve,reject}); pump(); });
  }
  function pump() {
    while (active < MAX_CONCURRENT && jobQueue.length) {
      const next = jobQueue.shift();
      active++;
      Promise.resolve().then(next.task).then(next.resolve, next.reject).finally(() => { active--; pump(); });
    }
  }
  async function lcd(path) {
    return limited(async () => {
      let lastError;
      for (const root of LCD) {
        try { return await getJson(root + path); } catch (e) { lastError = e; }
      }
      throw lastError || new Error('Injective LCD unavailable');
    });
  }

  const asInj = value => {
    const n = Number(value || 0);
    if (!Number.isFinite(n) || n < 0) throw new Error('Invalid on-chain amount');
    return n / SCALE;
  };
  const sumCoins = coins => (Array.isArray(coins) ? coins : []).reduce((sum, c) => sum + (c.denom === DENOM ? asInj(c.amount) : 0), 0);

  async function readWallet(address) {
    const a = encodeURIComponent(address);
    const [bank, delegations, rewards, unbonding] = await Promise.all([
      lcd(`/cosmos/bank/v1beta1/balances/${a}?pagination.limit=1000`),
      lcd(`/cosmos/staking/v1beta1/delegations/${a}?pagination.limit=100`),
      lcd(`/cosmos/distribution/v1beta1/delegators/${a}/rewards`),
      lcd(`/cosmos/staking/v1beta1/delegators/${a}/unbonding_delegations?pagination.limit=100`)
    ]);
    return {
      liquid:sumCoins(bank?.balances),
      staked:(delegations?.delegation_responses || []).reduce((sum, entry) => sum + sumCoins([entry.balance]), 0),
      rewards:sumCoins(rewards?.total),
      unbonding:(unbonding?.unbonding_responses || []).reduce((sum, entry) => sum + (entry.entries || []).reduce((s, row) => s + asInj(row.balance), 0), 0)
    };
  }

  async function getPriceSnapshot() {
    try {
      const data = await getJson('https://api.coingecko.com/api/v3/simple/price?ids=injective-protocol&vs_currencies=usd&include_24hr_change=true');
      const obj = data?.['injective-protocol'];
      const usd = Number(obj?.usd);
      if (!(usd > 0)) throw new Error('Invalid CoinGecko price');
      const pct = obj?.usd_24h_change === null || obj?.usd_24h_change === undefined ? null : Number(obj.usd_24h_change);
      return { usd, change24hPct:Number.isFinite(pct) && pct > -100 ? pct : null };
    } catch (_) {
      const yesterday = Math.floor(Date.now()/1000) - 86400;
      const [now, then] = await Promise.all([
        getJson(`https://coins.llama.fi/prices/current/${PRICE_COIN}`),
        getJson(`https://coins.llama.fi/prices/historical/${yesterday}/${PRICE_COIN}`)
      ]);
      const current = Number(now?.coins?.[PRICE_COIN]?.price);
      const previous = Number(then?.coins?.[PRICE_COIN]?.price);
      if (!(current > 0)) throw new Error('No valid INJ/USD price');
      return { usd:current, change24hPct:previous > 0 ? (current / previous - 1) * 100 : null };
    }
  }

  function buildSnapshot() {
    if (!state.holdings || !Number.isFinite(state.priceUsd)) return null;
    const totals = state.holdings;
    const injTotal = totals.liquid + totals.staked + totals.rewards + totals.unbonding;
    const pct = safeNum(state.priceChange24hPct);
    const priceYesterday = Number.isFinite(pct) && pct > -100 ? state.priceUsd / (1 + pct / 100) : null;
    const marketPnl24hUsd = priceYesterday === null ? null : injTotal * (state.priceUsd - priceYesterday);
    return {
      walletCount:5, injTotal, stakedINJ:totals.staked, rewardINJ:totals.rewards,
      availableINJ:totals.liquid, unbondingINJ:totals.unbonding,
      usdTotal:injTotal * state.priceUsd, priceUsd:state.priceUsd,
      priceChange24hPct:pct, marketPnl24hUsd, updatedAt:new Date().toISOString()
    };
  }

  async function refreshWallets() {
    if (!configured || state.updatingWallets || document.visibilityState === 'hidden') return;
    state.updatingWallets = true;
    if (!state.lastSnapshot) setStatus('loading', dict().connecting);
    try {
      const rows = await Promise.all(wallets.map(readWallet));
      state.holdings = rows.reduce((sum, row) => {
        sum.liquid += row.liquid; sum.staked += row.staked; sum.rewards += row.rewards; sum.unbonding += row.unbonding;
        return sum;
      }, {liquid:0, staked:0, rewards:0, unbonding:0});
      state.lastWalletUpdate = Date.now();
      const snap = buildSnapshot();
      if (snap) draw(snap);
    } catch (error) {
      console.warn('[B Capital Group] Wallets:', String(error?.message || error));
      setError();
    } finally {
      state.updatingWallets = false;
    }
  }

  async function refreshPriceFallback() {
    try {
      const price = await getPriceSnapshot();
      state.priceUsd = price.usd;
      state.priceChange24hPct = price.change24hPct;
      state.lastPriceUpdate = Date.now();
      const snap = buildSnapshot();
      if (snap) draw(snap, !state.lastSnapshot);
    } catch (error) {
      console.warn('[B Capital Group] Price:', String(error?.message || error));
      if (!state.lastSnapshot) setError();
    }
  }

  function startPriceWebSocket() {
    try { if (state.ws) state.ws.close(); } catch (_) {}
    let reconnectTimer = null;
    const ws = new WebSocket(WS_URL);
    state.ws = ws;
    ws.addEventListener('open', () => {
      state.wsConnected = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
    });
    ws.addEventListener('message', event => {
      try {
        const data = JSON.parse(event.data);
        const price = Number(data?.c);
        const pct = Number(data?.P);
        if (!(price > 0)) return;
        state.priceUsd = price;
        state.priceChange24hPct = Number.isFinite(pct) ? pct : state.priceChange24hPct;
        state.lastPriceUpdate = Date.now();
        const snap = buildSnapshot();
        if (snap) draw(snap);
      } catch (_) {}
    });
    ws.addEventListener('close', () => {
      state.wsConnected = false;
      reconnectTimer = window.setTimeout(startPriceWebSocket, 4000);
    });
    ws.addEventListener('error', () => {
      state.wsConnected = false;
      try { ws.close(); } catch (_) {}
    });
  }

  function start() {
    if (!configured) { setError(); return; }
    ui.updated.textContent = dict().waiting;
    refreshPriceFallback().then(() => refreshWallets());
    startPriceWebSocket();
    state.walletTimer = window.setInterval(refreshWallets, POLL_MS);
    state.priceTimer = window.setInterval(() => { if (!state.wsConnected) refreshPriceFallback(); }, PRICE_POLL_MS);
  }

  document.addEventListener('bcg:language', () => {
    if (state.lastSnapshot) draw(state.lastSnapshot, true);
    else if (!configured || ui.status.dataset.state === 'offline') setError();
    else setStatus('loading', dict().connecting);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      refreshPriceFallback();
      refreshWallets();
      if (!state.wsConnected) startPriceWebSocket();
    }
  });
  start();
})();
