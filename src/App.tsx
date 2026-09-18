import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OverviewView } from './components/OverviewView';
import { SeasonalityView } from './components/SeasonalityView';
import { PredictorView } from './components/PredictorView';
import { FiltersView } from './components/FiltersView';
import { ActionModal, ModalType } from './components/ActionModal';
import { ActiveTab, HotelTypeFilter } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('seasonality');
  const [selectedHotel, setSelectedHotel] = useState<HotelTypeFilter>('all');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col items-center select-none font-sans">
      {/* Mobile Shell Container for executive dashboard feel, fluid on smaller screens and framed cleanly on large monitors */}
      <div className="w-full max-w-md min-h-screen bg-[#f8f9ff] flex flex-col relative shadow-[0_0_50px_rgba(11,28,48,0.06)] border-x border-[#0b1c30]/5">
        {/* Fixed Header */}
        <Header
          activeTab={activeTab}
          selectedHotel={selectedHotel}
          onSelectHotel={(hotel) => {
            setSelectedHotel(hotel);
            showToast(
              `สลับมุมมองพอร์ต: ${
                hotel === 'all'
                  ? 'ทั้งหมด (City & Resort)'
                  : hotel === 'city'
                  ? 'City Hotel (กรุงเทพฯ)'
                  : 'Resort Hotel (ภูเก็ต)'
              }`
            );
          }}
          onOpenProfile={() => setActiveModal('profile')}
        />

        {/* Main Content Area with Top Padding for Fixed Header */}
        <main className="flex-1 w-full pt-16 flex flex-col relative">
          {activeTab === 'overview' && (
            <OverviewView
              selectedHotel={selectedHotel}
              onSelectHotel={setSelectedHotel}
              onOpenModal={setActiveModal}
            />
          )}

          {activeTab === 'seasonality' && (
            <SeasonalityView onOpenModal={setActiveModal} />
          )}

          {activeTab === 'ai-predictor' && (
            <PredictorView
              onOpenModal={setActiveModal}
              onToast={showToast}
            />
          )}

          {activeTab === 'filters-segment' && (
            <FiltersView
              onOpenModal={setActiveModal}
              onToast={showToast}
            />
          )}
        </main>

        {/* Floating Quick Action Toast Banner */}
        {toastMessage && (
          <div className="fixed bottom-20 inset-x-0 z-50 flex justify-center px-4 pointer-events-none animate-slideUp">
            <div className="bg-[#131b2e] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 max-w-sm pointer-events-auto border border-[#213145]">
              <span className="material-symbols-outlined text-[#acedff] text-[18px]">
                info
              </span>
              <span className="text-xs font-medium leading-tight">{toastMessage}</span>
              <button
                onClick={() => setToastMessage(null)}
                className="ml-auto text-[#7c839b] hover:text-white"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </div>
        )}

        {/* Fixed Bottom Navigation Bar */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Interactive Modals */}
        <ActionModal
          modalType={activeModal}
          onClose={() => setActiveModal(null)}
          onConfirmToast={showToast}
        />
      </div>
    </div>
  );
}
