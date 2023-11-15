import DatabaseService from '../service/DatabaseService.js';
import EmailService from '../service/EmailService.js';
import PromptService from '../service/PromptService.js';

async function handleMessage(ctx) {
  const messageBody = ctx.message.text.toLowerCase();

  const greetingKeywords = ['hi', 'hello', 'halo', 'hai', 'helo', 'p', 'menu', '/menu', 'layanan'];

  //  handle message
  if (greetingKeywords.includes(messageBody)) {
    const user = await ctx.getChat();
    const name = user.first_name;
    ctx.reply(`Halo ${name}! Selamat datang di layanan Penanganan dan Pengaduan Pelecehan Seksual :).\n\nKami siap membantu Anda untuk menemukan informasi dan sumber daya yang Anda butuhkan untuk mengatasi situasi yang mungkin Anda alami. Silahkan ketik /layanan untuk melihat daftar layanan.\n\nDapatkan informasi mengenai PPKS melalui website kami: https://ppks-web.vercel.app/`);

  } else if (messageBody.startsWith('/usia')) {
    const databaseService = new DatabaseService();
    const user = await ctx.getChat();
    const userContact = `@${user.username}`;
    const age = messageBody.slice(6);

    try {
      await databaseService.updateUserAge({ userContact, age });

      ctx.reply('Masukkan gender korban. Caranya:\n\n/gender perempuan');
    } catch (error) {
      ctx.reply(error.message);
    }

  } else if (messageBody.startsWith('/gender')) { // pengaduan laporan kekerasan seksual.
    const databaseService = new DatabaseService();
    const user = await ctx.getChat();
    const userContact = `@${user.username}`;
    const gender = messageBody.slice(8);

    try {
      await databaseService.updateUserGender({ userContact, gender });

      ctx.reply('Masukkan deskripsi kejadian. Caranya:\n\n/deskripsi Saya ingin melaporkan bahwa seseorang telah mengalami pelecehan seksual pada hari senin tanggal 12 Mei 2023 di lingkungan kampus XYZ, ...');
    } catch (error) {
      ctx.reply(error.message);
    }

  } else if (messageBody.startsWith('/deskripsi')) {
    const databaseService = new DatabaseService();
    // const emailService = new EmailService();

    const user = await ctx.getChat();
    const userContact = `@${user.username}`;
    const desc = messageBody.slice(11);

    try {
      await databaseService.updateUserDescription({ userContact, desc });

      const {
        usia, jenis_kelamin, deskripsi,
      } = await databaseService.getUserReport({ userContact });

      // await emailService.sendEmail({
      //   usia, jenis_kelamin, deskripsi,
      // });

      ctx.reply('Terima kasih , laporan anda telah dimasukkan ke dalam data satgas PPKS.\n\nJika Anda bersedia, *kami sangat-sangat menyarankan Anda untuk melakukan konseling dengan Satgas PPKS* untuk mendapatkan dukungan dan bimbingan lebih lanjut\n\nKami memastikan bahwa *semua informasi yang Anda berikan akan dijaga kerahasiaannya*. Kami berkomitmen untuk memberikan dukungan dan bimbingan dalam setiap tahap proses pengaduan dan akan memastikan bahwa Anda merasa aman dan terlindungi.');
    } catch (error) {
      ctx.reply(error.message);
    }

  } else if (messageBody.match(/^\/faq\d+$/)) {
    const databaseService = new DatabaseService();

    const id = messageBody[4];
    const answer = await databaseService.getAnswerById(id);

    ctx.reply(answer);
  } else if (messageBody.startsWith('!tanya')) {
    ctx.reply('Tunggu sebentar..');

    const promptService = new PromptService();
    // const currentTimeMs = new Date().getTime();
    const user = await ctx.getChat();
    const name = user.first_name;
    const prompt = messageBody.slice(7);

    try {
      // await promptService.validatePromptTimeDiff(currentTimeMs);

      const response = await promptService.generatePrompt(name, prompt);
      ctx.reply(response);
    } catch (error) {
      ctx.reply(error.message);
    }
  }
}

export default handleMessage;
