import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ActiveTab, HotelTypeFilter } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  selectedHotel: HotelTypeFilter;
  onSelectHotel: (hotel: HotelTypeFilter) => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  selectedHotel,
  onSelectHotel,
  onOpenProfile,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getTabSubtitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Overview';
      case 'seasonality':
        return 'Seasonality';
      case 'ai-predictor':
        return 'Ai Predictor';
      case 'filters-segment':
        return 'Filters & Segment';
      default:
        return 'Seasonality';
    }
  };

  const getHotelLabel = () => {
    if (selectedHotel === 'city') return 'City Hotel';
    if (selectedHotel === 'resort') return 'Resort Hotel';
    return 'City & Resort';
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#0b1c30]/5 shadow-[0_1px_8px_rgba(11,28,48,0.03)]">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-2.5">
          <img
            src={ASSETS.logo}
            alt="StayPulse Logo"
            className="h-8 w-auto object-contain select-none"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-lg tracking-tight text-[#0b1c30]">
                StayPulse
              </span>
              <span className="text-[10px] font-semibold text-[#0090a9] bg-[#dce9ff] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Pro
              </span>
            </div>
            <span className="text-xs text-[#45464d] font-normal leading-none mt-0.5">
              {getTabSubtitle()}
            </span>
          </div>
        </div>

        {/* Top Right Controls: Property Filter Pill & Profile Avatar */}
        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <button
              id="header-hotel-selector"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="h-9 px-3 rounded-full bg-[#e5eeff] hover:bg-[#dce9ff] flex items-center gap-1.5 transition-colors duration-150 active:scale-95 text-[#0b1c30]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#0058be]">
                hotel
              </span>
              <span className="text-xs font-semibold whitespace-nowrap">
                {getHotelLabel()}
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#45464d]">
                expand_more
              </span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-11 w-48 bg-white rounded-xl shadow-lg border border-[#e2e8f0] py-1.5 z-50">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#64748b] tracking-wider">
                  เลือกพอร์ตโฟลิโอ
                </div>
                <button
                  onClick={() => {
                    onSelectHotel('all');
                    setDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#eff4ff] transition-colors ${
                    selectedHotel === 'all' ? 'text-[#0058be] font-bold bg-[#eff4ff]' : 'text-[#0b1c30]'
                  }`}
                >
                  <span>🏨 ทั้งหมด (City & Resort)</span>
                  {selectedHotel === 'all' && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
                <button
                  onClick={() => {
                    onSelectHotel('city');
                    setDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#eff4ff] transition-colors ${
                    selectedHotel === 'city' ? 'text-[#0058be] font-bold bg-[#eff4ff]' : 'text-[#0b1c30]'
                  }`}
                >
                  <span>🏢 City Hotel (กรุงเทพฯ)</span>
                  {selectedHotel === 'city' && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
                <button
                  onClick={() => {
                    onSelectHotel('resort');
                    setDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#eff4ff] transition-colors ${
                    selectedHotel === 'resort' ? 'text-[#0058be] font-bold bg-[#eff4ff]' : 'text-[#0b1c30]'
                  }`}
                >
                  <span>🌴 Resort Hotel (ภูเก็ต)</span>
                  {selectedHotel === 'resort' && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* User Profile Avatar with Online Ring */}
          <button
            id="header-profile-btn"
            onClick={onOpenProfile}
            className="relative flex items-center justify-center p-0.5 rounded-full hover:opacity-90 active:scale-95 transition-transform duration-150"
            title="โปรไฟล์ Sarah Jenkins"
          >
            <img
              src={ASSETS.sarahAvatar}
              alt="Sarah Jenkins"
              className="w-8 h-8 rounded-full object-cover shadow-xs border border-white"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#0058be] rounded-full ring-2 ring-[#f8f9ff]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
