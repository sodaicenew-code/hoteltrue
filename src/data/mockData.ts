export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACAja0HEeZQt8Mtufx2_ujPJKzkMOgkEcKfB5aXrpCHPKyUREQyY-e92Yn_Ia8U_z-OUvOz0P_6k2vUVKWYbedU57xTgN2MMjLGp9BUnvlVSxgR57NccCqIwOkNWMcjUOymk5fnmw5FnIJm6urGlWvyZS7PPkZlwSm0LXkjfsJ779Bx5hZEwmaNCMUP2sdLYjetxewEXOUlzIRudsHiknJlqz8qKl2xZXD7WKShX1QlcSI9EBfQBk',
  sarahAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4qwJ-P8x3eUBCRZvaxwl9zb7TC1EIzDWKqWsfU1VKw0m6pgh58bwGoJegCV-GKYB9hm1oQl4RH9TT7-GEvuPC1VsAI2jdXxqSJZ4vvcxGZYxNjEkc6lw0M20vQi4kSvhnZidW0iLbkbkP4AmVnLgvuI6XUucuMn6I7WOcAx2pVLvOyS6E0wLiHGNRa_Z8eA6bP2s34sKQoD4JvMu_VIpvrw84CjNgOmZYuNpwV4tvroFP102GQ6w',
  sarahPortrait: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB979X9_Zf43v8OVtEBFvxzWfTJg8oJCjQLJdQ-ShdeQ6tWVYN1b1_9-lJzAeSxLBQRiXCJWbTnIMM_OXwLJ8VbLSSWuNnBYgvUWzhPIKPpvW9TAP-nQdZE5NPe3Qx5Pdik9kAjiWjOEB4Bh7ZgfwoifgGMPBUp8ebfmn4IU6AKELsPHhf2MSV9B2lBQeLG9ZakEz9XhgivGd_oYvIFDkgH2Ux-WSb4xHKBgOHpEsprvgYTsijaZUs',
  cityHotel: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsu5bi0WJyRK8ZZzSkZmUf2E2Z4oC9gLKYgC0E2xIJq3Krr3HoHozzNsa5QkUmYKDcqSnlkyxGkfi27L6tepUi_66PDS2oZ5r1VFyYuLDmjoKRcYRSa_Gy5kKgBZkg-tER0Sw4185QtfflhTepQ0WBQs2UtnVczP7rDx3kBjlJ3-V75u28heaoe1Vao5crcqzdtT2v0LhCvf1YB1CCG7yTFJKiMSa-3_bOC0pe1C_S5-B7hzzVOVw',
  resortHotel: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYLfZDnfG1rjMyVdfGzNzc8JMw0JxM7qI70laVzpAfIMizP_qGmrOEQOpLbMLp-U4q7NUxeg03FbjuFUS8YqPQ8B-w-THCj_Z5B4lWQh5KRw4L02yFNo1v1S8IrGCN0dNWT3SVBTiVvp4Bf-kFeFN9FqsnZwOSEhbuUt_ol5NPwL_x0nSs3WduikJoRAjgi_zp7gejR4wOR79R5IvOdrK3BKW72osVM7dqlyyYjLTYHG2_bUKbrT4',
};

export const MONTH_NAMES_TH = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];

export const HEATMAP_NOV = [
  { week: 'W 44', days: [12, 24, 28, 45, 78, 96, 72] },
  { week: 'W 45', days: [22, 30, 42, 65, 89, 98, 80] },
  { week: 'W 46', days: [35, 48, 60, 74, 95, 100, 92] },
  { week: 'W 47', days: [18, 25, 38, 52, 84, 94, 70] },
];

export const HEATMAP_OCT = [
  { week: 'W 40', days: [10, 18, 22, 38, 64, 82, 59] },
  { week: 'W 41', days: [16, 25, 36, 55, 76, 88, 68] },
  { week: 'W 42', days: [20, 28, 40, 58, 80, 90, 74] },
  { week: 'W 43', days: [25, 34, 45, 62, 85, 93, 76] },
];

export const MONTHLY_DEMAND_SERIES = [
  { month: 'ก.ค.', demandPct: 48, cancelRate: 31.2 },
  { month: 'ส.ค.', demandPct: 55, cancelRate: 33.4 },
  { month: 'ก.ย.', demandPct: 62, cancelRate: 34.8 },
  { month: 'ต.ค.', demandPct: 78, cancelRate: 37.9 },
  { month: 'พ.ย.', demandPct: 96, cancelRate: 41.8, isPeak: true },
  { month: 'ธ.ค.', demandPct: 90, cancelRate: 39.5 },
];

export const BASE_KPIS = {
  all: {
    all: { total: 119390, yoy: '+12.4%', confirmed: 75166, confirmedPct: '63.0%', cancelRate: '37.0%', cancelDiff: '-2.1%', leadTime: 69 },
    2017: { total: 57494, yoy: '+14.7%', confirmed: 36441, confirmedPct: '63.4%', cancelRate: '36.6%', cancelDiff: '-0.8%', leadTime: 71 },
    2016: { total: 50119, yoy: '+12.1%', confirmed: 31370, confirmedPct: '62.6%', cancelRate: '37.4%', cancelDiff: '-0.1%', leadTime: 68 },
    2015: { total: 11777, yoy: 'Base', confirmed: 7355, confirmedPct: '62.5%', cancelRate: '37.5%', cancelDiff: '0.0%', leadTime: 64 },
  },
  city: {
    all: { total: 79330, yoy: '+13.8%', confirmed: 46228, confirmedPct: '58.3%', cancelRate: '41.7%', cancelDiff: '-1.5%', leadTime: 65 },
    2017: { total: 38240, yoy: '+15.2%', confirmed: 22448, confirmedPct: '58.7%', cancelRate: '41.3%', cancelDiff: '-0.9%', leadTime: 67 },
    2016: { total: 33260, yoy: '+13.0%', confirmed: 19390, confirmedPct: '58.3%', cancelRate: '41.7%', cancelDiff: '-0.4%', leadTime: 64 },
    2015: { total: 7830, yoy: 'Base', confirmed: 4390, confirmedPct: '56.1%', cancelRate: '43.9%', cancelDiff: '0.0%', leadTime: 61 },
  },
  resort: {
    all: { total: 40060, yoy: '+9.6%', confirmed: 28938, confirmedPct: '72.2%', cancelRate: '27.8%', cancelDiff: '-3.2%', leadTime: 77 },
    2017: { total: 19254, yoy: '+13.6%', confirmed: 13993, confirmedPct: '72.7%', cancelRate: '27.3%', cancelDiff: '-0.7%', leadTime: 79 },
    2016: { total: 16859, yoy: '+10.4%', confirmed: 11980, confirmedPct: '71.1%', cancelRate: '28.9%', cancelDiff: '+0.5%', leadTime: 76 },
    2015: { total: 3947, yoy: 'Base', confirmed: 2965, confirmedPct: '75.1%', cancelRate: '24.9%', cancelDiff: '0.0%', leadTime: 70 },
  },
};
