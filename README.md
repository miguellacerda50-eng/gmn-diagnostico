# 📍 GMN — Motor de Diagnóstico e Posicionamento Google Meu Negócio

Sistema autônomo e consultivo para auditoria de fichas públicas do Google Business Profile (Google Meu Negócio), identificação de gargalos comerciais e geração de relatórios executivos em formato A4/PDF prontos para prospecção B2B de alto valor.

---

## 🎯 Objetivo

Auditar os dados públicos da ficha de uma empresa local, identificar falhas críticas que fazem o negócio perder clientes para concorrentes do mesmo bairro e gerar um dossiê executivo direto, persuasivo e empático com foco em conversão e resultados financeiros.

---

## 🏛️ Os 6 Pilares de Análise

1. **Status da Ficha:** Ficha reivindicada e verificada pelo proprietário ou vulnerável.
2. **Volume e Média de Avaliações:** Nota comparativa e volume mínimo frente aos líderes da região (mínimo de 30 avaliações recentes).
3. **Gestão de Reputação:** Respostas do proprietário às avaliações (positivas e negativas) para sinalização de relevância ao algoritmo de busca local.
4. **Atualização Visual:** Presença de fotos comerciais de alta qualidade (fachada, equipe, ambiente interno) versus imagens amadoras ou apenas Street View.
5. **Completude e Conversão:** Horários atualizados, link direto para WhatsApp/agendamento, endereço e categoria primária/secundárias otimizadas.
6. **Atividade e Postagens:** Frequência de novidades e ofertas na ficha (evitando aspecto de perfil abandonado).

---

## 📂 Estrutura de Arquivos

```text
GMN/
├── PROMPT_ESPECIALISTA_GMN.md      # Instruções de tom de voz consultivo e regras anti-arrogância
├── gerador_diagnostico_gmn.js      # Motor em Node.js: cálculo de Health Score (0-10) e plano de 15 dias
├── template_relatorio_pdf.html     # Template HTML/CSS executivo formatado para impressão A4 / PDF (1 página)
├── compilar_relatorio_pdf.js       # Script de injeção de dados e compilação do relatório
├── test_diagnostico_gmn.js         # Suíte de testes automatizados unitários e estruturais
├── relatorio_gmn_*.html            # Exemplo de relatório executivo gerado
├── .gitignore                      # Regras de exclusão Git
└── README.md                       # Documentação do projeto
```

---

## 🚀 Como Executar

### 1. Executar os Testes Automatizados
```bash
node test_diagnostico_gmn.js
```

### 2. Gerar Relatório Executivo para um Lead
```bash
node compilar_relatorio_pdf.js
```
O arquivo `.html` gerado pode ser aberto diretamente em qualquer navegador moderno e salvo como PDF com layout de 1 página exata (Ctrl + P -> Salvar como PDF).

---

## 🛡️ Regras de Escrita e Tom de Voz

- **Linguagem de Negócios:** Foco em perda de contatos e receita, evitando jargões técnicos excessivos.
- **Empático e Consultivo:** Sempre destaca os pontos fortes antes de apontar as vulnerabilidades.
- **Plano Prático de 15 Dias:** Ações divididas em Etapa 1 (Regularização), Etapa 2 (Visual) e Etapa 3 (Reputação).
