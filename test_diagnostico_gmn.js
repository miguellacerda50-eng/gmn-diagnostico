/**
 * Testes Automatizados do Motor GMN
 * Agência Digital Automatizada — Módulo GMN
 */

const { gerarDiagnosticoGMN } = require('./gerador_diagnostico_gmn');

console.log('================================================================');
console.log('      TESTES DA ESTEIRA INDEPENDENTE: GOOGLE MEU NEGÓCIO        ');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✔ PASSOU: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✖ FALHOU: ${message}`);
  }
}

// -------------------------------------------------------------
// TESTE 1: Empresa Não Reivindicada com Gargalos Críticos
// -------------------------------------------------------------
console.log('--- TESTE 1: Empresa com Ficha Não Reivindicada e Falhas ---');
const caso1 = {
  nome: 'Auto Center São Cristóvão',
  categoria: 'Oficina Mecânica',
  bairro: 'Santana',
  cidade: 'São Paulo - SP',
  nota: 4.1,
  avaliacoes: 14,
  reivindicado: false,
  responde_avaliacoes: false,
  fotos_profissionais: false,
  horarios_completos: false,
  whatsapp_visivel: false,
  postagens_ativas: false
};

const diag1 = gerarDiagnosticoGMN(caso1);

assert(diag1.notaSaude < 5.0, `Nota de saúde calculada com rigor (${diag1.notaSaude}/10)`);
assert(diag1.gargalos.length === 3, 'Selecionou rigorosamente os 3 piores gargalos');
assert(diag1.gargalos[0].pilar === 'Status da Ficha', 'Primeiro gargalo identificou ficha não reivindicada');
assert(diag1.planoAcao.length === 3, 'Plano de ação possui 3 passos para 15 dias');
assert(diag1.ganchoAbordagem.length > 50, 'Gancho comercial gerado com sucesso');

// Verificar ausência de clichês de IA
const clichesProibidos = ['revolucionar', 'alavancar', 'destravar', 'soluções inovadoras', 'ecossistema disruptivo'];
let temCliche1 = clichesProibidos.some(c => diag1.relatorioTexto.toLowerCase().includes(c));
assert(!temCliche1, 'Zero clichês de IA detectados no relatório');

// -------------------------------------------------------------
// TESTE 2: Empresa Consolidada com Oportunidade de Otimização
// -------------------------------------------------------------
console.log('\n--- TESTE 2: Clínica Consolidada com Nota Alta mas Poucas Avaliações ---');
const caso2 = {
  nome: 'Clínica Odonto Estética',
  categoria: 'Dentista / Odontologia',
  bairro: 'Cambuí',
  cidade: 'Campinas - SP',
  nota: 4.9,
  avaliacoes: 18,
  reivindicado: true,
  responde_avaliacoes: false,
  fotos_profissionais: false,
  horarios_completos: true,
  whatsapp_visivel: true,
  postagens_ativas: false
};

const diag2 = gerarDiagnosticoGMN(caso2);

assert(diag2.notaSaude >= 6.0 && diag2.notaSaude <= 8.5, `Nota de saúde coerente para empresa boa mas com lacunas (${diag2.notaSaude}/10)`);
assert(diag2.pontosFortes.some(p => p.includes('4.9 estrelas')), 'Elogiou genuinamente a nota de 4.9 estrelas');
assert(diag2.gargalos.some(g => g.pilar === 'Reputação e Volume'), 'Identificou volume de avaliações < 30');
assert(diag2.gargalos.some(g => g.pilar === 'Gestão de Reputação'), 'Identificou falta de respostas às avaliações');

let temCliche2 = clichesProibidos.some(c => diag2.relatorioTexto.toLowerCase().includes(c));
assert(!temCliche2, 'Zero clichês de IA detectados no segundo caso');

// -------------------------------------------------------------
// RESUMO GERAL
// -------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL DE ASSERTIVAS: ${passedTests}/${totalTests}`);
if (passedTests === totalTests) {
  console.log('STATUS: ESTEIRA GMN MODELADA E HOMOLOGADA COM SUCESSO TOTAL!');
} else {
  console.error('STATUS: HOUVE FALHAS.');
  process.exit(1);
}
console.log('================================================================');
