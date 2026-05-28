import { useCallback, useEffect, useState } from 'react';
import { useScalperState }  from './hooks/useScalperState.js';
import { useMarketData }    from './hooks/useMarketData.js';
import { useHotkeys }       from './hooks/useHotkeys.js';
import { useLinkStore }     from '../../stores/linkStore.js';
import { useUiStore }       from '../../stores/uiStore.js';
import { WidgetLoading, WidgetError } from '../_template/WidgetStates.jsx';
import { Icon } from '../../components';

import MasterToolbar  from './components/MasterToolbar/MasterToolbar.jsx';
import TVRail         from './components/TVRail/TVRail.jsx';
import ScalperColumn  from './components/ScalperColumn/ScalperColumn.jsx';

import ScripPopover    from './components/popovers/ScripPopover.jsx';
import ExpiryPopover   from './components/popovers/ExpiryPopover.jsx';
import StrikePopover   from './components/popovers/StrikePopover.jsx';
import MarginPopover   from './components/popovers/MarginPopover.jsx';
import ChannelPopover  from './components/popovers/ChannelPopover.jsx';
import SettingsPopover from './components/popovers/SettingsPopover.jsx';

import styles from './Widget.module.css';

export default function ScalperBoxWidget({
  widgetId,
  config = {},
  density = 'full',
  panelApi,
}) {
  const { state, actions } = useScalperState();
  const addToast      = useUiStore(s => s.addToast);
  const setLinkSymbol = useLinkStore(s => s.setSymbol);

  const [popoverAnchors, setPopoverAnchors] = useState({});

  const openPopover = useCallback((id, e) => {
    setPopoverAnchors(prev => ({
      ...prev,
      [id]: e.currentTarget.getBoundingClientRect(),
    }));
    actions.setActivePopover(id);
  }, [actions]);

  const closePopover = useCallback(() => {
    actions.setActivePopover(null);
  }, [actions]);

  // Init strikes once ltp is available
  useEffect(() => {
    if (state.underlying?.ltp && state.callStrike === null) {
      actions.initStrikes();
    }
  }, [state.underlying?.ltp, state.callStrike]);

  const marketData = useMarketData({
    underlying:  state.underlying,
    callStrike:  state.callStrike,
    putStrike:   state.putStrike,
    timeframe:   state.timeframe,
    spotMode:    state.spotMode,
  });

  // Widget linking
  const linkGroup = config.linkGroup ?? null;
  useEffect(() => {
    if (linkGroup && state.underlying?.sym) {
      setLinkSymbol(linkGroup, state.underlying.sym);
    }
  }, [linkGroup, state.underlying?.sym]);

  // P&L computation
  const scalperPnl = state.positions.reduce((acc, p) => {
    const ltp = p.leg === 'call' ? marketData.callLtp : marketData.putLtp;
    if (!ltp) return acc;
    const diff = p.side === 'long' ? ltp - p.entry : p.entry - ltp;
    return acc + diff * p.qty;
  }, 0);

  const allPnl = scalperPnl;

  const placeTrade = useCallback((leg, action) => {
    const ltp    = leg === 'call' ? marketData.callLtp : marketData.putLtp;
    const lots   = leg === 'call' ? state.callLots : state.putLots;
    const strike = leg === 'call' ? state.callStrike : state.putStrike;
    const lotSize = state.underlying?.lot;
    if (!ltp || !lots || !strike || !lotSize) return;

    const qty = lots * lotSize;
    actions.addPosition({ leg, side: action === 'buy' ? 'long' : 'short', entry: ltp, qty, strike });

    const label = `${action.toUpperCase()} · `
      + `${state.underlying.sym} ${strike} `
      + `${leg === 'call' ? 'CE' : 'PE'} `
      + `× ${lots}L @ ${ltp.toFixed(2)}`;
    addToast(label, action === 'buy' ? 'positive' : 'negative');
  }, [marketData, state, actions, addToast]);

  // Grid columns — correct: only include visible columns so items align
  const gridCols = [
    '36px',
    state.showCall && '1fr',
    state.showSpot && '1fr',
    state.showPut  && '1fr',
  ].filter(Boolean).join(' ');

  useHotkeys({
    onBuyCall:   () => placeTrade('call', 'buy'),
    onSellCall:  () => placeTrade('call', 'sell'),
    onBuyPut:    () => placeTrade('put',  'buy'),
    onSellPut:   () => placeTrade('put',  'sell'),
    onExitAll:   () => { actions.exitAllPositions(); addToast('All positions exited', 'negative'); },
    onCancelAll: () => addToast('All pending orders cancelled', 'warning'),
    onFocusCall: () => actions.toggleCall(),
    onFocusSpot: () => actions.toggleSpot(),
    onFocusPut:  () => actions.togglePut(),
    onFocusAll:  () => actions.showAll(),
    onEscape:    () => actions.setActivePopover(null),
  });

  if (marketData.isLoading && !marketData.callLtp) return <WidgetLoading />;
  if (marketData.error) return <WidgetError error={marketData.error} />;

  const linkDotClass = {
    blue:   styles.linkDotBlue,
    green:  styles.linkDotGreen,
    yellow: styles.linkDotYellow,
    red:    styles.linkDotRed,
    off:    styles.linkDotOff,
  }[state.channel] ?? styles.linkDotOff;

  return (
    <div className={styles.root} data-density={density}>
      {/* Widget header */}
      <div className={styles.widgetHeader}>
        <div className={styles.whLeft}>
          <button
            className={`${styles.linkDot} ${linkDotClass}`}
            onClick={e => openPopover('channel', e)}
            title="Channel link"
          />
          <span className={styles.widgetTitle}>Pro Scalper Box</span>
          <span className={styles.widgetSubtitle}>
            {state.underlying?.sym ?? '—'}
            {' · '}
            {state.selectedExpiry?.label ?? '—'}
            {' · '}
            {state.callStrike ?? '—'} Strike
          </span>
        </div>
        <div className={styles.whRight}>
          <button
            className={styles.iconBtn}
            onClick={e => openPopover('settings', e)}
            title="Settings"
          >
            <Icon name="Settings" size={14} />
          </button>
        </div>
      </div>

      {/* Master toolbar */}
      <MasterToolbar
        state={state}
        actions={actions}
        marketData={marketData}
        onOpenPopover={openPopover}
      />

      {/* Body — TV rail + columns */}
      <div
        className={styles.scalperBody}
        style={{ gridTemplateColumns: gridCols }}
      >
        <TVRail
          state={state}
          actions={actions}
          onOpenPopover={openPopover}
        />

        {state.showCall && (
          <ScalperColumn
            leg="call"
            state={state}
            actions={actions}
            marketData={marketData}
            onTrade={action => placeTrade('call', action)}
            density={density}
            popoverAnchors={popoverAnchors}
            onOpenPopover={openPopover}
          />
        )}

        {state.showSpot && (
          <ScalperColumn
            leg="spot"
            state={state}
            actions={actions}
            marketData={marketData}
            scalperPnl={scalperPnl}
            allPnl={allPnl}
            onTrade={null}
            density={density}
            popoverAnchors={popoverAnchors}
            onOpenPopover={openPopover}
          />
        )}

        {state.showPut && (
          <ScalperColumn
            leg="put"
            state={state}
            actions={actions}
            marketData={marketData}
            onTrade={action => placeTrade('put', action)}
            density={density}
            popoverAnchors={popoverAnchors}
            onOpenPopover={openPopover}
          />
        )}
      </div>

      {/* All popovers rendered at root level — RULE D */}
      {state.activePopover === 'scrip' && (
        <ScripPopover
          instruments={state.underlying ? {
            benchmarks: state.expiries ? [] : [],
            all: [],
          } : null}
          selected={state.underlying}
          onSelect={u => { actions.setUnderlying(u); closePopover(); }}
          anchorRect={popoverAnchors['scrip']}
          onClose={closePopover}
        />
      )}

      {state.activePopover === 'expiry' && (
        <ExpiryPopover
          expiries={state.expiries}
          selected={state.selectedExpiry}
          onSelect={e => { actions.setExpiry(e); closePopover(); }}
          anchorRect={popoverAnchors['expiry']}
          onClose={closePopover}
        />
      )}

      {state.activePopover === 'callStrike' && (
        <StrikePopover
          strikeList={marketData.strikeList}
          atmStrike={marketData.atmStrike}
          selected={state.callStrike}
          onSelect={s => { actions.setCallStrike(s); closePopover(); }}
          anchorRect={popoverAnchors['callStrike']}
          onClose={closePopover}
        />
      )}

      {state.activePopover === 'putStrike' && (
        <StrikePopover
          strikeList={marketData.strikeList}
          atmStrike={marketData.atmStrike}
          selected={state.putStrike}
          onSelect={s => { actions.setPutStrike(s); closePopover(); }}
          anchorRect={popoverAnchors['putStrike']}
          onClose={closePopover}
        />
      )}

      {state.activePopover === 'callMargin' && (
        <MarginPopover
          leg="call"
          action="buy"
          lots={state.callLots}
          ltp={marketData.callLtp}
          lotSize={state.underlying?.lot}
          underlyingLtp={marketData.spotLtp}
          anchorRect={popoverAnchors['callMargin']}
          onClose={closePopover}
        />
      )}

      {state.activePopover === 'putMargin' && (
        <MarginPopover
          leg="put"
          action="buy"
          lots={state.putLots}
          ltp={marketData.putLtp}
          lotSize={state.underlying?.lot}
          underlyingLtp={marketData.spotLtp}
          anchorRect={popoverAnchors['putMargin']}
          onClose={closePopover}
        />
      )}

      {state.activePopover === 'channel' && (
        <ChannelPopover
          selected={state.channel}
          onSelect={c => { actions.setChannel(c); closePopover(); }}
          anchorRect={popoverAnchors['channel']}
          onClose={closePopover}
        />
      )}

      {state.activePopover === 'settings' && (
        <SettingsPopover
          settings={state.settings}
          onUpdate={actions.setSettings}
          anchorRect={popoverAnchors['settings']}
          onClose={closePopover}
        />
      )}
    </div>
  );
}
