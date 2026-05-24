const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/components/layout/Navbar.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/home/Hero.tsx',
  'src/app/tentang-kami/struktur-rw/page.tsx',
  'src/app/tentang-kami/profil/page.tsx',
  'src/app/tentang-kami/pengurus-rt/page.tsx',
  'src/app/layanan/kebersihan-lingkungan/page.tsx',
  'src/app/layanan/keamanan-wilayah/page.tsx',
  'src/app/layanan/administrasi-kependudukan/page.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Navbar & Footer specific matches
    content = content.replace(/Pegangsaan Dua, Kelapa Gading, Jakarta Utara/g, 'Kel. Kutabumi, Kec. Pasar Kemis, Kab. Tangerang');
    content = content.replace(/RW 12 Pegangsaan Dua, Kelapa Gading\./g, 'RW 12 Kutabumi, Kab. Tangerang.');
    content = content.replace(/RW 12 Pegangsaan Dua, Kelapa Gading/g, 'RW 12 Kutabumi, Kab. Tangerang');
    content = content.replace(/RW 12 Pegangsaan Dua/g, 'RW 12 Kutabumi');
    content = content.replace(/Kelapa Gading · Jakarta Utara/g, 'Kutabumi · Tangerang');
    content = content.replace(/Kelapa Gading, Jakarta Utara/g, 'Kutabumi, Kab. Tangerang');
    content = content.replace(/Pegangsaan Dua, Kelapa Gading/g, 'Kutabumi, Kab. Tangerang');
    content = content.replace(/Pegangsaan Dua/g, 'Kutabumi');
    content = content.replace(/Kelapa Gading/g, 'Pasar Kemis');
    content = content.replace(/Jakarta Utara/g, 'Kabupaten Tangerang');
    
    // Lorem fixes in RW context
    content = content.replace(/RW Lorem Ipsum, Dolor Sit Amet/g, 'RW 12 Kutabumi');
    content = content.replace(/RW Lorem/g, 'RW 12');
    content = content.replace(/RW LOREM/g, 'RW 12');
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Replacement finished.');
