// ── Built widgets (full implementations) ──
import ChartWidget from '../widgets/Chart/index.jsx';
import WatchlistWidget from '../widgets/Watchlist/index.jsx';
import PositionsWidget from '../widgets/Positions/index.jsx';
import OrdersWidget from '../widgets/Orders/index.jsx';

// ── Placeholder widgets ──
import PriceLadderWidget from '../widgets/PriceLadder/index.jsx';
import TimeAndSalesWidget from '../widgets/TimeAndSales/index.jsx';
import VolumeProfileWidget from '../widgets/VolumeProfile/index.jsx';
import OptionChainWidget from '../widgets/OptionChain/index.jsx';
import OIGraphWidget from '../widgets/OIGraph/index.jsx';
import IVChartWidget from '../widgets/IVChart/index.jsx';
import StraddleChartWidget from '../widgets/StraddleChart/index.jsx';
import StrategyBuilderWidget from '../widgets/StrategyBuilder/index.jsx';
import ScalperBoxWidget from '../widgets/ScalperBox/index.jsx';
import LiveScannerWidget from '../widgets/LiveScanner/index.jsx';
import MoversWidget from '../widgets/Movers/index.jsx';
import HeatmapWidget from '../widgets/Heatmap/index.jsx';
import EtfHeatmapWidget from '../widgets/EtfHeatmap/index.jsx';
import MarketScreenersWidget from '../widgets/MarketScreeners/index.jsx';
import SymbolOverviewWidget from '../widgets/SymbolOverview/index.jsx';
import IndicesWidget from '../widgets/Indices/index.jsx';
import PortfolioWidget from '../widgets/Portfolio/index.jsx';
import SessionPnLWidget from '../widgets/SessionPnL/index.jsx';
import BasketOrderWidget from '../widgets/BasketOrder/index.jsx';
import SuperOrdersWidget from '../widgets/SuperOrders/index.jsx';
import GTTWidget from '../widgets/GTT/index.jsx';
import RiskConsoleWidget from '../widgets/RiskConsole/index.jsx';
import NewsEventsWidget from '../widgets/NewsEvents/index.jsx';
import JMResearchWidget from '../widgets/JMResearch/index.jsx';
import MarginCalcWidget from '../widgets/MarginCalc/index.jsx';
import MarketTimingsWidget from '../widgets/MarketTimings/index.jsx';
import NewsStoriesWidget from '../widgets/NewsStories/index.jsx';
import EconomicMapWidget from '../widgets/EconomicMap/index.jsx';

// Widget routing map — keys MUST match catalog `id` values (kebab-case)
export const widgetRegistry = {
  'chart':            ChartWidget,
  'watchlist':        WatchlistWidget,
  'positions':        PositionsWidget,
  'orders':           OrdersWidget,
  'price-ladder':     PriceLadderWidget,
  'time-and-sales':   TimeAndSalesWidget,
  'volume-profile':   VolumeProfileWidget,
  'option-chain':     OptionChainWidget,
  'oi-graph':         OIGraphWidget,
  'iv-chart':         IVChartWidget,
  'straddle-chart':   StraddleChartWidget,
  'strategy-builder': StrategyBuilderWidget,
  'scalper-box':      ScalperBoxWidget,
  'live-scanner':     LiveScannerWidget,
  'movers':           MoversWidget,
  'heatmap':          HeatmapWidget,
  'etf-heatmap':      EtfHeatmapWidget,
  'market-screeners': MarketScreenersWidget,
  'symbol-overview':  SymbolOverviewWidget,
  'indices':          IndicesWidget,
  'portfolio':        PortfolioWidget,
  'session-pnl':      SessionPnLWidget,
  'basket-order':     BasketOrderWidget,
  'super-orders':     SuperOrdersWidget,
  'gtt':              GTTWidget,
  'risk-console':     RiskConsoleWidget,
  'news-events':      NewsEventsWidget,
  'jm-research':      JMResearchWidget,
  'margin-calc':      MarginCalcWidget,
  'market-timings':   MarketTimingsWidget,
  'news-stories':     NewsStoriesWidget,
  'economic-map':     EconomicMapWidget,
};

// Widget catalog — ready: true = live, ready: false = coming soon
export const widgetCatalog = [
  // Charting & Price Action
  { id: 'chart',          label: 'Chart',            description: 'TradingView Advanced Chart',      group: 'Charting & Price Action',  icon: 'M3 3v18h18M7 14l4-4 4 4 5-5',  ready: true,  allowMultiple: true,  tvWidget: true  },
  { id: 'price-ladder',   label: 'Price Ladder',     description: 'Market Depth',                    group: 'Charting & Price Action',  icon: 'M4 6h16M4 10h12M4 14h16M4 18h8', ready: false, allowMultiple: true  },
  { id: 'time-and-sales', label: 'Time & Sales',     description: 'Trade tape',                      group: 'Charting & Price Action',  icon: 'M12 3a9 9 0 100 18A9 9 0 0012 3zM12 7v5l3 2', ready: false, allowMultiple: true },
  { id: 'volume-profile', label: 'Volume Profile',   description: 'VPOC',                            group: 'Charting & Price Action',  icon: 'M3 4h6v16H3zM11 9h6v11h-6zM19 13h2v7h-2z', ready: false },

  // Options & Volatility
  { id: 'option-chain',     label: 'Option Chain',     description: 'Strike ladder',                 group: 'Options & Volatility',  icon: 'M3 6h7M14 6h7M3 12h7M14 12h7M3 18h7M14 18h7', ready: false },
  { id: 'oi-graph',         label: 'OI Graph',         description: 'OI buildup',                    group: 'Options & Volatility',  icon: 'M3 20h4V10H3zM10 20h4V4h-4zM17 20h4v-7h-4z',  ready: false },
  { id: 'iv-chart',         label: 'IV Chart',         description: 'Volatility',                    group: 'Options & Volatility',  icon: 'M3 12c3-6 6 6 9 0s6 6 9 0',                   ready: false },
  { id: 'straddle-chart',   label: 'Straddle Chart',   description: 'ATM premium',                   group: 'Options & Volatility',  icon: 'M3 20l9-16 9 16M5 16h14',                     ready: false },
  { id: 'strategy-builder', label: 'Strategy Builder', description: 'Payoff',                        group: 'Options & Volatility',  icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', ready: false },
  { id: 'scalper-box',      label: 'Pro Scalper Box',  description: 'CE + Spot + PE synchronized trading panel', group: 'Options & Volatility', icon: 'M13 10V3L4 14h7v7l9-11h-7z', ready: true, tvWidget: false, allowMultiple: true, minWidth: 320, minHeight: 400, recommendedWidth: 1200, recommendedHeight: 700 },

  // Discovery & Market Intelligence
  { id: 'watchlist',        label: 'Watchlist',         description: 'Multi-segment',                group: 'Discovery & Market Intelligence',  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', ready: true  },
  { id: 'live-scanner',     label: 'Live Scanner',      description: 'Preset scans',                 group: 'Discovery & Market Intelligence',  icon: 'M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z', ready: false },
  { id: 'movers',           label: 'Movers & Trending', description: 'Gainers/Losers',               group: 'Discovery & Market Intelligence',  icon: 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6', ready: false },
  { id: 'heatmap',          label: 'Heatmap',           description: 'SENSEX heatmap by sector · TV', group: 'Discovery & Market Intelligence', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z', ready: true, tvWidget: true, allowMultiple: false, minWidth: 280, minHeight: 240, recommendedWidth: 480, recommendedHeight: 320 },
  { id: 'indices',          label: 'Symbol',            description: 'BSE stocks and indices · TV',  group: 'Discovery & Market Intelligence',  icon: 'M18 20V10M12 20V4M6 20v-6', ready: true, tvWidget: true, allowMultiple: false, minWidth: 200, minHeight: 200, recommendedWidth: 320, recommendedHeight: 280 },
  { id: 'etf-heatmap',      label: 'ETF Heatmap',       description: 'Indian ETFs by asset class · TV', group: 'Discovery & Market Intelligence', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z', ready: true, tvWidget: true, allowMultiple: false, minWidth: 280, minHeight: 240, recommendedWidth: 480, recommendedHeight: 320 },
  { id: 'market-screeners', label: 'Market Screeners',  description: 'India stock screener · TV',    group: 'Discovery & Market Intelligence',  icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', ready: true, tvWidget: true, allowMultiple: false, minWidth: 320, minHeight: 300, recommendedWidth: 600, recommendedHeight: 480 },
  { id: 'symbol-overview',  label: 'Symbol Overview',   description: 'Detailed symbol research · TV', group: 'Discovery & Market Intelligence', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2M3 21h2', ready: true, tvWidget: true, allowMultiple: false, minWidth: 320, minHeight: 400, recommendedWidth: 900, recommendedHeight: 900 },

  // Execution & Position Management
  { id: 'positions',    label: 'Positions', description: 'Live positions with P&L tracking',          group: 'Execution & Position Management', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', ready: true,  tvWidget: false, allowMultiple: false, minWidth: 200, minHeight: 300, recommendedWidth: 700, recommendedHeight: 500 },
  { id: 'orders',       label: 'Orders',    description: 'Live order management — cancel, modify, repeat', group: 'Execution & Position Management', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', ready: true, tvWidget: false, allowMultiple: false, minWidth: 200, minHeight: 300, recommendedWidth: 800, recommendedHeight: 500 },
  { id: 'portfolio',    label: 'Portfolio',    description: 'Holdings',          group: 'Execution & Position Management',  icon: 'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16', ready: false },
  { id: 'session-pnl',  label: 'Session P&L',  description: 'Live MTM',          group: 'Execution & Position Management',  icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6', ready: false },
  { id: 'basket-order', label: 'Basket Order', description: 'Multi-leg',         group: 'Execution & Position Management',  icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0', ready: false },
  { id: 'super-orders', label: 'Super Orders', description: 'GTT / SL / TP',     group: 'Execution & Position Management',  icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8', ready: false },
  { id: 'gtt',          label: 'GTT Orders',   description: 'Good till trigger',  group: 'Execution & Position Management',  icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', ready: false },

  // Risk & Information
  { id: 'risk-console', label: 'Risk Console', description: 'Exposure limits',   group: 'Risk & Information',  icon: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01', ready: false },
  { id: 'news-events',  label: 'News & Events', description: 'Calendar',         group: 'Risk & Information',  icon: 'M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2M18 14H9M15 18H9M10 6h8', ready: false },
  { id: 'jm-research',  label: 'JM Research',   description: 'BlinkX exclusive', group: 'Risk & Information',  icon: 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z', ready: false },
  { id: 'news-stories', label: 'News Stories',  description: 'Live market news feed · TV', group: 'Risk & Information', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6', ready: true, tvWidget: true, allowMultiple: false, minWidth: 200, minHeight: 300, recommendedWidth: 380, recommendedHeight: 600 },

  // Utility
  { id: 'margin-calc',    label: 'Calculator',     description: 'Lot / Margin',   group: 'Utility',  icon: 'M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zM8 10h8M8 14h8M8 6h.01M12 6h.01M16 6h.01', ready: false },
  { id: 'market-timings', label: 'Market Timings', description: 'Session hours',  group: 'Utility',  icon: 'M12 3a9 9 0 100 18A9 9 0 0012 3zM12 7v5l4 2', ready: false },

  // Discovery & Market Intelligence (continued)
  { id: 'economic-map', label: 'Economic Map', description: 'Global economic indicators · TV', group: 'Discovery & Market Intelligence', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', ready: true, tvWidget: true, allowMultiple: false, minWidth: 320, minHeight: 300, recommendedWidth: 640, recommendedHeight: 480 },
];

// Unique group labels in display order
export const widgetGroups = [...new Set(widgetCatalog.map(w => w.group))];
