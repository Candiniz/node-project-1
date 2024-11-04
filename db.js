import 'dotenv/config'; // Carrega variáveis de ambiente do arquivo .env
import postgres from 'postgres'; // Importa a biblioteca postgres
import http from 'http'; // Importa o módulo http
import { neon } from '@neondatabase/serverless'; // Importa o pacote neon

// Conecta ao banco de dados usando a URL das variáveis de ambiente
const sql = neon(process.env.DATABASE_URL);

// Handler para requisições HTTP
const requestHandler = async (req, res) => {
  try {
    const result = await sql`SELECT version()`; // Executa uma consulta para obter a versão do banco de dados
    const { version } = result[0]; // Desestrutura a versão do resultado
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(version); // Retorna a versão como resposta
  } catch (error) {
    console.error('Error executing query', error); // Log de erro
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error'); // Retorna um erro genérico em caso de falha
  }
};

// Cria um servidor HTTP que escuta na porta 3000
http.createServer(requestHandler).listen(3001, () => {
  console.log('Server running at http://localhost:3001'); // Log de inicialização do servidor
});

// Exporta a conexão SQL para uso em outros módulos
export { sql };
