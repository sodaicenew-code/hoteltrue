import React, { useState } from 'react';
import { HEATMAP_NOV, HEATMAP_OCT, MONTHLY_DEMAND_SERIES } from '../data/mockData';
import { ModalType } from './ActionModal';

interface SeasonalityViewProps {
  onOpenModal: (type: ModalType) => void;
}

export const SeasonalityView: React.FC<SeasonalityViewProps> = ({ onOpenModal }) => {
  const [heatmapMonth, setHeatmapMonth] = useState<'nov' | 'oct'>('nov');
  const [activeCellTooltip, setActiveCellTooltip] = useState<string | null>(null);

  const activeHeatmap = heatmapMonth === 'nov' ? HEATMAP_NOV : HEATMAP_OCT;

  const getHeatmapColor = (val: number) => {
    if (val >= 95) return 'bg-[#131b2e] text-white font-bold';
    if (val >= 85) return 'bg-[#0058be] text-white font-bold';
    if (val >= 60) return 'bg-[#2170e4] text-white font-medium';
    if (val >= 40) return 'bg-[#dce9ff] text-[#0b1c30]';
    if (val >= 20) return 'bg-[#e5eeff] text-[#45464d]';
    return 'bg-[#eff4ff] text-[#45464d]';
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Top Header & Status Chips */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dce9ff] text-[#0058be]">
          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            insights
          </span>
          <span className="text-xs font-semibold">วิเคราะห์ช่วงพีค & ความเสี่ยง</span>
        </div>
        <div className="flex items-center gap-1 text-[#45464d]">
          <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
          <span className="text-xs font-medium">Realtime Q4</span>
        </div>
      </div>

      {/* Card 1: Avg Cancellation Gauge */}
      <div className="px-4 mt-2">
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e2e8f0]/80 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[#45464d]">อัตราการยกเลิกเฉลี่ยรายปี (Avg Cancellation)</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-mono text-2xl font-bold text-[#0b1c30] tracking-tight">37.0%</span>
                <span className="font-mono text-[10px] font-bold text-[#ba1a1a] bg-[#ffdad6]/60 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <span>▲</span> +2.4% MoM
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#ffdad6]/50 flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[20px]">event_busy</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[#45464d] text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0058be]"></span>
                เสี่ยงปานกลาง-สูง
              </span>
              <span className="font-mono text-[10px] text-[#ba1a1a] font-bold">เกณฑ์วิกฤต: 45%</span>
            </div>
            {/* Multi-segment Progress bar */}
            <div className="w-full h-2.5 bg-[#e5eeff] rounded-full overflow-hidden flex">
              <div className="h-full bg-[#0058be] transition-all duration-500" style={{ width: '25%' }}></div>
              <div className="h-full bg-[#2170e4] transition-all duration-500" style={{ width: '12%' }}></div>
              <div className="h-full bg-[#ba1a1a]/80 transition-all duration-500" style={{ width: '2%' }}></div>
              <div className="h-full bg-transparent flex-1"></div>
            </div>
            <div className="flex justify-between text-[#45464d] font-mono text-[10px] opacity-80 pt-0.5">
              <span>0%</span>
              <span>25% ปลอดภัย</span>
              <span>35% เฝ้าระวัง</span>
              <span>50%+ วิกฤต</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Demand Volume vs Cancellation % */}
      <div className="px-4 mt-3.5">
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e2e8f0]/80 flex flex-col">
          <div className="flex items-center justify-between pb-2">
            <div className="flex flex-col">
              <span className="font-bold text-base text-[#0b1c30]">ยอดจองจริง VS การยกเลิก</span>
              <span className="text-xs text-[#45464d]">Demand Volume vs Cancellation % รายเดือน</span>
            </div>
            <span className="material-symbols-outlined text-[#0058be] text-[20px]">bar_chart</span>
          </div>

          <div className="flex items-center gap-4 py-1">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#0058be]"></span>
              <span className="text-xs text-[#45464d]">ยอดจอง (ห้อง)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-1 bg-[#ba1a1a] rounded-full"></span>
              <span className="text-xs text-[#45464d]">% ยกเลิก (เส้นแดง)</span>
            </div>
          </div>

          {/* SVG & Bar Visual Container */}
          <div className="relative w-full h-44 mt-2 flex flex-col justify-end">
            <svg
              className="absolute inset-0 w-full h-36 z-10 pointer-events-none"
              viewBox="0 0 320 120"
              preserveAspectRatio="none"
            >
              <path
                d="M 20 80 Q 60 70, 80 72 T 140 65 T 200 45 T 260 18 T 300 20"
                fill="none"
                stroke="#ba1a1a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="80" r="3" fill="#ba1a1a" />
              <circle cx="80" cy="72" r="3" fill="#ba1a1a" />
              <circle cx="140" cy="65" r="3" fill="#ba1a1a" />
              <circle cx="200" cy="45" r="3" fill="#ba1a1a" />
              <circle cx="260" cy="18" r="4.5" fill="#ba1a1a" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="300" cy="20" r="3.5" fill="#ba1a1a" />
            </svg>

            {/* Peak Month Badge */}
            <div className="absolute top-1 right-3 z-20 bg-[#ffdad6] text-[#93000a] px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold flex items-center gap-1 shadow-xs">
              <span>พ.ย. พีคสุด 41.8%</span>
            </div>

            {/* Demand Bars */}
            <div className="grid grid-cols-6 gap-2 items-end h-36 w-full pt-4 z-0">
              {MONTHLY_DEMAND_SERIES.map((item) => (
                <div key={item.month} className="flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    className={`w-full max-w-[28px] rounded-t-sm transition-all duration-300 ${
                      item.isPeak
                        ? 'bg-[#0058be]'
                        : item.demandPct >= 75
                        ? 'bg-[#2170e4]'
                        : 'bg-[#dce9ff]'
                    }`}
                    style={{ height: `${item.demandPct}%` }}
                  ></div>
                  <span
                    className={`font-mono text-[11px] ${
                      item.isPeak
                        ? 'text-[#0058be] font-bold'
                        : item.demandPct >= 75
                        ? 'text-[#0b1c30] font-semibold'
                        : 'text-[#45464d]'
                    }`}
                  >
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callout */}
          <div className="mt-3 p-2.5 bg-[#eff4ff] rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#0058be]">priority_high</span>
              <span className="text-xs text-[#0b1c30] font-medium">
                ต.ค. - พ.ย. ยกเลิกเฉลี่ยสูงถึง ~40% จากเทศกาล
              </span>
            </div>
            <button
              onClick={() => onOpenModal('deposit-policy')}
              className="font-mono text-[11px] text-[#0058be] font-bold hover:underline"
            >
              ดูแนวทาง
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Booking Density Matrix Heatmap */}
      <div className="px-4 mt-3.5">
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e2e8f0]/80 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-base text-[#0b1c30]">ฮีทแมพความหนาแน่นการจอง</span>
              <span className="text-xs text-[#45464d]">Booking Density Matrix (วัน vs สัปดาห์)</span>
            </div>
            <button
              onClick={() => setHeatmapMonth(heatmapMonth === 'nov' ? 'oct' : 'nov')}
              className="px-3 py-1 bg-[#e5eeff] hover:bg-[#dce9ff] rounded-full text-[#0058be] text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all"
            >
              <span>{heatmapMonth === 'nov' ? 'พ.ย. 2024' : 'ต.ค. 2024'}</span>
              <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
            </button>
          </div>

          {/* Matrix Grid */}
          <div className="flex flex-col gap-1.5">
            <div className="grid grid-cols-8 gap-1 text-center font-mono text-[10px] font-semibold text-[#45464d] mb-0.5">
              <span className="text-left">สัปดาห์</span>
              <span>จ</span>
              <span>อ</span>
              <span>พ</span>
              <span>พฤ</span>
              <span className="text-[#0058be]">ศ</span>
              <span className="text-[#0058be]">ส</span>
              <span>อา</span>
            </div>

            {activeHeatmap.map((row) => (
              <div key={row.week} className="grid grid-cols-8 gap-1 items-center">
                <span className="font-mono text-[10px] text-[#45464d] text-left font-semibold">
                  {row.week}
                </span>
                {row.days.map((val, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveCellTooltip(`${row.week} - วันที่ ${idx + 1}: ${val} ห้อง/วัน`)}
                    onMouseLeave={() => setActiveCellTooltip(null)}
                    onClick={() => setActiveCellTooltip(`${row.week} - วันที่ ${idx + 1}: ${val} ห้อง/วัน`)}
                    className={`h-6 rounded-xs flex items-center justify-center font-mono text-[9px] cursor-pointer transition-transform hover:scale-105 ${getHeatmapColor(
                      val
                    )}`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Dynamic cell inspection prompt */}
          {activeCellTooltip && (
            <div className="text-[11px] font-mono text-center text-[#0058be] bg-[#eff4ff] py-1 rounded-md animate-fadeIn">
              {activeCellTooltip}
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center justify-between pt-1 text-[#45464d]">
            <span className="font-mono text-[10px]">ความหนาแน่น (ห้อง/วัน)</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px]">เบาบาง</span>
              <div className="flex gap-0.5">
                <span className="w-3 h-3 rounded-xs bg-[#eff4ff]"></span>
                <span className="w-3 h-3 rounded-xs bg-[#dce9ff]"></span>
                <span className="w-3 h-3 rounded-xs bg-[#2170e4]"></span>
                <span className="w-3 h-3 rounded-xs bg-[#0058be]"></span>
                <span className="w-3 h-3 rounded-xs bg-[#131b2e]"></span>
              </div>
              <span className="font-mono text-[10px] font-bold text-[#0058be]">แน่นสุด</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 4: Cancellation by Market Segment */}
      <div className="px-4 mt-3.5">
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e2e8f0]/80 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-base text-[#0b1c30]">สถิติยกเลิกตามกลุ่มตลาด</span>
              <span className="text-xs text-[#45464d]">Cancellation by Market Segment</span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-[#45464d]">pie_chart</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* OTA */}
            <div className="bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#0058be]">travel_explore</span>
                  <span className="text-xs font-semibold text-[#0b1c30]">Online Travel Agency (OTA)</span>
                </div>
                <span className="font-mono text-sm font-bold text-[#0b1c30]">41.2%</span>
              </div>
              <div className="w-full h-2 bg-[#e5eeff] rounded-full overflow-hidden">
                <div className="h-full bg-[#2170e4] transition-all duration-500" style={{ width: '41.2%' }}></div>
              </div>
              <div className="flex justify-between items-center text-[#45464d] text-[11px]">
                <span>Booking.com & Agoda เฉลี่ย 3-5 วันก่อนเข้าพัก</span>
                <span>ปานกลาง</span>
              </div>
            </div>

            {/* Groups & Corporate */}
            <div className="bg-[#ffdad6]/30 p-3 rounded-lg flex flex-col gap-1.5 border border-[#ffdad6]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">groups</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0b1c30]">Groups & Corporate</span>
                    <span className="bg-[#ffdad6] text-[#93000a] px-1.5 py-0.2 rounded-full font-mono text-[9px] font-bold">
                      ความเสี่ยงสูง
                    </span>
                  </div>
                </div>
                <span className="font-mono text-sm text-[#ba1a1a] font-bold">61.1%</span>
              </div>
              <div className="w-full h-2 bg-[#ffdad6] rounded-full overflow-hidden">
                <div className="h-full bg-[#ba1a1a] transition-all duration-500" style={{ width: '61.1%' }}></div>
              </div>
              <div className="flex justify-between items-center text-[#45464d] text-[11px]">
                <span>บล็อกห้องขนาดใหญ่ มีโอกาสปล่อยหลุดโค้งสุดท้าย</span>
                <span className="text-[#ba1a1a] font-bold">ต้องระวัง</span>
              </div>
            </div>

            {/* Direct Booking */}
            <div className="bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#0058be]">verified_user</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#0b1c30]">Direct Booking</span>
                    <span className="bg-[#d3e4fe] text-[#0058be] px-1.5 py-0.2 rounded-full font-mono text-[9px] font-bold">
                      เสถียรสุด
                    </span>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold text-[#0b1c30]">17.5%</span>
              </div>
              <div className="w-full h-2 bg-[#e5eeff] rounded-full overflow-hidden">
                <div className="h-full bg-[#0058be] transition-all duration-500" style={{ width: '17.5%' }}></div>
              </div>
              <div className="flex justify-between items-center text-[#45464d] text-[11px]">
                <span>จองตรงหน้าเว็บ/แชท ความเสี่ยงยกเลิกต่ำสุด</span>
                <span className="text-[#059669] font-bold">ความเสี่ยงต่ำ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 5: AI Yield Advisor */}
      <div className="px-4 mt-3.5 mb-2">
        <div className="bg-[#131b2e] text-white p-4 rounded-xl shadow-md flex flex-col gap-2 relative overflow-hidden border border-[#213145]">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#2170e4]/20 pointer-events-none blur-xl"></div>
          <div className="flex items-center gap-2 z-10">
            <span className="material-symbols-outlined text-[22px] text-[#acedff]">smart_toy</span>
            <span className="font-bold text-base text-white">กลยุทธ์แนะนำ: AI Yield Advisor</span>
          </div>
          <p className="text-xs text-[#d3e4fe] leading-relaxed z-10">
            เนื่องจากกลุ่ม <span className="font-bold text-white">Groups มีอัตราการยกเลิกสูงถึง 61.1%</span> ในช่วง พ.ย. แนะนำให้ปรับนโยบาย{' '}
            <span className="text-[#acedff] font-semibold">Non-Refundable Deposit 30%</span> ล่วงหน้า 14 วัน และเปิดตั้งค่า Overbooking ได้สูงสุด +8% ในวันศุกร์-เสาร์
          </p>
          <div className="flex items-center gap-2 mt-1 z-10">
            <button
              onClick={() => onOpenModal('deposit-policy')}
              className="flex-1 h-11 px-3 bg-[#2170e4] hover:bg-[#0058be] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">lock_reset</span>
              <span>ปรับนโยบาย Deposit</span>
            </button>
            <button
              onClick={() => onOpenModal('overbook-setting')}
              className="h-11 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1 active:scale-95 transition-all"
            >
              <span>ตั้งค่า Overbook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
