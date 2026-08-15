export default function MapComponent() {
  return (
    <div data-aos="fade-up" className="w-full h-full rounded-xs overflow-hidden border border-slate-100 shadow-inner relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.80783511874!2d106.6080345!3d-6.1828859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f8de6dfb77eb%3A0xc6ed7697b4ecba1!2sPabuaran%2C%20Kec.%20Karawaci%2C%20Kota%20Tangerang%2C%20Banten!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Peta Wilayah RW 04 Pabuaran"
        className="absolute top-0 left-0"
      ></iframe>
    </div>
  );
}
