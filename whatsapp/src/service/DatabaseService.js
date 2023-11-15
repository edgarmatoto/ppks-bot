const pg = require('pg');

const { Pool } = pg;

class DatabaseService {
  constructor() {
    this._pool = new Pool();
  }

  async addUserContact(userInformation) {
    const { userContact } = userInformation;

    const query = {
      text: 'INSERT INTO laporan(kontak) values($1)',
      values: [userContact],
    };

    await this._pool.query(query);
  }

  async updateUserAge(userInformation) {
    const { userContact, age } = userInformation;

    const query = {
      text: 'UPDATE laporan SET usia = $2 WHERE kontak = $1',
      values: [userContact, age],
    };

    await this._pool.query(query);
  }

  async updateUserGender(userInformation) {
    const { userContact, gender } = userInformation;

    const query = {
      text: 'UPDATE laporan SET jenis_kelamin = $2 WHERE kontak = $1',
      values: [userContact, gender],
    };

    await this._pool.query(query);
  }

  async updateUserDescription(userInformation) {
    const { userContact, desc } = userInformation;

    const query = {
      text: 'UPDATE laporan SET deskripsi = $2 WHERE kontak = $1',
      values: [userContact, desc],
    };

    await this._pool.query(query);
  }

  async getUserReport(userInformation) {
    const { userContact } = userInformation;

    const query = {
      text: 'SELECT usia, jenis_kelamin, deskripsi FROM laporan where kontak = $1',
      values: [userContact],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async addCounselingInformation(userInformation) {
    const { userContact, userNumber } = userInformation;

    const query = {
      text: 'INSERT INTO konseling(nama, kontak) VALUES($1, $2)',
      values: [userContact, userNumber],
    };

    await this._pool.query(query);
  }

  async getAnswerById(id) {
    const query = {
      text: 'SELECT deskripsi FROM faq WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return 'Maaf, pertanyaan belum tersedia.';
    }

    const answer = result.rows[0].deskripsi;
    return answer;
  }

  async ValidateReportTimeDiff(userNumber) {
    const query = {
      text: 'SELECT created_at FROM report WHERE contact = $1 ORDER BY created_at DESC',
      values: [userNumber],
    };
    const result = await this._pool.query(query);

    if (result.rowCount) {
      const currentTimeInMiliSeconds = new Date().getTime();
      const reportTimeInMiliSeconds = new Date(result.rows[0].created_at).getTime();

      const timeDiff = Number(currentTimeInMiliSeconds) - Number(reportTimeInMiliSeconds);
      if (timeDiff < 10000) {
        throw new Error('Mohon tunggu beberapa saat untuk mengirim laporan kembali.');
      }
    }
  }
}

module.exports = DatabaseService;
