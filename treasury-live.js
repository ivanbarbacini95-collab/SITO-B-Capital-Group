/* Read-only aggregate display. Does not hold or expose wallet addresses. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  if (!$('#treasuryValue')) return;
  const fields = {
    status: $('#treasuryStatus'), statusText: $('#treasuryStatusText'),
    usd: $('#treasuryValue'), holdings: $('#treasuryHoldings'),
    pnl: $('#treasuryPnl'), pct: $('#treasuryPct'), staked: $('#treasuryStaked'),
    rewards: $('#treasuryRewards'), price: $('#treasuryPrice'), updated: $('#treasuryUpdated')
  };
  const dictionary = {
    it: { connecting:'Connessione ai dati...', online:'DATI AGGIORNATI', offline:'DATI NON DISPONIBILI',
      waiting:'In attesa del primo aggiornamento', updated:'Ultimo aggiornamento',
      notConfigured:'Servizio live da collegare', error:'Connessione non disponibile · nuovo tentativo automatico' },
    en: { connecting:'Connecting to data...', online:'DATA UPDATED', offline:'DATA UNAVAILABLE',
      waiting:'Waiting for first update', updated:'Last updated',
      notConfigured:'Live data source not connected', error:'Connection unavailable · automatically retrying' }
  };
  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'it';
  const dict = () => dictionary[lang()];
  const endpoint = (window.BCG_TREASURY_API_URL || '').trim();
  let lastData = null;
  let pending = false;
  let nextTimer = null;
  const usd = n => new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
  const inj = n => new Intl.NumberFormat(lang() === 'it' ? 'it-IT' : 'en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
  const percent = n => `${n >= 0 ? '+' : '−'}${Math.abs(n).toFixed(2)}%`;
  function setStatus(state, label) {
    fields.status.dataset.state = state;
    fields.statusText.textContent = label;
  }
  function setError(isSetup = false) {
    setStatus('offline',dict().offline);
    if (!lastData) fields.updated.textContent = isSetup ? dict().notConfigured : dict().error;
  }
  function render(data) {
    if (!data || data.walletCount !== 5 || !Number.isFinite(data.injTotal) || !Number.isFinite(data.usdTotal) ||
       !Number.isFinite(data.priceUsd) || !Number.isFinite(data.stakedINJ) || !Number.isFinite(data.rewardINJ)) {
      throw new Error('Invalid aggregate response');
    }
    lastData = data;
    fields.usd.textContent = usd(data.usdTotal);
    fields.holdings.textContent = `${inj(data.injTotal)} INJ`;
    fields.staked.textContent = `${inj(data.stakedINJ)} INJ`;
    fields.rewards.textContent = `${inj(data.rewardINJ)} INJ`;
    fields.price.textContent = usd(data.priceUsd);
    fields.pnl.classList.remove('positive','negative','neutral');
    fields.pct.classList.remove('positive','negative','neutral');
    if (Number.isFinite(data.marketPnl24hUsd) && Number.isFinite(data.priceChange24hPct)) {
      const delta = data.marketPnl24hUsd;
      const color = delta > 0.001 ? 'positive' : delta < -0.001 ? 'negative' : 'neutral';
      fields.pnl.classList.add(color);
      fields.pct.classList.add(color);
      fields.pnl.textContent = `${delta >= 0 ? '+' : '−'}${usd(Math.abs(delta))}`;
      fields.pct.textContent = percent(data.priceChange24hPct);
    } else {
      fields.pnl.textContent = '—';
      fields.pct.textContent = '—';
    }
    const at = new Date(data.updatedAt);
    fields.updated.textContent = `${dict().updated}: ${Number.isFinite(at.getTime()) ? at.toLocaleTimeString(lang() === 'it' ? 'it-IT':'en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'}) : '—'}`;
    setStatus('online',dict().online);
  }
  async function refresh() {
    if (pending || !endpoint || document.visibilityState === 'hidden') return;
    pending = true;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 17000);
      let res;
      try { res = await fetch(endpoint, {cache:'no-store', signal:controller.signal, headers:{'Accept':'application/json'}}); }
      finally { clearTimeout(timeout); }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      render(data);
    } catch (error) {
      console.warn('[B Capital Group] Treasury feed unavailable:', error.message);
      setError();
    } finally { pending = false; }
  }
  function schedule() {
    clearInterval(nextTimer);
    if (endpoint) nextTimer = setInterval(refresh, 60000);
  }
  document.addEventListener('bcg:language', () => {
    if (lastData) {
      const isOffline = fields.status.dataset.state !== 'online';
      render(lastData);
      if (isOffline) setError();
    } else if (!endpoint) setError(true);
    else if (fields.status.dataset.state === 'offline') setError();
    else setStatus('loading',dict().connecting);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refresh();
  });
  if (!endpoint || !/^https:\/\//.test(endpoint)) setError(true);
  else { setStatus('loading',dict().connecting); refresh(); schedule(); }
})();
