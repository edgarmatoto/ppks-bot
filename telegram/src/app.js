import dotenv from 'dotenv';
import { Telegraf, Markup } from 'telegraf';
import handleMessage from './handler/messageHandler.js';
import DatabaseService from './service/DatabaseService.js';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  const user = await ctx.getChat();
  const name = user.first_name;
  ctx.reply(`Halo ${name}! Selamat datang di layanan Penanganan dan Pengaduan Pelecehan Seksual :).\n\nKami siap membantu Anda untuk menemukan informasi dan sumber daya yang Anda butuhkan untuk mengatasi situasi yang mungkin Anda alami. Silahkan ketik /layanan untuk melihat daftar layanan.\n\nDapatkan informasi mengenai PPKS melalui website kami: https://ppks-web.vercel.app/`);
});

bot.command('layanan', (ctx) => {
  const serviceOptions = [
    'Pengaduan laporan kekerasan seksual.',
    'Bimbingan konseling dengan satgas ppks.',
    'Saran dan tips untuk menghindari kekerasan seksual.',
    'FAQ seputar kekerasan seksual.',
    // 'Pertanyaan lain seputar kekerasan seksual',
  ];
  ctx.reply(`Silahkan pilih layanan yang anda butuhkan:\n\n${serviceOptions.map((option, index) => `${index + 1}. ${option}`).join('\n')}`, Markup.inlineKeyboard(
    [
      Markup.button.callback('1', '1'),
      Markup.button.callback('2', '2'),
      Markup.button.callback('3', '3'),
      Markup.button.callback('4', '4'),
      Markup.button.callback('5', '5'),
    ],
  ));
});

bot.action('1', async (ctx) => {
  const databaseService = new DatabaseService();
  const user = await ctx.getChat();
  const userContact = `@${user.username}`;

  try {
    await databaseService.addUserContact({ userContact });
  } catch (error) {
    ctx.reply(error.message);
  }

  ctx.reply('Masukkan usia korban. Caranya:\n\n/usia 14');
});

bot.action('2', async (ctx) => {
  ctx.reply(`Jika kamu membutuhkan bantuan
lebih lanjut dalam mencari pihak konseling, silakan hubungi +6289502743924 untuk mendapatkan bimbingan konseling dengan Satgas PPKS. Kami siap membantu Anda dalam memperoleh dukungan yang Anda butuhkan.

Dapatkan informasi mengenai PPKS melalui website kami: https://ppks-web.vercel.app/`);
});

bot.action('3', async (ctx) => {
  const tipsList = [
    'Waspadai lingkungan sekitar Anda. Selalu perhatikan lingkungan Anda dan hindari tempat-tempat yang tidak aman atau terpencil, terutama pada malam hari.',
    'Pelajari tanda-tanda kekerasan seksual. Ada beberapa tanda-tanda kekerasan seksual yang perlu Anda ketahui, seperti pergaulan yang terlalu intens, permintaan seksual yang tidak diinginkan, dan ancaman atau kekerasan.',
    'Percayalah pada insting Anda. Jangan abaikan perasaan Anda jika Anda merasa tidak nyaman dengan situasi atau orang tertentu. Percayalah pada insting Anda dan segera lakukan tindakan yang tepat untuk menjaga keselamatan Anda.',
    'Hindari minuman beralkohol yang berlebihan. Minuman beralkohol dapat membuat Anda kehilangan kewaspadaan dan membuat Anda lebih rentan menjadi korban kekerasan seksual. Jangan minum terlalu banyak dan selalu waspadai minuman Anda.',
    'Miliki teman yang bisa dipercaya. Selalu berpergian bersama teman atau kelompok yang bisa dipercaya dan yang dapat membantu Anda dalam situasi yang tidak aman.',
    'Laporkan kejadian kekerasan seksual. Jangan ragu untuk melapor jika Anda menjadi korban kekerasan seksual. Berbicaralah dengan seseorang yang bisa dipercaya, seperti keluarga atau teman, atau laporkan kejadian tersebut ke polisi atau lembaga terkait.',
  ];

  ctx.reply(`Berikut adalah beberapa saran dan tips yang dapat membantu Anda menghindari kekerasan seksual:\n\n${tipsList.map((option, index) => `${index + 1}. ${option}`).join('\n\n')}\n\nDapatkan informasi mengenai PPKS melalui website kami: https://ppks-web.vercel.app/`);
});

bot.action('4', async (ctx) => {
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

  ctx.reply(`Daftar FAQ seputar pelecehan seksual:\n\n${faqList.map((option, index) => `${index + 1}. ${option}`).join('\n')}\n\nSilahkan pilih daftar FAQ. Contoh "/faq1`);
});

bot.action('5', async (ctx) => {
  ctx.reply('Untuk memberi pertanyaan, silakan ketik *!tanya* di dilanjutkan dengan deskripsi pertanyaan anda.\nContohnya:\n\n!tanya apa undang-undang yang mengatur tentang kekerasan seksual?');
});

bot.on('message', async (ctx) => {
  handleMessage(ctx);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
