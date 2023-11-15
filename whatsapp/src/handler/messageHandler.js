const DatabaseService = require('../service/DatabaseService');
const EmailService = require('../service/EmailService');

async function handleMessage(client, message) {
  const messageBody = message.body.toLowerCase();

  const greetingKeywords = ["hi", "hello", "halo", 'hai', 'helo', 'p', 'menu', '/menu', 'layanan'];

  const serviceOptions = [
    "pengaduan laporan kekerasan seksual.",
    "bimbingan konseling dengan satgas ppks.",
    "saran dan tips untuk menghindari kekerasan seksual.",
    "FAQ seputar kekerasan seksual.",
  ];

  //  handle message
  if (greetingKeywords.includes(messageBody)) {
    const user = await message.getContact();
    const username = user.pushname;

    message.react('👍');
    client.sendMessage(message.from, `Halo ${username}! Selamat datang di layanan *Penanganan dan Pengaduan Pelecehan Seksual* :).\n\nKami siap membantu Anda untuk menemukan informasi dan sumber daya yang Anda butuhkan untuk mengatasi situasi yang mungkin Anda alami.\n\nDapatkan informasi mengenai PPKS melalui website kami: https://ppks-web.vercel.app/`);
    client.sendMessage(message.from, `Silahkan pilih layanan yang anda butuhkan:\n\n${serviceOptions.map((option, index) => `${index + 1}. ${option}`).join("\n")}`);

  } else if (messageBody.startsWith('1')) {
    const databaseService = new DatabaseService();
    const user = await message.getContact();
    const userContact = user.id.user;

    try {
      await databaseService.addUserContact({ userContact });
    } catch (error) {
      message.reply(error.message);
    }

    message.react('👍');
    message.reply('Masukkan usia korban. Caranya:\n\n/usia 14');

  } else if (messageBody.startsWith('/usia')) {
    const databaseService = new DatabaseService();
    const user = await message.getContact();
    const userContact = user.id.user;
    const age = messageBody.slice(6);

    try {
      await databaseService.updateUserAge({ userContact, age });
    } catch (error) {
      message.reply(error.message);
    }

    message.react('👍');
    message.reply('Masukkan gender korban. Caranya:\n\n/gender perempuan');

  } else if (messageBody.startsWith('/gender')) {
    const databaseService = new DatabaseService();
    const user = await message.getContact();
    const userContact = user.id.user;
    const gender = messageBody.slice(8);

    try {
      await databaseService.updateUserGender({ userContact, gender });

      message.reply('Masukkan deskripsi kejadian. Caranya:\n\n/deskripsi Saya ingin melaporkan bahwa seseorang telah mengalami pelecehan seksual pada hari senin tanggal 12 Mei 2023 di lingkungan kampus XYZ, ...');
    } catch (error) {
      message.reply(error.message);
    }

  } else if (messageBody.startsWith('/deskripsi')) {
    const databaseService = new DatabaseService();
    // const emailService = new EmailService();

    const user = await message.getContact();
    const userContact = user.id.user;
    const desc = messageBody.slice(11);

    try {
      await databaseService.updateUserDescription({ userContact, desc });

      const {
        usia, jenis_kelamin, deskripsi,
      } = await databaseService.getUserReport({ userContact });

      // await emailService.sendEmail({
      //   usia, jenis_kelamin, deskripsi,
      // });

      message.reply('Terima kasih , laporan anda telah dimasukkan ke dalam data satgas PPKS.\n\nJika Anda bersedia, *kami sangat-sangat menyarankan Anda untuk melakukan konseling dengan Satgas PPKS* untuk mendapatkan dukungan dan bimbingan lebih lanjut\n\nKami memastikan bahwa *semua informasi yang Anda berikan akan dijaga kerahasiaannya*. Kami berkomitmen untuk memberikan dukungan dan bimbingan dalam setiap tahap proses pengaduan dan akan memastikan bahwa Anda merasa aman dan terlindungi.');
    } catch (error) {
      message.reply(error.message);
    }

  } else if (messageBody.startsWith('2')) { // bimbingan konseling dengan satgas ppks.
    let adminNumber = process.env.PPKS_CONTACT;
    adminNumber = adminNumber.includes('@c.us') ? adminNumber : `${adminNumber}@c.us`;

    const user = await message.getContact();
    const username = user.pushname;
    const userContact = user.id.user;

    const messageToAdmin = `Halo Tim Pusat Pelayanan Kekerasan Seksual (PPKS),\n\nSaya ingin memberitahukan bahwa ada seseorang yang mengungkapkan keinginan untuk melakukan bimbingan konseling terkait kekerasan seksual. Berikut adalah rincian informasinya:\n\nNama: ${username}\nKontak: ${userContact}\nKeinginan: Bimbingan Konseling\n\nMohon segera menghubungi orang tersebut untuk memberikan panduan lebih lanjut dan menjadwalkan sesi konseling. Pastikan memberikan dukungan yang sesuai, menjaga kerahasiaan informasi pribadi mereka, dan menyediakan lingkungan yang aman untuk berbagi.`;
    client.sendMessage(adminNumber, messageToAdmin);

    message.react('👍');
    message.reply(`Terima kasih ${username} telah bersedia melakukan konseling. Kami menghargai langkah yang Anda ambil untuk mencari bantuan dan mendapatkan dukungan yang Anda butuhkan. Tim Pusat Pelayanan Kekerasan Seksual (PPKS) akan segera menghubungi Anda.\n\nAnda tidak sendiri dalam perjalanan ini. Kami berkomitmen untuk memberikan dukungan yang aman, rahasia, dan mendukung Anda dalam pemulihan.`);

  } else if (messageBody.startsWith('3')) { // saran dan tips untuk menghindari kekerasan seksual.
    const tipsList = [
      "*Waspadai lingkungan sekitar Anda.* Selalu perhatikan lingkungan Anda dan hindari tempat-tempat yang tidak aman atau terpencil, terutama pada malam hari.",
      "*Pelajari tanda-tanda kekerasan seksual.* Ada beberapa tanda-tanda kekerasan seksual yang perlu Anda ketahui, seperti pergaulan yang terlalu intens, permintaan seksual yang tidak diinginkan, dan ancaman atau kekerasan.",
      "*Percayalah pada insting Anda.* Jangan abaikan perasaan Anda jika Anda merasa tidak nyaman dengan situasi atau orang tertentu. Percayalah pada insting Anda dan segera lakukan tindakan yang tepat untuk menjaga keselamatan Anda.",
      "*Hindari minuman beralkohol yang berlebihan.* Minuman beralkohol dapat membuat Anda kehilangan kewaspadaan dan membuat Anda lebih rentan menjadi korban kekerasan seksual. Jangan minum terlalu banyak dan selalu waspadai minuman Anda.",
      "*Miliki teman yang bisa dipercaya.* Selalu berpergian bersama teman atau kelompok yang bisa dipercaya dan yang dapat membantu Anda dalam situasi yang tidak aman.",
      "*Laporkan kejadian kekerasan seksual.* Jangan ragu untuk melapor jika Anda menjadi korban kekerasan seksual. Berbicaralah dengan seseorang yang bisa dipercaya, seperti keluarga atau teman, atau laporkan kejadian tersebut ke polisi atau lembaga terkait.",
    ];

    message.react('👍');
    message.reply(`Berikut adalah beberapa saran dan tips yang dapat membantu Anda menghindari kekerasan seksual:\n\n${tipsList.map((option, index) => `${index + 1}. ${option}`).join("\n\n")}\n\nDapatkan informasi mengenai PPKS melalui website kami: https://ppks-web.vercel.app/`);

  } else if (messageBody.startsWith('4')) { // FAQ seputar kekerasan seksual.
    const faqList = [
      'Apa faktor risiko kekerasan seksual?',
      'Apa peran pendidikan seksual dalam pencegahan kekerasan seksual?',
      'Apa pentingnya pelayanan dukungan untuk korban?',
      'Peran teknologi dalam pencegahan dan pelaporan',
      'Pencegahan kekerasan seksual di tempat kerja',
      'Tanda-tanda awas kekerasan seksual pada remaja',
      'Kesetaraan gender dalam pencegahan kekerasan seksual',
      'Tindakan hukum dalam penanganan kekerasan seksual',
    ];

    message.react('👍');
    message.reply(`Daftar FAQ seputar pelecehan seksual:\n\n${faqList.map((option, index) => `${index + 1}. ${option}`).join('\n')}`);
    client.sendMessage(message.from, `Silahkan pilih daftar FAQ. Contoh "/faq1`);

  } else if (messageBody.match(/^\/faq\d+$/)) {
    const databaseService = new DatabaseService();

    const id = messageBody[4];
    const answer = await databaseService.getAnswerById(id);

    message.reply(answer);
  }
}
module.exports = handleMessage;
