/**
 * Compilador de Relatório Executivo GMN em PDF/HTML
 * Agência Digital Automatizada — Módulo GMN
 */

const fs = require('fs');
const path = require('path');
const { gerarDiagnosticoGMN } = require('./gerador_diagnostico_gmn');

/**
 * Gera um arquivo HTML formatado para impressão em PDF A4 de 1 página.
 * @param {object} dadosEmpresa 
 * @param {string} [outputPath] 
 * @returns {string} Caminho do arquivo gerado
 */
function compilarRelatorioPDF(dadosEmpresa, outputPath = null) {
  const diag = gerarDiagnosticoGMN(dadosEmpresa);
  const templatePath = path.join(__dirname, 'template_relatorio_pdf.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  const dataHoje = new Date().toLocaleDateString('pt-BR');
  const pontosFortesHtml = diag.pontosFortes.map(p => `<li>${p}</li>`).join('\n');
  const gargalosHtml = diag.gargalos.map(g => `
    <div class="gargalo-card">
      <div class="gargalo-header">
        <span>⚠️ ${g.titulo}</span>
      </div>
      <p class="gargalo-desc">${g.impacto}</p>
    </div>
  `).join('\n');

  const planoAcaoHtml = diag.planoAcao.map(a => `<li>${a}</li>`).join('\n');

  html = html
    .replace('{{DATA_HOJE}}', dataHoje)
    .replace('{{NOME_EMPRESA}}', diag.empresa)
    .replace('{{CATEGORIA}}', diag.categoria)
    .replace('{{LOCALIZACAO}}', diag.localizacao)
    .replace('{{NOTA_SAUDE}}', diag.notaSaude.toFixed(1))
    .replace('{{PONTOS_FORTES_HTML}}', pontosFortesHtml)
    .replace('{{GARGALOS_HTML}}', gargalosHtml)
    .replace('{{PLANO_ACAO_HTML}}', planoAcaoHtml);

  const safeName = diag.empresa.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const finalPath = outputPath || path.join(__dirname, `relatorio_gmn_${safeName}.html`);
  fs.writeFileSync(finalPath, html, 'utf8');

  return {
    arquivoGerado: finalPath,
    diagnostico: diag
  };
}

module.exports = {
  compilarRelatorioPDF
};

// Execução direta de exemplo para validação imediata
if (require.main === module) {
  const exemplo = {
    nome: 'Clínica Odonto Estética',
    categoria: 'Dentista / Odontologia',
    bairro: 'Cambuí',
    cidade: 'Campinas - SP',
    nota: 4.8,
    avaliacoes: 22,
    reivindicado: true,
    responde_avaliacoes: false,
    fotos_profissionais: false,
    horarios_completos: true,
    whatsapp_visivel: true
  };

  const resultado = compilarRelatorioPDF(exemplo);
  console.log('✔ Relatório A4 (1 página) compilado com sucesso em:');
  console.log(resultado.arquivoGerado);
  console.log('\n--- MENSAGEM CURTA PARA WHATSAPP / E-MAIL ---');
  console.log(resultado.diagnostico.ganchoAbordagem);
}
