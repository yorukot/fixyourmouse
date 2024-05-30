"use client"
import { useState } from 'react';

export default function Home() {
  const [lastClickTime, setLastClickTime] = useState(0);
  const [intervalTime, setIntervalTime] = useState(0);
  const [boxColor, setBoxColor] = useState('bg-gruvbox-gray');
  const [clickCount, setClickCount] = useState(0);
  const [underThresholdCount, setUnderThresholdCount] = useState(0);
  const [threshold, setThreshold] = useState(0.075);
  const [underThresholdPercentage, setUnderThresholdPercentage] = useState(0);

  const handleClick = () => {
    const now = Date.now();
    const currentClickCount = clickCount + 1;

    setClickCount(currentClickCount);

    if (lastClickTime !== 0) {
      const interval = (now - lastClickTime) / 1000;
      setIntervalTime(interval);
      if (interval < threshold) {
        setBoxColor('bg-gruvbox-red');
        setUnderThresholdCount(underThresholdCount + 1);
      }
    }
    setLastClickTime(now);
    setUnderThresholdPercentage((underThresholdCount / currentClickCount) * 100);
  };

  const handleThresholdChange = (e: any) => {
    const newThreshold = parseFloat(e.target.value);
    setThreshold(newThreshold);
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gruvbox-bg bg-grid">
      <div
        className={`w-56 h-56 ${boxColor} flex items-center justify-center border-2 border-gruvbox-light-gray rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110`}
        onMouseDown={handleClick}
        onContextMenu={handleContextMenu}
      >
        <span className="text-gruvbox-yellow no-select">Click me</span>
      </div>
      <div className="mt-6 p-4 bg-gruvbox-dark rounded-lg shadow-lg w-100 no-select">
        <h2 className="text-gruvbox-yellow text-lg">Interval between two clicks: <span className="text-gruvbox-blue">{intervalTime.toFixed(5)}</span> (s)</h2>
        <h2 className="text-gruvbox-yellow text-lg">Total click: <span className="text-gruvbox-blue">{clickCount}</span></h2>
        <h2 className="text-gruvbox-yellow text-lg">Double click count: <span className="text-gruvbox-blue">{underThresholdCount}</span></h2>
        <h2 className="text-gruvbox-yellow text-lg">Double click percentage: <span className="text-gruvbox-blue">{underThresholdPercentage.toFixed(2)}%</span></h2>
        <label htmlFor="threshold" className="text-gruvbox-yellow text-lg">Quick click threshold(second): <span className="text-gruvbox-blue">{threshold.toFixed(3)}</span></label>
        <input
          type="range"
          id="threshold"
          name="threshold"
          min="0.001"
          max="1"
          step="0.001"
          value={threshold}
          onChange={handleThresholdChange}
          className="w-full mt-2"
        />
      </div>
      <a href="https://github.com/yorukot/fixyourmouse" target="_blank" rel="noopener noreferrer" className="text-gruvbox-yellow text-lg mt-4 no-select">Built with ❤️ by Yorukot | Github page</a>
    </div>
  );
}