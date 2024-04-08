let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00) 
  },
  {
    nome: "Robert Sampaio",
    email: "robert@gmail.com",
    dataInscricao: new Date(2024, 3, 3, 18, 30),
    dataCheckIn: new Date(2024, 3, 5, 10, 00) 
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 1, 15, 12, 45),
    dataCheckIn: null
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 0, 10, 8, 10),
    dataCheckIn: new Date(2024, 0, 15, 9, 20) 
  },
  {
    nome: "Maria Santos",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 4, 5, 16, 0),
    dataCheckIn: new Date(2024, 4, 10, 18, 45) 
  },
  {
    nome: "João Pereira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 6, 20, 10, 30),
    dataCheckIn: null
  },
  {
    nome: "Fernanda Costa",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 7, 8, 14, 20),
    dataCheckIn: null
  },
  {
    nome: "Pedro Sousa",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 8, 18, 9, 0),
    dataCheckIn: new Date(2024, 8, 22, 11, 30) 
  },
  {
    nome: "Sandra Lima",
    email: "sandra@gmail.com",
    dataInscricao: new Date(2024, 10, 1, 20, 15),
    dataCheckIn: new Date(2024, 10, 5, 22, 45) 
  },
  {
    nome: "Rafaela Ferreira",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 11, 12, 11, 50),
    dataCheckIn: new Date(2024, 11, 15, 13, 30) 
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }
  
  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>
        ${dataInscricao}
      </td>
      <td>
        ${dataCheckIn}
      </td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // Verificar se o participante já exite
  const participanteExiste = participantes.find(
    (p) => p.email = participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // Limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?"
  if(confirm(mensagemConfirmacao) == false) {
    return 
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )

    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
}