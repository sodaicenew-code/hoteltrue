import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview' as ActiveTab, label: 'ภาพรวม', icon: 'trending_up' },
    { id: 'seasonality' as ActiveTab, label: 'ฤดูกาล', icon: 'calendar_month' },
    { id: 'ai-predictor' as ActiveTab, label: 'ทำนาย AI', icon: 'bolt' },
    { id: 'filters-segment' as ActiveTab, label: 'ตัวกรอง', icon: 'tune' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-xl border-t border-[#0b1c30]/5 shadow-[0_-4px_16px_rgba(11,28,48,0.04)]">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[60px] h-12 transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-[#0058be] font-bold'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
              id={`nav-tab-${tab.id}`}
            >
              <span
                className="material-symbols-outlined text-[24px] transition-transform duration-150"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className="text-[11px] mt-0.5 tracking-tight font-medium">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#0058be] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
