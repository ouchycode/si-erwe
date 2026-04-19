import {
  BarChart2,
  Users,
  User,
  Activity,
  Briefcase,
  GraduationCap,
  PieChart,
} from "lucide-react";

const SUMMARY = [
  { label: "Total Penduduk", value: "1.850", icon: Users },
  { label: "Kepala Keluarga", value: "450", icon: Activity },
  { label: "Laki-laki", value: "950", icon: User },
  { label: "Perempuan", value: "900", icon: User },
];

const USIA = [
  { label: "Balita (0–5 Tahun)", count: 185, percent: 10 },
  { label: "Anak-anak (6–12 Tahun)", count: 277, percent: 15 },
  { label: "Remaja (13–18 Tahun)", count: 370, percent: 20 },
  { label: "Dewasa (19–55 Tahun)", count: 832, percent: 45 },
  { label: "Lansia (> 55 Tahun)", count: 186, percent: 10 },
];

const PENDIDIKAN = [
  { label: "SD / Sederajat", count: 250, percent: 13.5 },
  { label: "SMP / Sederajat", count: 350, percent: 18.9 },
  { label: "SMA / Sederajat", count: 800, percent: 43.2 },
  { label: "Diploma (D1–D4)", count: 200, percent: 10.8 },
  { label: "Sarjana (S1/S2/S3)", count: 250, percent: 13.5 },
];

const PEKERJAAN = [
  { label: "Karyawan Swasta", count: 650, percent: 35 },
  { label: "Wiraswasta / Pedagang", count: 350, percent: 19 },
  { label: "PNS / TNI / POLRI", count: 150, percent: 8 },
  { label: "Pelajar / Mahasiswa", count: 450, percent: 24 },
  { label: "Lainnya / Mengurus RT", count: 250, percent: 14 },
];

const AGAMA = [
  { label: "Islam", count: 1450, percent: 78.3 },
  { label: "Kristen Protestan", count: 200, percent: 10.8 },
  { label: "Katolik", count: 120, percent: 6.4 },
  { label: "Buddha", count: 60, percent: 3.2 },
  { label: "Hindu / Lainnya", count: 20, percent: 1.1 },
];

function BarRow({
  label,
  count,
  percent,
  suffix = "Jiwa",
}: {
  label: string;
  count: number;
  percent: number;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-[12.5px] text-gray-600 mb-1.5">
        <span className="font-medium">{label}</span>
        <span className="font-semibold text-gray-900 tabular-nums">
          {count.toLocaleString("id-ID")} {suffix}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-sm h-1.5">
        <div
          className="bg-[#1a3a6b] h-1.5 rounded-sm transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#f8f9fc] border border-gray-100 rounded-md p-5 flex items-center gap-4">
      <div className="w-10 h-10 bg-white border border-gray-100 rounded-md flex items-center justify-center shrink-0">
        <Icon size={17} className="text-[#1a3a6b]" />
      </div>
      <div>
        <p className="text-[10.5px] font-semibold tracking-widest text-gray-400 uppercase mb-0.5">
          {label}
        </p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-md p-6">
      <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-gray-100">
        <Icon size={16} className="text-[#1a3a6b]" />
        <h2 className="text-[13.5px] font-bold text-gray-900">{title}</h2>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

export default function StatistikWarga() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* HERO */}
      <div className="bg-[#1a3a6b] px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-300/70 uppercase mb-4">
              Data Demografi
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
              Statistik Warga RW 12
            </h1>
            <p className="text-[15px] text-blue-100/80 max-w-xl leading-relaxed">
              Pusat data demografi kependudukan yang diperbarui secara berkala —
              berdasarkan gender, usia, pendidikan, dan pekerjaan.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-md px-5 py-4 shrink-0">
            <Activity size={16} className="text-green-300" />
            <div>
              <p className="text-[10.5px] text-blue-300/70 font-semibold uppercase tracking-widest mb-0.5">
                Update Terakhir
              </p>
              <p className="text-[14px] font-bold text-white">19 April 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16 flex flex-col gap-10">
        {/* SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SUMMARY.map((s) => (
            <StatCard
              key={s.label}
              icon={s.icon}
              label={s.label}
              value={s.value}
            />
          ))}
        </div>

        {/* BREAKDOWN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Section icon={PieChart} title="Berdasarkan Kelompok Usia">
            {USIA.map((d) => (
              <BarRow
                key={d.label}
                label={d.label}
                count={d.count}
                percent={d.percent}
                suffix="Jiwa"
              />
            ))}
          </Section>

          <Section icon={GraduationCap} title="Berdasarkan Pendidikan Akhir">
            {PENDIDIKAN.map((d) => (
              <BarRow
                key={d.label}
                label={d.label}
                count={d.count}
                percent={d.percent}
                suffix="Orang"
              />
            ))}
          </Section>

          <Section icon={Briefcase} title="Berdasarkan Pekerjaan Utama">
            {PEKERJAAN.map((d) => (
              <BarRow
                key={d.label}
                label={d.label}
                count={d.count}
                percent={d.percent}
                suffix="Orang"
              />
            ))}
          </Section>

          <Section icon={Users} title="Berdasarkan Agama">
            {AGAMA.map((d) => (
              <BarRow
                key={d.label}
                label={d.label}
                count={d.count}
                percent={d.percent}
                suffix="Orang"
              />
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}
