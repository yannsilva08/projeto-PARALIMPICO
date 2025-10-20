// SISTEMA DE JOGOS PARALÍMPICOS
// Dados iniciais com notícias paralímpicas

const dadosIniciais = {
  noticias: [
    {
      id: 1,
      titulo: "🏊‍♂️ Destaque na Natação Paralímpica",
      conteudo: "Os nadadores do IFRO Calama brilharam na última edição do Circuito Loterias Caixa, conquistando medalhas e superando marcas pessoais. A equipe segue firme rumo ao Campeonato Brasileiro de Jovens!",
      esporte: "natacao",
      destaque: true,
      data: "2025-10-10T10:00:00",
    },
    {
      id: 2,
      titulo: "🏋️‍♂️ Recorde no Halterofilismo Paralímpico",
      conteudo: "O atleta João Lucas levantou 182kg na categoria até 72kg, quebrando o recorde regional. O feito reforça o crescimento do halterofilismo paralímpico no norte do país.",
      esporte: "halterofilismo",
      destaque: false,
      data: "2025-09-20T14:30:00",
    },
    {
      id: 3,
      titulo: "⚽ Futebol de 5 encanta público em Porto Velho",
      conteudo: "A equipe de Futebol de 5 (para cegos) do IFRO realizou uma partida amistosa que emocionou o público. Os atletas mostraram técnica, confiança e espírito esportivo.",
      esporte: "futebol-cegos",
      destaque: false,
      data: "2025-09-12T09:15:00",
    },
    {
      id: 4,
      titulo: "🥋 Judô Paralímpico traz mais conquistas",
      conteudo: "Os judocas paralímpicos do IFRO participaram de um torneio regional em Manaus e voltaram com 3 medalhas de ouro. O judô adaptado cresce cada vez mais na região norte!",
      esporte: "judo",
      destaque: false,
      data: "2025-08-28T11:20:00",
    },
  ],
  alunos: [
    {
      id: 1,
      nome: "Yann da Silva Aguiar",
      matricula: "2025001",
      turma: "2º INFO A",
      esporte: "natacao",
      telefone: "(69) 99999-9999",
      tipo: "jogos",
      data: "2025-10-01T08:00:00",
    },
    {
      id: 2,
      nome: "Maria Oliveira Costa",
      matricula: "2025002",
      turma: "3º INFO B",
      esporte: "halterofilismo",
      telefone: "(69) 98888-8888",
      tipo: "ambos",
      data: "2025-10-01T08:30:00",
    },
  ],
}

// 🏅 Mapeamento de Esportes Paralímpicos
const esportesMap = {
  natacao: "🏊‍♂️ Natação",
  atletismo: "🏃 Atletismo",
  halterofilismo: "🏋️‍♂️ Halterofilismo",
  bocha: "🔵 Bocha",
  "futebol-cegos": "⚽ Futebol de 5 (Cegos)",
  "futebol-7": "⚽ Futebol de 7 (PC)",
  goalball: "🟡 Goalball",
  "tenis-cadeira": "🎾 Tênis em Cadeira de Rodas",
  "tenis-mesa": "🏓 Tênis de Mesa",
  "voleibol-sentado": "🏐 Voleibol Sentado",
  "basquete-cadeira": "🏀 Basquete em Cadeira de Rodas",
  "rugbi-cadeira": "🏉 Rúgbi em Cadeira de Rodas",
  "esgrima-cadeira": "🤺 Esgrima em Cadeira de Rodas",
  canoagem: "🚣 Canoagem",
  remo: "🚤 Remo",
  paratriatlo: "🏊‍♂️🚴‍♂️🏃 Paratriatlo",
  "tiro-esportivo": "🎯 Tiro Esportivo",
  "tiro-arco": "🏹 Tiro com Arco",
  ciclismo: "🚴 Ciclismo",
  parataekwondo: "🥋 Parataekwondo",
  judo: "🥋 Judô Paralímpico",
  geral: "📋 Geral",
}


// 📊 Inicializar dados se não existirem
function inicializarDados() {
  if (!localStorage.getItem("ifro_noticias")) {
    localStorage.setItem("ifro_noticias", JSON.stringify(dadosIniciais.noticias))
  }
  if (!localStorage.getItem("ifro_alunos")) {
    localStorage.setItem("ifro_alunos", JSON.stringify(dadosIniciais.alunos))
  }
  if (!localStorage.getItem("ifro_torneios")) {
    localStorage.setItem("ifro_torneios", JSON.stringify([]))
  }
}


// 📋 Funções para gerenciar dados
function obterNoticias() {
  return JSON.parse(localStorage.getItem("ifro_noticias") || "[]")
}

function obterAlunos() {
  return JSON.parse(localStorage.getItem("ifro_alunos") || "[]")
}

function salvarAlunos(alunos) {
  localStorage.setItem("ifro_alunos", JSON.stringify(alunos))
}

function obterTorneios() {
  return JSON.parse(localStorage.getItem("ifro_torneios") || "[]")
}

function salvarTorneios(torneios) {
  localStorage.setItem("ifro_torneios", JSON.stringify(torneios))
}

// Função para inscrição de alunos
function configurarInscricaoAlunos() {
  const formInscricao = document.getElementById("form-inscricao-aluno")
  if (!formInscricao) return

  formInscricao.addEventListener("submit", function(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const novaInscricao = {
      id: Date.now(),
      nome: formData.get("nome").trim(),
      historia:formData.get("historia").trim(),
      esporte: formData.get("esporte"),
      email: formData.get("email").trim(),
      data: new Date().toISOString(),
    }

    // Validações
    if (!novaInscricao.nome || novaInscricao.email||!novaInscricao.esporte) {
      mostrarToast("❌ Todos os campos obrigatórios devem ser preenchidos!", "error")
      return
    }


    // Adicionar inscrição
    alunos.push(novaInscricao)
    salvarAlunos(alunos)

    // Atualizar interface
    atualizarEstatisticas()
    e.target.reset()

    const esporteNome = esportesMap[novaInscricao.esporte]
    const tipoNome = tiposInscricaoMap[novaInscricao.tipo]
    mostrarToast(`✅ Inscrição realizada com sucesso! ${novaInscricao.nome} foi inscrito em ${esporteNome} para ${tipoNome}`, "success")

    // Scroll para o topo
    document.getElementById("inscricao").scrollIntoView({ behavior: "smooth" })
  })
}

// 📰 Função para carregar notícias
function carregarNoticias(filtroEsporte = "todos") {
  const listaNoticias = document.getElementById("lista-noticias")
  if (!listaNoticias) return

  const noticias = obterNoticias()
  let noticiasFiltradas = noticias

  if (filtroEsporte !== "todos") {
    noticiasFiltradas = noticias.filter(noticia => noticia.esporte === filtroEsporte)
  }

  // Ordenar por destaque e data
  noticiasFiltradas.sort((a, b) => {
    if (a.destaque && !b.destaque) return -1
    if (!a.destaque && b.destaque) return 1
    return new Date(b.data) - new Date(a.data)
  })

  listaNoticias.innerHTML = ""

  if (noticiasFiltradas.length === 0) {
    listaNoticias.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: #666; grid-column: 1 / -1;">
        <h3>📰 Nenhuma notícia encontrada</h3>
        <p>Não há notícias para o filtro selecionado.</p>
      </div>
    `
    return
  }

  noticiasFiltradas.forEach((noticia, index) => {
    const noticiaCard = document.createElement("div")
    noticiaCard.className = `noticia-card ${noticia.destaque ? "destaque" : ""}`
    noticiaCard.style.animationDelay = `${index * 0.1}s`

    const dataFormatada = new Date(noticia.data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    const esporteNome = esportesMap[noticia.esporte] || "📋 Geral"

    noticiaCard.innerHTML = `
      <h3>${noticia.titulo}</h3>
      <p>${noticia.conteudo}</p>
      <div class="noticia-meta">
        <span>📅 ${dataFormatada}</span>
        <span class="noticia-badge">${esporteNome}</span>
      </div>
    `

    listaNoticias.appendChild(noticiaCard)
  })
}

// 📊 Função para atualizar estatísticas
function atualizarEstatisticas() {
  const alunos = obterAlunos()
  const noticias = obterNoticias()

  // Atualizar total de alunos
  const totalAlunosEl = document.getElementById("total-alunos")
  if (totalAlunosEl) {
    totalAlunosEl.textContent = alunos.length
  }

  // Atualizar total de notícias
  const totalNoticiasEl = document.getElementById("total-noticias")
  if (totalNoticiasEl) {
    totalNoticiasEl.textContent = noticias.length
  }

  // Atualizar participantes por esporte
  const participantesPorEsporte = {}
  alunos.forEach(aluno => {
    participantesPorEsporte[aluno.esporte] = (participantesPorEsporte[aluno.esporte] || 0) + 1
  })

  // Atualizar contadores nos cards
  Object.keys(esportesMap).forEach(esporte => {
    if (esporte !== "geral") {
      const elemento = document.getElementById(`participantes-${esporte}`)
      if (elemento) {
        elemento.textContent = participantesPorEsporte[esporte] || 0
      }
    }
  })
}

// 🎯 Configurar filtros de notícias
function configurarFiltros() {
  const filtros = document.querySelectorAll(".filtro-btn")

  filtros.forEach(filtro => {
    filtro.addEventListener("click", function() {
      // Remover classe active de todos
      filtros.forEach(f => f.classList.remove("active"))

      // Adicionar classe active ao clicado
      this.classList.add("active")

      // Filtrar notícias
      const esporte = this.getAttribute("data-esporte")
      carregarNoticias(esporte)
    })
  })
}

// 🎨 Função para scroll suave
function configurarScrollSuave() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// ✨ Animações de entrada
function configurarAnimacoes() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  )

  // Observar cards que serão animados
  setTimeout(() => {
    document.querySelectorAll(".noticia-card, .esporte-card").forEach(card => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(card)
    })
  }, 100)
}

//  Função para destacar esportes populares
function destacarEsportesPopulares() {
  const alunos = obterAlunos()
  const participantesPorEsporte = {}

  alunos.forEach(aluno => {
    participantesPorEsporte[aluno.esporte] = (participantesPorEsporte[aluno.esporte] || 0) + 1
  })

  // Encontrar esporte com mais participantes
  let esporteMaisPopular = ""
  let maxParticipantes = 0

  Object.entries(participantesPorEsporte).forEach(([esporte, count]) => {
    if (count > maxParticipantes) {
      maxParticipantes = count
      esporteMaisPopular = esporte
    }
  })

  // Destacar o card do esporte mais popular
  if (esporteMaisPopular && maxParticipantes > 1) {
    const cardPopular = document.querySelector(`[data-esporte="${esporteMaisPopular}"]`)
    if (cardPopular && cardPopular.classList.contains('esporte-card')) {
      cardPopular.style.border = "3px solid #ffd700"
      cardPopular.style.boxShadow = "0 15px 40px rgba(255, 215, 0, 0.3)"

      // Adicionar badge de "Mais Popular"
      const badge = document.createElement("div")
      badge.innerHTML = "⭐ Mais Popular"
      badge.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #333;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        box-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
        z-index: 10;
      `
      cardPopular.style.position = "relative"
      cardPopular.appendChild(badge)
    }
  }
}

//  Função para mostrar mensagens toast
function mostrarToast(mensagem, tipo = "info") {
  const toast = document.createElement("div")
  toast.className = `toast ${tipo}`
  toast.textContent = mensagem

  document.body.appendChild(toast)

  // Animar entrada
  setTimeout(() => {
    toast.classList.add("show")
  }, 100)

  // Remover após 4 segundos
  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, 4000)
}

// 🎯 Adicionar interatividade aos cards de esporte
function configurarInteratividadeEsportes() {
  const esporteCards = document.querySelectorAll(".esporte-card")

  esporteCards.forEach(card => {
    card.addEventListener("click", function() {
      const esporte = this.getAttribute("data-esporte")
      const esporteNome = esportesMap[esporte] || esporte

      // Scroll para seção de inscrição
      document.getElementById("inscricao").scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Pré-selecionar o esporte no formulário
      setTimeout(() => {
        const selectEsporte = document.getElementById("esporte-inscricao")
        if (selectEsporte) {
          selectEsporte.value = esporte
          selectEsporte.focus()
        }
        mostrarToast(`🎯 ${esporteNome} selecionado! Complete sua inscrição.`, "info")
      }, 800)
    })
  })
}

// 🚀 Inicialização quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  inicializarDados()
  carregarNoticias()
  atualizarEstatisticas()
  configurarFiltros()
  configurarScrollSuave()
  configurarAnimacoes()
  configurarInteratividadeEsportes()
  configurarInscricaoAlunos()

  // Destacar esportes populares após um pequeno delay
  setTimeout(destacarEsportesPopulares, 500)

  // Atualizar dados a cada 30 segundos
  setInterval(() => {
    atualizarEstatisticas()
    destacarEsportesPopulares()
  }, 30000)

  // Mostrar mensagem de boas-vindas
  setTimeout(() => {
    mostrarToast("🏆 Bem-vindos ao MOVIMENTO PARALÍMPICO!", "info")
  }, 1000)
})

// 🌐 Exportar funções para uso em outros arquivos
window.ifroJogos = {
  obterNoticias,
  obterAlunos,
  salvarAlunos,
  obterTorneios,
  salvarTorneios,
  atualizarEstatisticas,
  mostrarToast,
  esportesMap,
  tiposInscricaoMap,
  inicializarDados,
}