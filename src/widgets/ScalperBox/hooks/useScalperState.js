import { useReducer, useCallback } from 'react';
import { mock } from '../mock.js';

const _first = mock.instruments.benchmarks[0];
const _initialAtm = Math.round(_first.ltp / _first.strikeStep) * _first.strikeStep;

const initialState = {
  underlying:     mock.instruments.benchmarks[0],
  expiries:       mock.expiries,
  selectedExpiry: mock.expiries[0],
  timeframe:      '5m',

  showCall: true,
  showSpot: true,
  showPut:  true,

  callStrike:  _initialAtm,
  putStrike:   _initialAtm,
  callLots:    1,
  putLots:     1,
  spotMode:    'spot',
  oiProfileEnabled: false,
  positions:   mock.positions,
  channel:     'blue',
  settings: {
    showJMMarkers:        true,
    showPositionMarkers:  true,
    showHotkeyHints:      true,
    confirmBeforePlacing: false,
  },
  activePopover: null,
};

function reducer(state, action) {
  switch (action.type) {

    case 'SET_UNDERLYING': {
      const u = action.payload;
      const atm = Math.round(u.ltp / u.strikeStep) * u.strikeStep;
      return { ...state, underlying: u, callStrike: atm, putStrike: atm };
    }

    case 'SET_EXPIRY':
      return { ...state, selectedExpiry: action.payload };

    case 'SET_TIMEFRAME':
      return { ...state, timeframe: action.payload };

    case 'TOGGLE_CALL': {
      const next = !state.showCall;
      if (!next && !state.showSpot && !state.showPut) return state;
      return { ...state, showCall: next };
    }
    case 'TOGGLE_SPOT': {
      const next = !state.showSpot;
      if (!next && !state.showCall && !state.showPut) return state;
      return { ...state, showSpot: next };
    }
    case 'TOGGLE_PUT': {
      const next = !state.showPut;
      if (!next && !state.showCall && !state.showSpot) return state;
      return { ...state, showPut: next };
    }
    case 'SHOW_ALL':
      return { ...state, showCall: true, showSpot: true, showPut: true };

    case 'SET_CALL_STRIKE':
      return { ...state, callStrike: action.payload };
    case 'SET_PUT_STRIKE':
      return { ...state, putStrike: action.payload };
    case 'SET_CALL_LOTS':
      return { ...state, callLots: Math.max(1, action.payload) };
    case 'SET_PUT_LOTS':
      return { ...state, putLots: Math.max(1, action.payload) };
    case 'SET_SPOT_MODE':
      return { ...state, spotMode: action.payload };
    case 'TOGGLE_OI_PROFILE':
      return { ...state, oiProfileEnabled: !state.oiProfileEnabled };
    case 'ADD_POSITION':
      return { ...state, positions: [...state.positions, action.payload] };
    case 'EXIT_ALL_POSITIONS':
      return { ...state, positions: [] };
    case 'SET_CHANNEL':
      return { ...state, channel: action.payload };
    case 'SET_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'SET_ACTIVE_POPOVER':
      return { ...state, activePopover: action.payload };
    case 'INIT_STRIKES': {
      if (state.callStrike !== null) return state;
      const u = state.underlying;
      if (!u?.ltp) return state;
      const atm = Math.round(u.ltp / u.strikeStep) * u.strikeStep;
      return { ...state, callStrike: atm, putStrike: atm };
    }
    default:
      return state;
  }
}

export function useScalperState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    setUnderlying:    useCallback(u  => dispatch({ type: 'SET_UNDERLYING',     payload: u  }), []),
    setExpiry:        useCallback(e  => dispatch({ type: 'SET_EXPIRY',         payload: e  }), []),
    setTimeframe:     useCallback(tf => dispatch({ type: 'SET_TIMEFRAME',      payload: tf }), []),
    toggleCall:       useCallback(()  => dispatch({ type: 'TOGGLE_CALL'  }), []),
    toggleSpot:       useCallback(()  => dispatch({ type: 'TOGGLE_SPOT'  }), []),
    togglePut:        useCallback(()  => dispatch({ type: 'TOGGLE_PUT'   }), []),
    showAll:          useCallback(()  => dispatch({ type: 'SHOW_ALL'     }), []),
    setCallStrike:    useCallback(s  => dispatch({ type: 'SET_CALL_STRIKE',    payload: s  }), []),
    setPutStrike:     useCallback(s  => dispatch({ type: 'SET_PUT_STRIKE',     payload: s  }), []),
    setCallLots:      useCallback(n  => dispatch({ type: 'SET_CALL_LOTS',      payload: n  }), []),
    setPutLots:       useCallback(n  => dispatch({ type: 'SET_PUT_LOTS',       payload: n  }), []),
    setSpotMode:      useCallback(m  => dispatch({ type: 'SET_SPOT_MODE',      payload: m  }), []),
    toggleOIProfile:  useCallback(()  => dispatch({ type: 'TOGGLE_OI_PROFILE' }), []),
    addPosition:      useCallback(p  => dispatch({ type: 'ADD_POSITION',       payload: p  }), []),
    exitAllPositions: useCallback(()  => dispatch({ type: 'EXIT_ALL_POSITIONS' }), []),
    setChannel:       useCallback(c  => dispatch({ type: 'SET_CHANNEL',        payload: c  }), []),
    setSettings:      useCallback(s  => dispatch({ type: 'SET_SETTINGS',       payload: s  }), []),
    setActivePopover: useCallback(id => dispatch({ type: 'SET_ACTIVE_POPOVER', payload: id }), []),
    initStrikes:      useCallback(()  => dispatch({ type: 'INIT_STRIKES'  }), []),
  };

  return { state, actions };
}
