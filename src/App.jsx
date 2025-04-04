import React from "react";
import { StrategySelector } from "./components/StrategySelector";
import { MarketScenarioSelector } from "./components/MarketScenarioSelector";
import { TimeHorizonSelector } from "./components/TimeHorizonSelector";
import { ResultChart } from "./components/ResultChart";
import { SummaryPanel } from "./components/SummaryPanel";
import { simulateInvestment } from "./utils/simulationEngine";

export default function App() {
  const [strategy, setStrategy] = React.useState("lumpSum");
  const [strategyConfig, setStrategyConfig] = React.useState({
    initialCash: 100000,
    weeklyDca: 1000,
    drop10: 1.5,
    drop20: 2,
    drop30: 3,
  });

  const [marketScenario, setMarketScenario] = React.useState({
    crashPercent: 35,
    crashDurationMonths: 12,
    recoveryType: "gradual",
  });
  const [timeHorizon, setTimeHorizon] = React.useState(5);
  const [simulationResult, setSimulationResult] = React.useState(null);

  const handleRunSimulation = () => {
    const result = simulateInvestment({
      strategy,
      marketScenario,
      timeHorizon,
      startingPrice: 150,
      totalInvestment: 100000,
      config: strategyConfig,
    });
    setSimulationResult(result);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Investment Strategy Simulator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StrategySelector
          value={strategy}
          onChange={setStrategy}
          config={strategyConfig}
          onConfigChange={setStrategyConfig}
        />
        <MarketScenarioSelector
          value={marketScenario}
          onChange={setMarketScenario}
        />
        <TimeHorizonSelector value={timeHorizon} onChange={setTimeHorizon} />
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleRunSimulation}
      >
        Run Simulation
      </button>

      {simulationResult && (
        <>
          <SummaryPanel result={simulationResult.summary} />
          <ResultChart data={simulationResult.timeline} />
        </>
      )}
    </div>
  );
}
