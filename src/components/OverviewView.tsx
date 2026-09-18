import React, { useState } from 'react';
import { ASSETS, BASE_KPIS } from '../data/mockData';
import { HotelTypeFilter, YearFilter } from '../types';
import { ModalType } from './ActionModal';

interface OverviewViewProps {
  selectedHotel: HotelTypeFilter;
  onSelectHotel: (hotel: HotelTypeFilter) => void;
  onOpenModal: (type: ModalType) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  selectedHotel,
  onSelectHotel,
  onOpenModal,
}) => {
  const [selectedYear, setSelectedYear] = useState<YearFilter>('all');
  const [chartMode, setChartMode] = useState<'line' | 'bar'>('line');

  // Derive active KPI set dynamically based on hotel and year filter
  const currentKpis = BASE_KPIS[selectedHotel]?.[selectedYear] || BASE_KPIS.all.all;

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Top Pulse & Executive Greetings Section */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#2170e4] animate-ping"></span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0058be]">
                Live Portfolio Yield
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0b1c30] mt-0.5">
              ภาพรวมแนวโน้มการจอง
            </h1>
          </div>
          <button
            onClick={() => onOpenModal('export-report')}
            id="btn-export-brief"
            className="h-9 px-3.5 bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] rounded-full flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-[#0058be]">
              file_download
            </span>
            <span className="text-xs font-semibold">รายงาน</span>
          </button>
        </div>
        <p className="text-xs text-[#45464d] mt-1">
          วิเคราะห์พลวัตยอดจองและช่วงฤดูกาล ประจำปี 2015 - 2017
        </p>
      </div>

      {/* Interactive Filter Shelf: Hotel Segment & Year Selector */}
      <div className="px-4 py-2 flex flex-col gap-2.5">
        {/* Hotel Category Segmented Pill Bar */}
        <div className="bg-[#dce9ff] p-1 rounded-xl flex items-center justify-between shadow-xs">
          <button
            onClick={() => onSelectHotel('all')}
            className={`flex-1 py-1.5 text-center rounded-lg text-xs transition-all ${
              selectedHotel === 'all'
                ? 'bg-white text-[#0b1c30] font-bold shadow-xs'
                : 'text-[#45464d] hover:text-[#0b1c30]'
            }`}
          >
            ทั้งหมด (All)
          </button>
          <button
            onClick={() => onSelectHotel('city')}
            className={`flex-1 py-1.5 text-center rounded-lg text-xs transition-all ${
              selectedHotel === 'city'
                ? 'bg-white text-[#0b1c30] font-bold shadow-xs'
                : 'text-[#45464d] hover:text-[#0b1c30]'
            }`}
          >
            🏨 โรงแรมในเมือง (City)
          </button>
          <button
            onClick={() => onSelectHotel('resort')}
            className={`flex-1 py-1.5 text-center rounded-lg text-xs transition-all ${
              selectedHotel === 'resort'
                ? 'bg-white text-[#0b1c30] font-bold shadow-xs'
                : 'text-[#45464d] hover:text-[#0b1c30]'
            }`}
          >
            🌴 รีสอร์ท (Resort)
          </button>
        </div>

        {/* Year Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-semibold text-[#45464d] uppercase tracking-wider pl-1 mr-1">
            ปีที่วิเคราะห์:
          </span>
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap active:scale-95 transition-all shadow-xs flex items-center gap-1 ${
              selectedYear === 'all'
                ? 'bg-[#131b2e] text-white'
                : 'bg-[#eff4ff] text-[#45464d] hover:bg-[#e5eeff]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">auto_graph</span>
            <span>2015-2017</span>
          </button>
          {[2017, 2016, 2015].map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr as YearFilter)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap active:scale-95 transition-all font-semibold ${
                selectedYear === yr
                  ? 'bg-[#131b2e] text-white'
                  : 'bg-[#eff4ff] text-[#45464d] hover:bg-[#e5eeff]'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Summary 2x2 Grid */}
      <div className="px-4 pt-1 pb-3">
        <div className="grid grid-cols-2 gap-2.5">
          {/* KPI 1: Total Bookings */}
          <div className="bg-white p-3.5 rounded-xl flex flex-col justify-between shadow-xs border border-[#e2e8f0]/80">
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold text-[#45464d] uppercase tracking-wide">
                ยอดจองทั้งหมด
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#0058be]">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              </div>
            </div>
            <div className="my-1.5">
              <div className="font-mono text-2xl font-bold text-[#0b1c30] tracking-tight">
                {currentKpis.total.toLocaleString()}
              </div>
              <span className="text-xs text-[#45464d]">รายการจอง</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#059669]">
                <span className="material-symbols-outlined text-[12px] font-bold">arrow_upward</span>
                <span className="font-mono text-[10px] font-semibold">{currentKpis.yoy}</span>
              </div>
              <span className="text-[11px] text-[#45464d]">YoY</span>
            </div>
          </div>

          {/* KPI 2: Confirmed Stays */}
          <div className="bg-white p-3.5 rounded-xl flex flex-col justify-between shadow-xs border border-[#e2e8f0]/80">
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold text-[#45464d] uppercase tracking-wide">
                ยืนยันการเข้าพัก
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#d8e2ff] flex items-center justify-center text-[#001a42]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
            </div>
            <div className="my-1.5">
              <div className="font-mono text-2xl font-bold text-[#0b1c30] tracking-tight">
                {currentKpis.confirmed.toLocaleString()}
              </div>
              <span className="text-xs text-[#45464d]">สำเร็จจริง</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#0058be]">
                <span className="font-mono text-[10px] font-bold">{currentKpis.confirmedPct}</span>
              </div>
              <span className="text-[11px] text-[#45464d]">ของยอดรวม</span>
            </div>
          </div>

          {/* KPI 3: Cancellation Rate */}
          <div className="bg-white p-3.5 rounded-xl flex flex-col justify-between shadow-xs border border-[#e2e8f0]/80">
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold text-[#45464d] uppercase tracking-wide">
                อัตราการยกเลิก
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#93000a]">
                <span className="material-symbols-outlined text-[18px]">event_busy</span>
              </div>
            </div>
            <div className="my-1.5">
              <div className="font-mono text-2xl font-bold text-[#ba1a1a] tracking-tight">
                {currentKpis.cancelRate}
              </div>
              <span className="text-xs text-[#45464d]">เฉลี่ยสะสม</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#059669]">
                <span className="material-symbols-outlined text-[12px] font-bold">arrow_downward</span>
                <span className="font-mono text-[10px] font-semibold">{currentKpis.cancelDiff}</span>
              </div>
              <span className="text-[11px] text-[#45464d]">ลดลง (ดีขึ้น)</span>
            </div>
          </div>

          {/* KPI 4: Median Lead Time */}
          <div className="bg-white p-3.5 rounded-xl flex flex-col justify-between shadow-xs border border-[#e2e8f0]/80">
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold text-[#45464d] uppercase tracking-wide">
                จองล่วงหน้าเฉลี่ย
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#d3e4fe] flex items-center justify-center text-[#0058be]">
                <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
              </div>
            </div>
            <div className="my-1.5">
              <div className="font-mono text-2xl font-bold text-[#0b1c30] tracking-tight">
                {currentKpis.leadTime} <span className="text-sm font-sans font-normal text-[#45464d]">วัน</span>
              </div>
              <span className="text-xs text-[#45464d]">Median Lead Time</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#0b1c30]">
                <span className="material-symbols-outlined text-[12px]">schedule</span>
                <span className="font-mono text-[10px] font-semibold">Window นาน</span>
              </div>
              <span className="text-[11px] text-[#0058be] font-semibold">โอกาส ADR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart Card: YoY Booking Pace */}
      <div className="px-4 pb-3">
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e2e8f0]/80 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#0058be] text-[20px]">ssid_chart</span>
                <h2 className="font-bold text-base text-[#0b1c30]">เปรียบเทียบยอดจองรายปี</h2>
              </div>
              <p className="text-xs text-[#45464d]">YoY Monthly Trend (ม.ค. - ธ.ค. 2015 - 2017)</p>
            </div>

            {/* Line / Bar Toggle */}
            <div className="bg-[#eff4ff] p-0.5 rounded-lg flex items-center">
              <button
                onClick={() => setChartMode('line')}
                className={`px-2.5 py-1 rounded-md text-xs flex items-center gap-1 transition-all ${
                  chartMode === 'line'
                    ? 'bg-white text-[#0b1c30] font-bold shadow-xs'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px] text-[#0058be]">show_chart</span>
                <span>เส้น</span>
              </button>
              <button
                onClick={() => setChartMode('bar')}
                className={`px-2.5 py-1 rounded-md text-xs flex items-center gap-1 transition-all ${
                  chartMode === 'bar'
                    ? 'bg-white text-[#0b1c30] font-bold shadow-xs'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">bar_chart</span>
                <span>แท่ง</span>
              </button>
            </div>
          </div>

          {/* Peak Season Callout Banner */}
          <div className="bg-[#eff4ff] rounded-lg p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
              <span className="text-xs font-semibold text-[#0b1c30]">จุดพีคสูงสุดของปี (Summer Peak):</span>
            </div>
            <span className="text-xs font-bold text-[#0058be] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
              ก.ค. - ส.ค. 🚀
            </span>
          </div>

          {/* Chart SVG */}
          <div className="relative w-full h-52 flex flex-col justify-end pt-2">
            <svg className="w-full h-40 overflow-visible" viewBox="0 0 340 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad2017" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#2170e4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2170e4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1="0" y1="20" x2="340" y2="20" stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" />
              <line x1="0" y1="65" x2="340" y2="65" stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" />
              <line x1="0" y1="110" x2="340" y2="110" stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" />
              <line x1="0" y1="155" x2="340" y2="155" stroke="#e2e8f0" strokeWidth="1" />

              {/* Peak Highlight Zone (July - August) */}
              <rect x="160" y="10" width="60" height="145" rx="6" fill="#d3e4fe" fillOpacity="0.45" />

              {chartMode === 'line' ? (
                <g className="transition-opacity duration-300">
                  {/* 2015 Line */}
                  <path
                    d="M 10,145 L 40,142 L 70,138 L 100,130 L 130,120 L 160,110 L 190,88 L 220,95 L 250,105 L 280,115 L 310,125 L 330,128"
                    fill="none"
                    stroke="#94a3b8"
                    strokeDasharray="4,4"
                    strokeWidth="2"
                  />
                  {/* 2016 Line */}
                  <path
                    d="M 10,130 L 40,122 L 70,105 L 100,90 L 130,85 L 160,78 L 190,48 L 220,52 L 250,70 L 280,68 L 310,90 L 330,102"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2.5"
                  />
                  {/* 2017 Area */}
                  <path
                    d="M 10,115 L 40,98 L 70,82 L 100,68 L 130,55 L 160,42 L 190,22 L 220,25 L 250,50 L 280,62 L 310,75 L 330,88 L 330,155 L 10,155 Z"
                    fill="url(#grad2017)"
                  />
                  {/* 2017 Bold Line */}
                  <path
                    d="M 10,115 L 40,98 L 70,82 L 100,68 L 130,55 L 160,42 L 190,22 L 220,25 L 250,50 L 280,62 L 310,75 L 330,88"
                    fill="none"
                    stroke="#0058be"
                    strokeWidth="3.5"
                  />
                  {/* Peak Marker Circles */}
                  <circle cx="190" cy="22" r="5" fill="#0058be" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="220" cy="25" r="4.5" fill="#0058be" stroke="#ffffff" strokeWidth="2" />
                </g>
              ) : (
                <g className="transition-opacity duration-300">
                  <rect x="7" y="115" width="8" height="40" rx="2" fill="#adc6ff" />
                  <rect x="37" y="98" width="8" height="57" rx="2" fill="#adc6ff" />
                  <rect x="67" y="82" width="8" height="73" rx="2" fill="#adc6ff" />
                  <rect x="97" y="68" width="8" height="87" rx="2" fill="#adc6ff" />
                  <rect x="127" y="55" width="8" height="100" rx="2" fill="#2170e4" />
                  <rect x="157" y="42" width="8" height="113" rx="2" fill="#2170e4" />
                  <rect x="187" y="22" width="9" height="133" rx="2" fill="#0058be" />
                  <rect x="217" y="25" width="9" height="130" rx="2" fill="#0058be" />
                  <rect x="247" y="50" width="8" height="105" rx="2" fill="#2170e4" />
                  <rect x="277" y="62" width="8" height="93" rx="2" fill="#adc6ff" />
                  <rect x="307" y="75" width="8" height="80" rx="2" fill="#adc6ff" />
                  <rect x="327" y="88" width="8" height="67" rx="2" fill="#adc6ff" />
                </g>
              )}
            </svg>

            {/* Peak Label Floating Badge */}
            <div className="absolute top-1 left-[54%] -translate-x-1/2 bg-[#0b1c30] text-white px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold shadow-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#acedff]"></span>
              <span>13,850 จอง (สูงสุด)</span>
            </div>

            {/* Months Axis */}
            <div className="flex items-center justify-between text-[#45464d] text-[11px] font-medium px-1 pt-1.5">
              <span>ม.ค.</span>
              <span>มี.ค.</span>
              <span>พ.ค.</span>
              <span className="text-[#0058be] font-bold">ก.ค.</span>
              <span className="text-[#0058be] font-bold">ส.ค.</span>
              <span>ต.ค.</span>
              <span>ธ.ค.</span>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-between pt-1 border-t border-[#e2e8f0]/60">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#0058be] rounded-full"></span>
                <span className="text-[11px] text-[#0b1c30] font-medium">2017 (ปีล่าสุด)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#60a5fa] rounded-full"></span>
                <span className="text-[11px] text-[#45464d]">2016</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#94a3b8] rounded-full"></span>
                <span className="text-[11px] text-[#45464d]">2015</span>
              </div>
            </div>
            <span className="text-[11px] text-[#0058be] bg-[#eff4ff] px-2 py-0.5 rounded-full font-semibold">
              อัตราเติบโต +18.2%
            </span>
          </div>
        </div>
      </div>

      {/* Seasonality Insights Card */}
      <div className="px-4 pb-3">
        <div className="bg-[#eff4ff] rounded-xl p-4 shadow-xs border border-[#dce9ff] flex flex-col gap-2.5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#d8e2ff] flex items-center justify-center text-[#0058be]">
                <span className="material-symbols-outlined text-[20px]">lightbulb</span>
              </div>
              <h3 className="font-bold text-base text-[#0b1c30]">ข้อสังเกตสำคัญตามฤดูกาล</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#0058be] text-[11px] font-semibold">
              AI Analysis
            </span>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            {/* Summer Peak */}
            <div className="p-3 rounded-lg bg-white flex items-start gap-2.5 shadow-2xs">
              <span className="material-symbols-outlined text-[20px] text-[#0058be] mt-0.5">sunny</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b1c30]">ช่วงพีคสูงสุด: กรกฎาคม - สิงหาคม</span>
                  <span className="text-[10px] font-mono font-semibold text-[#059669] bg-[#ecfdf5] px-1.5 py-0.5 rounded-md">
                    High Demand
                  </span>
                </div>
                <p className="text-xs text-[#45464d] mt-0.5 leading-relaxed">
                  ความต้องการห้องพักพุ่งสูงจากกลุ่มนักท่องเที่ยวครอบครัวในยุโรปและเอเชีย ส่งผลให้ Occupancy สูงเกิน 88% ทั้งโรงแรมในเมืองและรีสอร์ท
                </p>
              </div>
            </div>

            {/* Low Season */}
            <div className="p-3 rounded-lg bg-white flex items-start gap-2.5 shadow-2xs">
              <span className="material-symbols-outlined text-[20px] text-[#76777d] mt-0.5">ac_unit</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b1c30]">ช่วงโลว์ซีซัน: มกราคม</span>
                  <span className="text-[10px] font-mono font-semibold text-[#45464d] bg-[#f1f5f9] px-1.5 py-0.5 rounded-md">
                    Trough Period
                  </span>
                </div>
                <p className="text-xs text-[#45464d] mt-0.5 leading-relaxed">
                  ยอดจองแตะระดับต่ำสุดของรอบปี (เฉลี่ย 4,120 รายการ) ควรกระตุ้นยอดขายล่วงหน้าด้วยแพ็กเกจ Early-bird และตลาดสัมมนา MICE
                </p>
              </div>
            </div>

            {/* Dynamic Pricing Box */}
            <div className="p-3 rounded-lg bg-[#d3e4fe]/70 text-[#0b1c30] flex flex-col gap-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0058be] text-[20px]">bolt</span>
                <span className="text-xs font-bold">ข้อเสนอแนะการปรับราคา (Dynamic Pricing Alert)</span>
              </div>
              <p className="text-xs text-[#45464d] leading-relaxed">
                แนะนำปรับเพิ่ม ADR สำหรับเดือน ก.ค. - ส.ค. ขึ้นอีก <strong>+12% ถึง +15%</strong> และขยายเงื่อนไข Non-refundable เพื่อป้องกันการยกเลิกที่ 37%
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onOpenModal('adjust-yield')}
                  className="px-3 py-1.5 bg-[#0058be] text-white rounded-lg text-xs font-semibold active:scale-95 transition-all shadow-xs flex items-center gap-1"
                >
                  <span>ปรับอัตราผลตอบแทน</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => onOpenModal('room-details')}
                  className="px-3 py-1.5 bg-white text-[#0b1c30] rounded-lg text-xs font-medium hover:bg-[#f8f9ff] active:scale-95 transition-all"
                >
                  ดูรายละเอียดห้อง
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Hospitality Showcase Cards: City Hotel vs Resort Realities */}
      <div className="px-4 pb-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-base text-[#0b1c30]">เปรียบเทียบประเภทที่พัก</span>
          <span className="text-xs text-[#0058be] font-medium">สัดส่วนพอร์ต</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {/* City Hotel */}
          <div
            onClick={() => onSelectHotel('city')}
            className={`bg-white rounded-xl overflow-hidden shadow-xs flex flex-col cursor-pointer border transition-all ${
              selectedHotel === 'city' ? 'border-[#0058be] ring-2 ring-[#0058be]/20' : 'border-[#e2e8f0]'
            }`}
          >
            <div
              className="relative h-24 w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${ASSETS.cityHotel}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/80 via-transparent to-transparent"></div>
              <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-md rounded-md text-[11px] font-bold text-[#0b1c30]">
                City Hotel
              </span>
            </div>
            <div className="p-2.5 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#45464d]">ยอดจองสะสม</span>
                <span className="font-mono text-xs font-semibold text-[#0b1c30]">79,330</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#45464d]">อัตราเข้าพัก</span>
                <span className="font-mono text-[10px] text-[#0058be] font-bold">66.4%</span>
              </div>
            </div>
          </div>

          {/* Resort Hotel */}
          <div
            onClick={() => onSelectHotel('resort')}
            className={`bg-white rounded-xl overflow-hidden shadow-xs flex flex-col cursor-pointer border transition-all ${
              selectedHotel === 'resort' ? 'border-[#0058be] ring-2 ring-[#0058be]/20' : 'border-[#e2e8f0]'
            }`}
          >
            <div
              className="relative h-24 w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${ASSETS.resortHotel}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/80 via-transparent to-transparent"></div>
              <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-md rounded-md text-[11px] font-bold text-[#0b1c30]">
                Resort Hotel
              </span>
            </div>
            <div className="p-2.5 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#45464d]">ยอดจองสะสม</span>
                <span className="font-mono text-xs font-semibold text-[#0b1c30]">40,060</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#45464d]">อัตราเข้าพัก</span>
                <span className="font-mono text-[10px] text-[#059669] font-bold">33.6%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
