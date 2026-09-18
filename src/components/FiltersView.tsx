import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ModalType } from './ActionModal';

interface FiltersViewProps {
  onOpenModal: (type: ModalType) => void;
  onToast: (msg: string) => void;
}

export const FiltersView: React.FC<FiltersViewProps> = ({ onOpenModal, onToast }) => {
  const [cityActive, setCityActive] = useState(true);
  const [resortActive, setResortActive] = useState(true);
  const [years, setYears] = useState({ 2015: true, 2016: true, 2017: true });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic row calculation
  const getSelectedRowsCount = () => {
    let base = 0;
    if (cityActive) base += 79330;
    if (resortActive) base += 40060;

    let yearFraction = 0;
    if (years[2015]) yearFraction += 21996;
    if (years[2016]) yearFraction += 56707;
    if (years[2017]) yearFraction += 40687;

    if (base === 0 || yearFraction === 0) return 0;
    return Math.round((base / 119390) * yearFraction);
  };

  const toggleYear = (yr: 2015 | 2016 | 2017) => {
    const nextVal = !years[yr];
    setYears((prev) => ({ ...prev, [yr]: nextVal }));
    onToast(`ปรับตัวกรองปี: ${yr} (${nextVal ? 'รวม' : 'ตัดออก'})`);
  };

  const toggleAllYears = () => {
    const allSelected = years[2015] && years[2016] && years[2017];
    const target = !allSelected;
    setYears({ 2015: target, 2016: target, 2017: target });
    onToast(target ? 'เลือกข้อมูลทุกปี (2015-2017)' : 'ยกเลิกตัวกรองปีทั้งหมด');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    onToast('กำลังเชื่อมต่อฐานข้อมูล PMS Cloud API...');
    setTimeout(() => {
      setIsRefreshing(false);
      onToast('อัปเดตข้อมูลตรงกันกับระบบกลางแล้ว (119,390 แถว)');
    }, 900);
  };

  const handleReset = () => {
    setCityActive(true);
    setResortActive(true);
    setYears({ 2015: true, 2016: true, 2017: true });
    onToast('คืนค่าตัวกรองข้อมูลเริ่มต้นทั้งหมด');
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-3.5 pb-28 pt-2">
      {/* Top Section Title & Context */}
      <div className="flex flex-col space-y-1 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#0058be] tracking-wider uppercase">
            การควบคุมพารามิเตอร์
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#0b1c30] font-mono text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            SYNCED LIVE
          </span>
        </div>
        <h2 className="text-xl font-bold text-[#0b1c30]">ตั้งค่าตัวกรองข้อมูล</h2>
        <p className="text-xs text-[#45464d]">
          ปรับแต่งขอบเขตการคำนวณ รายงาน และเกณฑ์การประมวลผลโมเดล AI
        </p>
      </div>

      {/* Hotel Property Multi-Selection Deck */}
      <div className="flex flex-col space-y-2.5 bg-white rounded-xl p-4 shadow-xs border border-[#e2e8f0]/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#0058be] text-[20px]">apartment</span>
            <span className="text-xs font-bold text-[#0b1c30]">กลุ่มประเภทโรงแรม (Properties)</span>
          </div>
          <span className="font-mono text-[10px] font-semibold text-[#45464d] bg-[#eff4ff] px-2 py-0.5 rounded-full">
            2 ตัวเลือกพร้อมใช้งาน
          </span>
        </div>

        {/* City Hotel Card */}
        <div
          className={`flex items-center justify-between p-3 rounded-xl bg-[#eff4ff] transition-all duration-200 ${
            cityActive ? '' : 'opacity-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0058be]/10 flex items-center justify-center text-[#0058be]">
              <span className="material-symbols-outlined text-[24px]">domain</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[#0b1c30]">City Hotel</span>
              <span className="text-xs text-[#45464d]">โรงแรมธุรกิจในเมือง</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="font-mono text-xs font-bold text-[#0058be]">79,330</span>
                <span className="text-[11px] text-[#45464d]">รายการบันทึก (66.4%)</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              const next = !cityActive;
              setCityActive(next);
              onToast(`${next ? 'เปิดใช้งาน' : 'ปิดการวิเคราะห์'} City Hotel`);
            }}
            className={`w-12 h-7 rounded-full relative transition-colors duration-200 p-0.5 focus:outline-none ${
              cityActive ? 'bg-[#0058be]' : 'bg-[#dce9ff]'
            }`}
          >
            <span
              className={`block w-6 h-6 bg-white rounded-full shadow-xs transform transition-transform duration-200 ${
                cityActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Resort Hotel Card */}
        <div
          className={`flex items-center justify-between p-3 rounded-xl bg-[#eff4ff] transition-all duration-200 ${
            resortActive ? '' : 'opacity-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#dce9ff] flex items-center justify-center text-[#0090a9]">
              <span className="material-symbols-outlined text-[24px]">beach_access</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[#0b1c30]">Resort Hotel</span>
              <span className="text-xs text-[#45464d]">รีสอร์ทเพื่อการพักผ่อนริมทะเล</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="font-mono text-xs font-bold text-[#0b1c30]">40,060</span>
                <span className="text-[11px] text-[#45464d]">รายการบันทึก (33.6%)</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              const next = !resortActive;
              setResortActive(next);
              onToast(`${next ? 'เปิดใช้งาน' : 'ปิดการวิเคราะห์'} Resort Hotel`);
            }}
            className={`w-12 h-7 rounded-full relative transition-colors duration-200 p-0.5 focus:outline-none ${
              resortActive ? 'bg-[#0058be]' : 'bg-[#dce9ff]'
            }`}
          >
            <span
              className={`block w-6 h-6 bg-white rounded-full shadow-xs transform transition-transform duration-200 ${
                resortActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Year Multi-Filter Segment Shelf */}
      <div className="flex flex-col space-y-2.5 bg-white rounded-xl p-4 shadow-xs border border-[#e2e8f0]/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#0058be] text-[20px]">calendar_today</span>
            <span className="text-xs font-bold text-[#0b1c30]">ช่วงปีการวิเคราะห์ (Arrival Years)</span>
          </div>
          <button
            onClick={toggleAllYears}
            className="text-xs text-[#0058be] font-bold hover:underline"
          >
            เลือกทั้งหมด
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          {/* 2015 */}
          <button
            onClick={() => toggleYear(2015)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all active:scale-95 shadow-xs ${
              years[2015]
                ? 'bg-[#0058be] text-white'
                : 'bg-[#eff4ff] text-[#45464d] hover:bg-[#e5eeff]'
            }`}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-80">Base</span>
            <span className="font-bold text-base mt-0.5">2015</span>
            <span className="font-mono text-[10px] mt-0.5 opacity-90">21,996 คิว</span>
          </button>

          {/* 2016 */}
          <button
            onClick={() => toggleYear(2016)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all active:scale-95 shadow-xs ${
              years[2016]
                ? 'bg-[#0058be] text-white'
                : 'bg-[#eff4ff] text-[#45464d] hover:bg-[#e5eeff]'
            }`}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-80">Peak</span>
            <span className="font-bold text-base mt-0.5">2016</span>
            <span className="font-mono text-[10px] mt-0.5 opacity-90">56,707 คิว</span>
          </button>

          {/* 2017 */}
          <button
            onClick={() => toggleYear(2017)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all active:scale-95 shadow-xs ${
              years[2017]
                ? 'bg-[#0058be] text-white'
                : 'bg-[#eff4ff] text-[#45464d] hover:bg-[#e5eeff]'
            }`}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-80">Active</span>
            <span className="font-bold text-base mt-0.5">2017</span>
            <span className="font-mono text-[10px] mt-0.5 opacity-90">40,687 คิว</span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-[#e2e8f0]/60">
          <span className="text-xs text-[#45464d]">ยอดรวมที่เข้าเกณฑ์กรองปัจจุบัน:</span>
          <span className="font-mono text-sm font-bold text-[#0058be]">
            {getSelectedRowsCount().toLocaleString()} แถว
          </span>
        </div>
      </div>

      {/* Data Source & Pipeline Health */}
      <div className="flex flex-col space-y-3 bg-white rounded-xl p-4 shadow-xs border border-[#e2e8f0]/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#0058be] text-[20px]">database</span>
            <span className="text-xs font-bold text-[#0b1c30]">แหล่งข้อมูล & สถานะการเตรียมข้อมูล</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold">
            READY (100%)
          </span>
        </div>

        {/* CSV File Status */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#eff4ff]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#0058be]">
              <span className="material-symbols-outlined text-[20px]">description</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-[#0b1c30]">hotel_bookings.csv</span>
              <span className="text-[11px] text-[#45464d]">ขนาด 14.8 MB • แปลงเข้าระบบแล้ว</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-mono text-xs font-bold text-[#0b1c30]">119,390</span>
            <span className="block text-[10px] text-[#45464d]">รายการสมบูรณ์</span>
          </div>
        </div>

        {/* Data Preprocessing Audit List */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-mono font-bold text-[#45464d] uppercase tracking-wider">
            กระบวนการคลีนซิ่งข้อมูล (DATA CLEANING CHECKLIST)
          </span>
          <div className="flex items-start gap-2 p-1.5 rounded-lg bg-[#f8f9ff]">
            <span className="material-symbols-outlined text-emerald-600 text-[18px] mt-0.5">check_circle</span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#0b1c30]">
                ตัดแถวที่ไม่มีผู้เข้าพัก (Zero Guests Drop)
              </span>
              <span className="text-[11px] text-[#45464d]">
                ลบรายการที่ Adults, Children และ Babies เป็น 0 พร้อมกัน (180 รายการ)
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-1.5 rounded-lg bg-[#f8f9ff]">
            <span className="material-symbols-outlined text-emerald-600 text-[18px] mt-0.5">check_circle</span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#0b1c30]">
                จัดการค่าว่าง Country & Children
              </span>
              <span className="text-[11px] text-[#45464d]">
                แทนค่า 'PRT' / 'Unknown' ในรหัสสัญชาติ และเติม 0 ให้จำนวนผู้ติดตาม
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-1.5 rounded-lg bg-[#f8f9ff]">
            <span className="material-symbols-outlined text-emerald-600 text-[18px] mt-0.5">check_circle</span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#0b1c30]">
                คำนวณฟิลด์ Total Stay & Lead Category
              </span>
              <span className="text-[11px] text-[#45464d]">
                รวม Weekend + Week Nights และจัดกลุ่ม Lead Time เป็น 5 ระยะ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Actions & Quick Export */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => onOpenModal('export-report')}
          className="w-full h-12 bg-[#0b1c30] hover:bg-[#131b2e] text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-xs active:scale-98 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">file_download</span>
          <span>ดาวน์โหลดรายงานสรุป PDF / Excel</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-11 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0058be] flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors active:scale-98"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${isRefreshing ? 'animate-spin' : ''}`}
            >
              sync
            </span>
            <span>{isRefreshing ? 'กำลังซิงค์...' : 'รีเฟรชข้อมูลล่าสุด'}</span>
          </button>
          <button
            onClick={handleReset}
            className="h-11 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#45464d] flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>ล้างตัวกรองทั้งหมด</span>
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div
        onClick={() => onOpenModal('profile')}
        className="flex items-center justify-between p-3.5 rounded-xl bg-white shadow-xs border border-[#e2e8f0]/80 cursor-pointer hover:bg-[#f8f9ff] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={ASSETS.sarahPortrait}
              alt="Sarah Jenkins"
              className="w-12 h-12 rounded-full object-cover shadow-xs border border-white"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-[#0b1c30]">Sarah Jenkins</span>
              <span className="material-symbols-outlined text-[#0058be] text-[16px]">verified</span>
            </div>
            <span className="text-xs text-[#45464d]">ผู้วิเคราะห์: Hotel Operations Director</span>
            <span className="text-[11px] font-semibold text-[#0058be] mt-0.5">
              Asset Portfolio HQ • Access Granted
            </span>
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#45464d]">
          <span className="material-symbols-outlined text-[18px]">shield</span>
        </div>
      </div>
    </div>
  );
};
