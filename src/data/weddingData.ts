export const COUPLE = {
  shortTitle: "I'il & Sabbihis",
  monogram: 'I & S',
  bride: {
    fullName: 'Ummi Nailil Ulya',
    nickname: "I'il",
    initial: 'I',
    childOrder: 'Putri Pertama dari',
    parents: 'Bpk. Suyanto (Yanto) & Ibu Siti Zainab',
    origin: 'Murukan, Mojoagung, Jombang',
    bio: 'Putri tercinta dari keluarga besar Murukan, Mojoagung yang hangat, lembut, dan senantiasa menjaga nilai-nilai keteduhan keluarga.',
  },
  groom: {
    fullName: 'M. Sabbihis Zakaria',
    nickname: 'Sabbihis',
    initial: 'S',
    childOrder: 'Putra Keempat dari',
    parents: 'Bpk. H. Fauzan & Ibu Hj. Saudah',
    origin: 'Tanjungan, Driyorejo, Gresik',
    bio: 'Putra keempat dari Tanjungan, Driyorejo, Gresik yang teguh pendirian, ramah, dan siap membina rumah tangga sakinah bersama I’il.',
  },
  dateLabel: 'Sabtu, 09 Januari 2027',
  dateCompact: '09 · 01 · 2027',
  locationShort: 'Dsn. Murukan RT. 02 RW. 02, Mojoagung, Jombang',
  fullAddress: 'Dsn. Murukan RT. 02 RW. 02, Ds. Murukan, Kec. Mojoagung, Kab. Jombang',
  mapsUrl: 'https://maps.app.goo.gl/h3s2Hw63dRD8Da2u9',
  hashtag: '#IilSabbihis2027',
} as const;

export const WEDDING_FEATURED_VERSE = {
  surah: 'QS. Ar-Rum · Ayat 21',
  text: '“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”',
} as const;

export const WEDDING_PILLARS = [
  {
    code: '01',
    subtitle: 'Pilar 01 · Ketenangan Hati',
    title: 'Sakinah',
    description:
      'Membangun rumah tangga yang teduh, penuh rasa aman, saling menjaga kehormatan, serta menjadi tempat pulang paling menenangkan.',
  },
  {
    code: '02',
    subtitle: 'Pilar 02 · Ketulusan Cinta',
    title: 'Mawaddah',
    description:
      'Menumbuhkan kasih sayang yang tulus dalam setiap keadaan, saling menguatkan dalam kebaikan, kesabaran, dan tanggung jawab bersama.',
  },
  {
    code: '03',
    subtitle: 'Pilar 03 · Limpahan Berkah',
    title: 'Warahmah',
    description:
      'Memohon curahan rahmat dan ridho Allah SWT agar ikatan suci ini membawa keberkahan bagi keluarga serta lingkungan sekitar.',
  },
] as const;

export const EVENTS = [
  {
    id: 'akad',
    title: 'Akad Nikah',
    date: 'Sabtu, 09 Januari 2027',
    time: '08.00 WIB – Selesai',
    venue: 'Kediaman Mempelai Putri',
    address: 'Dsn. Murukan RT. 02 RW. 02, Ds. Murukan, Kec. Mojoagung, Kab. Jombang',
    mapsUrl: 'https://maps.app.goo.gl/h3s2Hw63dRD8Da2u9',
    startIso: '2027-01-09T08:00:00+07:00',
    endIso: '2027-01-09T10:30:00+07:00',
    notes: 'Prosesi ijab kabul berlangsung khidmat bersama keluarga besar kedua mempelai.',
  },
  {
    id: 'resepsi',
    title: 'Resepsi Pernikahan',
    date: 'Sabtu, 09 Januari 2027',
    time: '13.00 WIB – Selesai',
    venue: 'Kediaman Mempelai Putri',
    address: 'Dsn. Murukan RT. 02 RW. 02, Ds. Murukan, Kec. Mojoagung, Kab. Jombang',
    mapsUrl: 'https://maps.app.goo.gl/h3s2Hw63dRD8Da2u9',
    startIso: '2027-01-09T13:00:00+07:00',
    endIso: '2027-01-09T17:00:00+07:00',
    notes: 'Ramah tamah serta doa restu bersama keluarga, tetangga, dan sahabat di Murukan, Mojoagung.',
  },
] as const;

export const LOCATION_LANDMARKS = [
  {
    title: 'Jalur Utama',
    detail: 'Melalui Jl. By Pass Mojoagung (arah Mojoagung ↔ arah Surabaya)',
  },
  {
    title: 'Patokan Sekitar',
    detail: 'Dekat SMPN 3 Mojoagung, MAN 6 Jombang, Lapangan, dan Masjid Murukan',
  },
  {
    title: 'Titik Lokasi',
    detail: 'Dsn. Murukan RT. 02 RW. 02, Ds. Murukan, Kec. Mojoagung, Kab. Jombang',
  },
] as const;
