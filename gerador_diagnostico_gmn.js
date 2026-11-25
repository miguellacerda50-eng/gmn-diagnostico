/**
 * Motor Especialista em SEO Local e Google Meu Negócio (GMN)
 * Agência Digital Automatizada — Módulo Independente GMN
 * 
 * Audita os dados públicos da ficha da empresa, calcula a Nota de Saúde (0 a 10)
 * e gera um Relatório de Diagnóstico persuasivo em linguagem de negócios.
 */

/**
 * Analisa os dados da empresa e gera o relatório completo conforme a diretriz.
 * @param {object} dados 
 * @returns {object} { notaSaude, relatorioTexto, ganchoAbordagem, gargalos, planoAcao }
 */
function gerarDiagnosticoGMN(dados) {
  const nome = dados.nome || dados.empresa || 'Empresa';
  const categoria = dados.categoria || dados.segmento || 'Serviços';
  const local = dados.bairro ? `${dados.bairro}, ${dados.cidade || ''}` : (dados.cidade || 'sua região');
  const nota = dados.nota !== undefined ? parseFloat(String(dados.nota).replace(',', '.')) : 4.5;
  const avaliacoes = dados.avaliacoes !== undefined ? parseInt(String(dados.avaliacoes).replace(/\D/g, ''), 10) : 10;
  const reivindicado = dados.reivindicado !== false; // false se tem botão "Reivindicar esta empresa"
  const respondeAvaliacoes = dados.responde_avaliacoes === true;
  const fotosProfissionais = dados.fotos_profissionais === true;
  const horariosCompletos = dados.horarios_completos !== false;
  const temSiteOuAgendamento = Boolean(dados.site && dados.site.trim() !== '');
  const temWhatsapp = dados.whatsapp_visivel === true;
  const postagensAtivas = dados.postagens_ativas === true;

  // 1. CÁLCULO DA NOTA DE SAÚDE DO PERFIL (0 a 10)
  let score = 10.0;

  if (!reivindicado) score -= 3.0; // Falha gravíssima
  if (nota < 4.5) score -= 1.5;
  if (avaliacoes < 30) score -= 1.5;
  if (!respondeAvaliacoes) score -= 1.0;
  if (!fotosProfissionais) score -= 1.0;
  if (!horariosCompletos) score -= 0.8;
  if (!temSiteOuAgendamento && !temWhatsapp) score -= 0.7;
  if (!postagensAtivas) score -= 0.5;

  score = Math.max(1.5, Math.min(10.0, Math.round(score * 10) / 10));

  // 2. IDENTIFICAÇÃO DE PONTOS FORTES REAIS (Elogio inicial sincero)
  const pontosFortes = [];
  if (nota >= 4.5 && avaliacoes >= 10) {
    pontosFortes.push(`Excelente reputação com os clientes atuais: nota média de ${nota.toFixed(1)} estrelas, demonstrando que quem consome o seu serviço realmente aprova a qualidade.`);
  } else if (avaliacoes >= 30) {
    pontosFortes.push(`Boa base histórica de clientes: a ficha já acumula mais de ${avaliacoes} avaliações espontâneas.`);
  } else {
    pontosFortes.push(`Negócio consolidado com localização privilegiada em ${local}, atendendo um público de alta demanda por ${categoria}.`);
  }

  if (horariosCompletos && pontosFortes.length < 2) {
    pontosFortes.push(`Horários de atendimento visíveis, permitindo que quem encontra o perfil saiba quando você está aberto.`);
  } else if (temSiteOuAgendamento && pontosFortes.length < 2) {
    pontosFortes.push(`Link de site já vinculado à ficha, facilitando o contato dos clientes mais decididos.`);
  }

  // 3. IDENTIFICAÇÃO DOS 3 GARGALOS CRÍTICOS (Foco em perda financeira)
  const todosGargalos = [];

  if (!reivindicado) {
    todosGargalos.push({
      pilar: 'Status da Ficha',
      titulo: 'Ficha não reivindicada oficialmente (Risco de perda da titularidade)',
      impacto: 'A sua ficha ainda exibe publicamente a opção "É o proprietário desta empresa?". Isso significa que qualquer concorrente ou pessoa mal-intencionada pode sugerir alterações de endereço, telefone ou até reivindicar o perfil, além de impedir você de acessar as estatísticas oficiais do Google.'
    });
  }

  if (avaliacoes < 30 || nota < 4.5) {
    todosGargalos.push({
      pilar: 'Reputação e Volume',
      titulo: `Volume de avaliações abaixo dos líderes do bairro (${avaliacoes} avaliações / ${nota.toFixed(1)}★)`,
      impacto: 'Quando um morador busca no celular por "' + categoria + ' perto de mim", o Google coloca no topo as fichas com mais de 30 avaliações recentes. Com menos avaliações, potenciais clientes novos ligam primeiro para os seus concorrentes vizinhos.'
    });
  }

  if (!respondeAvaliacoes) {
    todosGargalos.push({
      pilar: 'Gestão de Reputação',
      titulo: 'Avaliações de clientes deixadas sem resposta',
      impacto: 'O algoritmo do Google prioriza ativamente perfis onde o proprietário interage com os clientes. Deixar elogios e críticas no vácuo sinaliza desinteresse ao robô de buscas e reduz a sua taxa de conversão em novos contatos.'
    });
  }

  if (!fotosProfissionais) {
    todosGargalos.push({
      pilar: 'Atualização Visual',
      titulo: 'Galeria visual sem fotos comerciais e recentes',
      impacto: 'Empresas com fotos profissionais da fachada, equipe e ambiente recebem até 42% mais solicitações de rotas no mapa. Perfis com fotos antigas ou apenas imagens do Street View passam a impressão de empresa fechada ou desatualizada.'
    });
  }

  if (!temWhatsapp && !temSiteOuAgendamento) {
    todosGargalos.push({
      pilar: 'Conversão Direta',
      titulo: 'Ausência de canal de resposta rápida (WhatsApp ou link direto)',
      impacto: 'Mais de 70% das buscas por serviços locais acontecem no smartphone. Quem precisa de atendimento imediato quer clicar e falar direto no WhatsApp; se encontrar apenas telefone fixo ou nada, volta para a lista do Google e escolhe outro.'
    });
  }

  if (!horariosCompletos) {
    todosGargalos.push({
      pilar: 'Informações Básicas',
      titulo: 'Horários de funcionamento indefinidos ou incompletos',
      impacto: 'Clientes que pesquisam no final da tarde ou finais de semana veem o aviso "Pode estar fechado" e desistem da visita antes mesmo de sair de casa.'
    });
  }

  if (!postagensAtivas) {
    todosGargalos.push({
      pilar: 'Atividade Recente',
      titulo: 'Ficha sem publicações de novidades ou ofertas recentes',
      impacto: 'Sem postagens periódicas, o Google considera o perfil estático e diminui o alcance orgânico da sua empresa nas pesquisas feitas dentro do bairro.'
    });
  }

  // Selecionar rigorosamente os 3 mais graves
  const top3Gargalos = todosGargalos.slice(0, 3);

  // 4. PLANO DE AÇÃO RÁPIDO (15 DIAS)
  const planoAcao = [
    `Etapa 1 (Dias 1 a 3): Blindagem e Regularização — ${!reivindicado ? 'Reivindicar e verificar a propriedade oficial da ficha' : 'Ajustar categoria primária, secundárias e horários exatos de atendimento'}.`,
    `Etapa 2 (Dias 4 a 8): Impacto Visual e Conversão — Inserir fotos profissionais de fachada/ambiente e vincular canal direto de agendamento por WhatsApp.`,
    `Etapa 3 (Dias 9 a 15): Aceleração de Reputação — Responder todas as avaliações pendentes com técnicas de SEO local e ativar rotina simples para coletar 10 novas avaliações positivas de clientes satisfeitos.`
  ];

  // 5. GANCHO PARA ABORDAGEM COMERCIAL (Máximo 4 linhas, consultivo, sem clichês de IA)
  const ganchoAbordagem = `Olá, equipe da ${nome}! Analisei a presença da empresa nas buscas locais em ${local} e vi que vocês têm um serviço muito bem avaliado (${nota.toFixed(1)} estrelas), mas a ficha pública no Google está com algumas falhas simples que estão entregando ligações de clientes novos diretamente para os concorrentes da rua ao lado. Preparei um diagnóstico rápido em 3 pontos mostrando exatamente onde vocês estão perdendo espaço; posso te enviar aqui para dar uma olhada?`;

  // 6. MONTAGEM DO RELATÓRIO TEXTUAL FORMATADO
  const relatorioTexto = `
# RELATÓRIO DE DIAGNÓSTICO DE PRESENÇA LOCAL NO GOOGLE
**Empresa Analisada:** ${nome}
**Segmento / Categoria:** ${categoria}
**Localização:** ${local}

---

### 1. Resumo Executivo
**Nota de Saúde do Perfil:** ${score.toFixed(1)} / 10
*Diagnóstico Rápido:* A ${nome} possui um excelente serviço consolidado, mas está com a sua vitrine do Google desregulada, permitindo que negócios vizinhos com menor qualidade apareçam na frente nas buscas de celular no bairro.

---

### 2. O Que Já Está Funcionando Bem
${pontosFortes.map(p => `• ${p}`).join('\n')}

---

### 3. Três Gargalos Críticos Que Estão Custando Clientes Hoje
${top3Gargalos.map((g, i) => `**${i + 1}. ${g.titulo}**\n   ↳ *Impacto prático:* ${g.impacto}`).join('\n\n')}

---

### 4. Plano de Ação Recomendado (Próximos 15 Dias)
${planoAcao.map(a => `• ${a}`).join('\n')}

---

### 5. Mensagem de Abordagem Sugerida (Para contato direto com o proprietário)
> "${ganchoAbordagem}"
`.trim();

  return {
    empresa: nome,
    categoria,
    localizacao: local,
    notaSaude: score,
    pontosFortes,
    gargalos: top3Gargalos,
    planoAcao,
    ganchoAbordagem,
    relatorioTexto
  };
}

module.exports = {
  gerarDiagnosticoGMN
};
