export const mock = {
  positions: [
    {
      symbol: "RELIANCE",
      segment: "NSE",
      product: "MIS",
      qty: 150,
      buyPrice: 2420.50,
      ltp: 2452.35
    },
    {
      symbol: "SBIN",
      segment: "NSE",
      product: "CNC",
      qty: 400,
      buyPrice: 828.20,
      ltp: 824.50
    },
    {
      symbol: "NIFTY 22MAY 22500 CE",
      segment: "NFO",
      product: "NRML",
      qty: -250, // Short position
      buyPrice: 195.40,
      ltp: 184.20 // shorting means P&L is (buyPrice - ltp) * abs(qty) = (195.4 - 184.2) * 250 = +2800!
    },
    {
      symbol: "PNB",
      segment: "NSE",
      product: "MIS",
      qty: 2000,
      buyPrice: 126.10,
      ltp: 124.80
    }
  ],
  orders: [
    {
      id: "ORD-92837",
      time: "14:22:15",
      symbol: "INFY",
      segment: "NSE",
      type: "BUY",
      product: "MIS",
      qty: 100,
      price: 1565.00,
      triggerPrice: 0.00,
      status: "PENDING"
    },
    {
      id: "ORD-92838",
      time: "14:31:02",
      symbol: "KOTAKBANK",
      segment: "NSE",
      type: "SELL",
      product: "MIS",
      qty: 50,
      price: 1725.50,
      triggerPrice: 0.00,
      status: "EXECUTED"
    },
    {
      id: "ORD-92839",
      time: "14:40:48",
      symbol: "CRUDEOIL 19JUN FUT",
      segment: "MCX",
      type: "BUY",
      product: "NRML",
      qty: 1,
      price: 6530.00,
      triggerPrice: 6525.00,
      status: "REJECTED",
      reason: "Margin Shortfall"
    }
  ]
};
