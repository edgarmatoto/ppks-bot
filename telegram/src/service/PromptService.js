import dotenv from 'dotenv';
import { BingAIClient } from '@waylaidwanderer/chatgpt-api';

dotenv.config();

class PromptService {
  constructor() {
    this._BING_COOKIES = process.env.BING_COOKIES;
    this._BING_TOKEN = process.env.BING_TOKEN;

    this._bingAIClient = new BingAIClient({
      cookies: this._BING_COOKIES,
      userToken: this._BING_TOKEN,
    });
  }

  async generatePrompt(name, prompt) {
    try {
      const starterPrompt = `Perkenalkan dirimu sebagai "${process.env.BOT_NAME}". Jawab pertanyaan seputar topik kekerasan seksual. Berikan jawaban dengan detil dan santai dengan emoticon interaktif alih-alih menjadi formal dan kaku. Jika pertanyaan saya melenceng dari topik, kamu akan meminta maaf dan meminta untuk bertanya sesuai topik kekerasan seksual. Kamu harus selalu menjawab saya dengan bahasa Indonesia. Nama saya ${name} dan pertanyaan saya adalah: `;
      const response = await this._bingAIClient.sendMessage(starterPrompt + prompt, {
        // (Optional) Set a conversation style for this message (default: 'balanced')
        toneStyle: 'balanced', // or creative, precise, fast
        /* onProgress: (token: string) => {
        process.stdout.write(token);
        }, */
      });

      return response.response;
    } catch (error) {
      console.log(error);
      throw new Error('Maaf, coba tanya lagi nanti');
    }
  }

  validatePromptTimeDiff(promptTimeMs) {
    let timeMs = new Date().getTime();

    if (promptTimeMs - timeMs < 15000) {
      throw new Error('Mohon kirim pertanyaan dalam selang beberapa waktu.');
    } else {
      timeMs = promptTimeMs;
    }
  }
}

export default PromptService;
