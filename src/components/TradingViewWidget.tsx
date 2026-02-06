import React, { useEffect, useRef, memo } from "react";

const TradingViewWidget: React.FC = memo(() => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      // Clear any previous widget
      container.current.innerHTML = "";

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: "BINANCE:BTCBRL",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "br",
        enable_publishing: false,
        allow_symbol_change: true,
        withdateranges: true,
        hide_side_toolbar: false,
        studies: ["Volume@tv-basicstudies"],
        container_id: `tradingview-widget-container-${Math.random()}`,
      });
      container.current.appendChild(script);
    }
  });

  return (
    <div
      className="tradingview-widget-container h-full w-full"
      ref={container}
    ></div>
  );
});

export default TradingViewWidget;
