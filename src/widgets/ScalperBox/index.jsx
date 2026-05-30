import { useCallback, useEffect, useState } from 'react';
import { useScalperState }  from './hooks/useScalperState.js';
import { useMarketData }    from './hooks/useMarketData.js';
import { useMarginCalc }    from './hooks/useMarginCalc.js';
import { useHotkeys }       from './hooks/useHotkeys.js';
import { useLinkStore }     from '../../stores/linkStore.js';
import { useUiStore }       from '../../stores/uiStore.js';
import { WidgetLoading, WidgetError } from '../_template/WidgetStates.jsx';
import { Icon } from '../../components';
import { mock } from './mock.js';

import MasterToolbar  from './components/MasterToolbar/MasterToolbar.jsx';
import TVRail         from './components/TVRail/TVRail.jsx';
import ScalperColumn  from './components/ScalperColumn/ScalperColumn.jsx';

import { ScripPopover }      from './components/popovers/ScripPopover.jsx';
import { ExpiryPopover }     from './components/popovers/ExpiryPopover.jsx';
import { StrikePopover }     from './components/popovers/StrikePopover.jsx';
import { MarginPopover }     from './components/popovers/MarginPopover.jsx';
import { ChannelPopover }    from './components/popovers/ChannelPopover.jsx';
import { SettingsPopover }   from './components/popovers/SettingsPopover.jsx';
import { HotkeysPopover }    from './components/popovers/HotkeysPopover.jsx';
import { JMResearchPopover } from './components/popovers/JMResearchPopover.jsx';
import { IndicatorsPopover } from './components/popovers/IndicatorsPopover.jsx';
import { DrawingPopover }    from './components/popovers/DrawingPopover.jsx';
import { StrategiesPopover } from './components/popovers/StrategiesPopover.jsx';

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
    // Capture rect synchronously during
    // event dispatch — currentTarget is
    // null by the time the state updater
    // runs in React's re-render phase
    const rect = e?.currentTarget
      ?.getBoundingClientRect() ?? null;
    setPopoverAnchors(prev => ({
      ...prev,
      [id]: rect,
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
  useEffect(() => {
    const linkGroup = config.linkGroup ?? null;
    if (linkGroup && state.underlying?.sym) {
      setLinkSymbol(linkGroup, state.underlying.sym);
    }
  }, [config.linkGroup, state.underlying?.sym]);

  // P&L computation
  const scalperPnl = state.positions.reduce((acc, p) => {
    const ltp = p.leg === 'call' ? marketData.callLtp : marketData.putLtp;
    if (!ltp) return acc;
    const diff = p.side === 'long' ? ltp - p.entry : p.entry - ltp;
    return acc + diff * p.qty;
  }, 0);
  const allPnl = scalperPnl;

  // Margin calculations for margin popovers (all 4 variants)
  // Hooks called unconditionally before any conditional returns
  const lotSize = state.underlying?.lot ?? 0;
  const callBuyMargin  = useMarginCalc({ leg: 'call', action: 'buy',  lots: state.callLots, ltp: marketData.callLtp, lotSize, underlyingLtp: marketData.spotLtp });
  const callSellMargin = useMarginCalc({ leg: 'call', action: 'sell', lots: state.callLots, ltp: marketData.callLtp, lotSize, underlyingLtp: marketData.spotLtp });
  const putBuyMargin   = useMarginCalc({ leg: 'put',  action: 'buy',  lots: state.putLots,  ltp: marketData.putLtp,  lotSize, underlyingLtp: marketData.spotLtp });
  const putSellMargin  = useMarginCalc({ leg: 'put',  action: 'sell', lots: state.putLots,  ltp: marketData.putLtp,  lotSize, underlyingLtp: marketData.spotLtp });

  const marginDataMap = {
    'call-buy':  callBuyMargin,
    'call-sell': callSellMargin,
    'put-buy':   putBuyMargin,
    'put-sell':  putSellMargin,
  };

  const placeTrade = useCallback((leg, action) => {
    const ltp    = leg === 'call' ? marketData.callLtp : marketData.putLtp;
    const lots   = leg === 'call' ? state.callLots : state.putLots;
    const strike = leg === 'call' ? state.callStrike : state.putStrike;
    const ls     = state.underlying?.lot;
    if (!ltp || !lots || !strike || !ls) return;

    const qty = lots * ls;
    actions.addPosition({ leg, side: action === 'buy' ? 'long' : 'short', entry: ltp, qty, strike });

    const label = `${action.toUpperCase()} · `
      + `${state.underlying.sym} ${strike} `
      + `${leg === 'call' ? 'CE' : 'PE'} `
      + `× ${lots}L`;
    addToast(label, action === 'buy' ? 'positive' : 'negative');
  }, [marketData, state, actions, addToast]);

  // Grid columns — explicit '0px' for hidden slots keeps 4-track grid in sync
  // with conditional column rendering (RULE E).
  const gridCols = [
    '36px',
    ...(state.showCall ? ['1fr'] : []),
    ...(state.showSpot ? ['1fr'] : []),
    ...(state.showPut  ? ['1fr'] : []),
  ].join(' ');

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
            className={styles.whSettingsBtn}
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
          activePopover={state.activePopover}
          onOpenPopover={openPopover}
          onToast={msg => addToast(msg, 'default')}
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

      {/* ── Popovers — all rendered at root level (RULE D) ── */}

      <ScripPopover
        isOpen={state.activePopover === 'scrip'}
        anchor={popoverAnchors['scrip']}
        onClose={closePopover}
        instruments={mock.instruments}
        selectedSym={state.underlying?.sym}
        onSelect={u => { actions.setUnderlying(u); closePopover(); }}
      />

      <ExpiryPopover
        isOpen={state.activePopover === 'expiry'}
        anchor={popoverAnchors['expiry']}
        onClose={closePopover}
        expiries={state.expiries}
        selectedExpiry={state.selectedExpiry}
        onSelect={e => { actions.setExpiry(e); closePopover(); }}
      />

      {/* Call strike popover */}
      <StrikePopover
        isOpen={state.activePopover === 'strike-call'}
        anchor={popoverAnchors['strike-call']}
        onClose={closePopover}
        leg="call"
        strikeList={marketData.strikeList}
        currentStrike={state.callStrike}
        atmStrike={marketData.atmStrike}
        getLtp={strike => {
          if (!state.underlying?.ltp || !strike) return 0;
          const intrinsic = Math.max(0, state.underlying.ltp - strike);
          return Math.max(0.05, intrinsic + 10);
        }}
        onSelect={s => { actions.setCallStrike(s); closePopover(); }}
      />

      {/* Put strike popover */}
      <StrikePopover
        isOpen={state.activePopover === 'strike-put'}
        anchor={popoverAnchors['strike-put']}
        onClose={closePopover}
        leg="put"
        strikeList={marketData.strikeList}
        currentStrike={state.putStrike}
        atmStrike={marketData.atmStrike}
        getLtp={strike => {
          if (!state.underlying?.ltp || !strike) return 0;
          const intrinsic = Math.max(0, strike - state.underlying.ltp);
          return Math.max(0.05, intrinsic + 10);
        }}
        onSelect={s => { actions.setPutStrike(s); closePopover(); }}
      />

      {/* Margin popovers — 4 variants: call-buy, call-sell, put-buy, put-sell */}
      {['call-buy', 'call-sell', 'put-buy', 'put-sell'].map(key => {
        const [leg, action] = key.split('-');
        return (
          <MarginPopover
            key={key}
            isOpen={state.activePopover === `margin-${key}`}
            anchor={popoverAnchors[`margin-${key}`]}
            onClose={closePopover}
            leg={leg}
            action={action}
            marginData={marginDataMap[key]}
          />
        );
      })}

      <SettingsPopover
        isOpen={state.activePopover === 'settings'}
        anchor={popoverAnchors['settings']}
        onClose={closePopover}
        settings={state.settings}
        onSettingsChange={actions.setSettings}
      />

      <ChannelPopover
        isOpen={state.activePopover === 'channel'}
        anchor={popoverAnchors['channel']}
        onClose={closePopover}
        channel={state.channel}
        onChannelChange={ch => {
          actions.setChannel(ch ?? 'off');
          if (ch) {
            useLinkStore.getState().setSymbol(ch, state.underlying?.sym);
          }
          closePopover();
        }}
      />

      <HotkeysPopover
        isOpen={state.activePopover === 'hotkeys'}
        anchor={popoverAnchors['hotkeys']}
        onClose={closePopover}
      />

      <IndicatorsPopover
        isOpen={state.activePopover === 'indicators'}
        anchor={popoverAnchors['indicators']}
        onClose={closePopover}
        onSelect={name => { addToast(`${name} — coming soon`, 'default'); }}
      />

      <DrawingPopover
        isOpen={state.activePopover === 'drawing'}
        anchor={popoverAnchors['drawing']}
        onClose={closePopover}
        onSelect={name => { addToast(`${name} — coming soon`, 'default'); }}
      />

      <StrategiesPopover
        isOpen={state.activePopover === 'strategies'}
        anchor={popoverAnchors['strategies']}
        onClose={closePopover}
        onSelect={name => { addToast(`${name} — coming soon`, 'default'); }}
      />

      {/* JM Research — 3 variants: call, spot, put */}
      {['call', 'spot', 'put'].map(leg => (
        <JMResearchPopover
          key={leg}
          isOpen={state.activePopover === `jm-${leg}`}
          anchor={popoverAnchors[`jm-${leg}`]}
          onClose={closePopover}
          leg={leg}
          underlying={state.underlying}
          strike={leg === 'call' ? state.callStrike : state.putStrike}
          ltp={
            leg === 'call' ? marketData.callLtp :
            leg === 'put'  ? marketData.putLtp  :
            marketData.spotLtp
          }
        />
      ))}
    </div>
  );
}
