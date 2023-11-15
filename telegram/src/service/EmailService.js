import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(userInformation) {
    const { usia, jenis_kelamin, deskripsi } = userInformation;

    const text = `Usia: ${usia}\n\njenis kelamin:${jenis_kelamin}\n\nDeskripsi kejadian:${deskripsi}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.PPKS_EMAIL,
      subject: `${new Date().toISOString()} Laporan Pengaduan Pelecehan Seksual`,
      text,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error('Maaf, coba lagi nanti.');
      }
    });
  }
}

export default EmailService;
