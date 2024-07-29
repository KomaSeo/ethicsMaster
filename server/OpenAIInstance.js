import fs from 'fs'
import OpenAI from 'openai';
import path from 'path'
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));
const API_Path = path.join(__dirname,'API_KEY.json');
const ApiKeyFile = fs.readFileSync(API_Path)
const API_KEY = JSON.parse(ApiKeyFile);
process.env.OPENAI_API_KEY = API_KEY.ChatGPT
const openai = new OpenAI();
export default openai;