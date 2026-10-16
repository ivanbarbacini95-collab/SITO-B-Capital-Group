/*
 * B Capital Group — Treasury live (browser-only, read-only)
 * Five PUBLIC addresses configured in treasury-config.js.
 * The browser reads Injective LCD endpoints and public INJ/USD prices.
 * Do not put private keys, seed phrases or API secrets in this website.
 */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  if (!$('#treasuryValue')) return;

  const ui = {
    status: $('#treasuryStatus'), statusText: $('#treasuryStatusText'),
    usd: $('#treasuryValue'), holdings: $('#treasuryHoldings'),
    pnl: $('#treasuryPnl'), pct: $('#treasuryPct'),
    staked: $('#treasuryStaked'), rewards: $('#treasuryRewards'),
    price: $('#treasuryPrice'), updated: $('#treasuryUpdated')
  };
  const dictionary = {
    it: {
      connecting:'CONNESSIONE IN CORSO', online:'DATI LIVE', offline:'DATI NON DISPONIBILI',
      stale:'ULTIMO DATO DISPONIBILE', waiting:'Connessione ai cinque wallet...',
      updated:'Ultimo aggiornamento', outdated:'Dati non aggiornati',
      invalid:'Cinque wallet non configurati',
      error:'API non raggiungibili · nuovo tentativo automatico'
    },
    en: {
      connecting:'CONNECTING', online:'LIVE DATA', offline:'DATA UNAVAILABLE',
      stale:'LAST AVAILABLE DATA', waiting:'Connecting to the five wallets...',
      updated:'Last update', outdated:'Outdated data',
      invalid:'Five wallets not configured',
      error:'APIs unavailable · automatically retrying'
    }
  };
  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'it';
  const dict = () => dictionary[lang()];
  const wallets = window.BCG_TREASURY_WALLETS;
  const configured = Array.isArray(wallets) && wallets.length === 5 &&
    new Set(wallets).size === 5 && wallets.every(a => typeof a === 'string' && /^inj1[a-z0-9]{38,64}$/.test(a));
  const LCD = ['https://lcd.injective.network', 'https://sentry.lcd.injective.network'];
  const POLL_MS = 30000;
  const TIMEOUT_MS = 11000;
  const DENOM = 'inj';
  const SCALE = 1e18;
  const PRICE_COIN = 'coingecko:injective-protocol';
  let latest = null;
  let updating = false;
  let timer;
  let active = 0;
  const MAX_CONCURRENT = 5;
  const jobQueue = [];

  const fmtUSD = n => new Intl.NumberFormat('en-US', {
    style:'currency', currency:'USD', minimumFractionDigits:2, maximumFractionDigits:2
  }).format(n);
  const fmtINJ = n => new Intl.NumberFormat(lang() === 'it' ? 'it-IT' : 'en-US', {
    minimumFractionDigits:2, maximumFractionDigits:2
  }).format(n);
  const fmtPercent = n => `${n >= 0 ? '+' : '−'}${Math.abs(n).toFixed(2)}%`;

  function setStatus(state, label) {
    ui.status.dataset.state = state;
    ui.statusText.textContent = label;
  }
  function setError() {
    if (latest) {
      setStatus('offline', dict().stale);
      const at = new Date(latest.updatedAt);
      ui.updated.textContent = `${dict().updated}: ${at.toLocaleTimeString(lang() === 'it' ? 'it-IT':'en-US')} · ${dict().outdated}`;
    } else {
      setStatus('offline', dict().offline);
      ui.updated.textContent = configured ? dict().error : dict().invalid;
    }
  }
  function draw(data) {
    latest = data;
    ui.usd.textContent = fmtUSD(data.usdTotal);
    ui.holdings.textContent = `${fmtINJ(data.injTotal)} INJ`;
    ui.staked.textContent = `${fmtINJ(data.stakedINJ)} INJ`;
    ui.rewards.textContent = `${fmtINJ(data.rewardINJ)} INJ`;
    ui.price.textContent = fmtUSD(data.priceUsd);
    for (const el of [ui.pnl, ui.pct]) el.classList.remove('positive','negative','neutral');
    if (Number.isFinite(data.marketPnl24hUsd) && Number.isFinite(data.priceChange24hPct)) {
      const change = data.marketPnl24hUsd;
      const color = change > .001 ? 'positive' : change < -.001 ? 'negative' : 'neutral';
      for (const el of [ui.pnl, ui.pct]) el.classList.add(color);
      ui.pnl.textContent = `${change >= 0 ? '+' : '−'}${fmtUSD(Math.abs(change))}`;
      ui.pct.textContent = fmtPercent(data.priceChange24hPct);
    } else {
      ui.pnl.textContent = '—';
      ui.pct.textContent = '—';
    }
    ui.updated.textContent = `${dict().updated}: ${new Date(data.updatedAt).toLocaleTimeString(lang() === 'it' ? 'it-IT' : 'en-US', {hour:'2-digit',minute:'2-digit',second:'2-digit'})}`;
    setStatus('online', dict().online);
  }

  async function getJson(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      // Only publicly accessible GET endpoints; no keys, credentials, or signed transactions.
      const res = await fetch(url, { signal:controller.signal, cache:'no-store', credentials:'omit' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } finally { clearTimeout(timeout); }
  }
  // Limit total upstream connections on mobile and reduce pressure on public LCDs.
  function limited(task) {
    return new Promise((resolve,reject) => {
      jobQueue.push({task,resolve,reject});
      pump();
    });
  }
  function pump() {
    while (active < MAX_CONCURRENT && jobQueue.length) {
      const next = jobQueue.shift();
      active++;
      Promise.resolve().then(next.task).then(next.resolve, next.reject).finally(() => {active--;pump();});
    }
  }
  async function lcd(path) {
    return limited(async () => {
      let lastError;
      for (const root of LCD) {
        try { return await getJson(root + path); }
        catch (e) { lastError = e; }
      }
      throw lastError || new Error('Injective LCD unavailable');
    });
  }
  const asInj = value => {
    const n = Number(value || 0);
    if (!Number.isFinite(n) || n < 0) throw new Error('Invalid on-chain amount');
    return n / SCALE;
  };
  const sumCoins = coins => (Array.isArray(coins) ? coins : []).reduce((sum, c) =>
    sum + (c.denom === DENOM ? asInj(c.amount) : 0), 0);

  async function readWallet(address) {
    const a = encodeURIComponent(address);
    const [bank, delegations, rewards, unbonding] = await Promise.all([
      lcd(`/cosmos/bank/v1beta1/balances/${a}?pagination.limit=1000`),
      lcd(`/cosmos/staking/v1beta1/delegations/${a}?pagination.limit=100`),
      lcd(`/cosmos/distribution/v1beta1/delegators/${a}/rewards`),
      lcd(`/cosmos/staking/v1beta1/delegators/${a}/unbonding_delegations?pagination.limit=100`)
    ]);
    if (!Array.isArray(bank?.balances) || !Array.isArray(delegations?.delegation_responses) ||
        !Array.isArray(rewards?.total) || !Array.isArray(unbonding?.unbonding_responses)) {
      throw new Error('Unexpected chain response');
    }
    for (const r of [bank, delegations, unbonding]) {
      if (r.pagination?.next_key) throw new Error('Wallet pagination exceeded');
    }
    return {
      liquid:sumCoins(bank.balances),
      staked:delegations.delegation_responses.reduce((sum, entry) => sum + sumCoins([entry.balance]),0),
      rewards:sumCoins(rewards.total),
      unbonding:unbonding.unbonding_responses.reduce((sum, entry) =>
        sum + (entry.entries || []).reduce((s, row) => s + asInj(row.balance),0),0)
    };
  }
  async function getPrice() {
    try {
      const data = await getJson('https://api.coingecko.com/api/v3/simple/price?ids=injective-protocol&vs_currencies=usd&include_24hr_change=true');
      const obj = data?.['injective-protocol'];
      const usd = Number(obj?.usd);
      if (!(usd > 0)) throw new Error('Invalid CoinGecko INJ/USD price');
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
      return {usd:current,change24hPct:previous > 0 ? (current / previous - 1)*100 : null};
    }
  }
  async function calculate() {
    // All five complete snapshots are required; never publish an incomplete aggregate.
    const [rows, price] = await Promise.all([
      Promise.all(wallets.map(readWallet)), getPrice()
    ]);
    const totals = rows.reduce((sum, row) => {
      for (const key of ['liquid','staked','rewards','unbonding']) sum[key] += row[key];
      return sum;
    }, {liquid:0, staked:0, rewards:0, unbonding:0});
    const injTotal = totals.liquid + totals.staked + totals.rewards + totals.unbonding;
    if (!Number.isFinite(injTotal) || injTotal < 0) throw new Error('Invalid aggregate');
    const pct = price.change24hPct;
    const priceYesterday = Number.isFinite(pct) && pct > -100 ? price.usd / (1 + pct/100) : null;
    const marketPnl24hUsd = priceYesterday === null ? null : injTotal * (price.usd - priceYesterday);
    return {
      walletCount:5, injTotal, stakedINJ:totals.staked, rewardINJ:totals.rewards,
      availableINJ:totals.liquid, unbondingINJ:totals.unbonding,
      usdTotal:injTotal * price.usd, priceUsd:price.usd,
      priceChange24hPct:pct, marketPnl24hUsd,
      updatedAt:new Date().toISOString()
    };
  }
  async function refresh() {
    if (!configured || updating || document.visibilityState === 'hidden') return;
    updating = true;
    if (!latest) setStatus('loading',dict().connecting);
    try { draw(await calculate()); }
    catch (error) {
      console.warn('[B Capital Group] Treasury:',String(error?.message || error));
      setError();
    }
    finally { updating = false; }
  }
  document.addEventListener('bcg:language', () => {
    if (latest) {
      const offline = ui.status.dataset.state !== 'online';
      draw(latest);
      if (offline) setError();
    } else if (!configured || ui.status.dataset.state === 'offline') setError();
    else setStatus('loading',dict().connecting);
  });
  document.addEventListener('visibilitychange',() => {
    if (document.visibilityState === 'visible') refresh();
  });
  if (!configured) setError();
  else {
    ui.updated.textContent = dict().waiting;
    refresh();
    timer = window.setInterval(refresh, POLL_MS);
  }
})();
