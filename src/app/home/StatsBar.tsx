import { MapPin, Phone, Info } from "lucide-react";

export default function StatsBar() {
  return (
    <div className="bg-slate-100 py-6 border-b border-slate-200">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-slate-700 font-semibold uppercase text-sm">
        <div className="flex items-center justify-center gap-3">
          <MapPin size={18} className="text-blue-800" /> JL. Merpati Raya No. 12
        </div>
        <div className="flex items-center justify-center gap-3">
          <Phone size={18} className="text-blue-800" /> (021) 12345678
        </div>
        <div className="flex items-center justify-center gap-3">
          <Info size={18} className="text-blue-800" /> Pelayanan Terpadu
        </div>
      </div>
    </div>
  );
}
