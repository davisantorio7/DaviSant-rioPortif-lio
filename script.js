// ELEMENTOS DO MENU

const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");
const linksMenu = menu.querySelectorAll("a");

// ELEMENTOS DO MODO ESCURO E CLARO

const botaoTema = document.getElementById("botao-tema");

// ELEMENTOS DO FORMULÁRIO

const formulario = document.getElementById("formulario-contato");
const mensagemFormulario = document.getElementById(
  "mensagem-formulario"
);

// ELEMENTO DO ANO DO RODAPÉ

const elementoAno = document.getElementById("ano");

// MOSTRA O ANO ATUAL NO RODAPÉ

elementoAno.textContent = new Date().getFullYear();

// MENU PARA CELULAR

botaoMenu.addEventListener("click", function () {
  const menuEstaAberto = menu.classList.toggle("ativo");

  botaoMenu.classList.toggle("ativo", menuEstaAberto);

  botaoMenu.setAttribute(
    "aria-expanded",
    menuEstaAberto
  );

  botaoMenu.setAttribute(
    "aria-label",
    menuEstaAberto ? "Fechar menu" : "Abrir menu"
  );
});

// FECHA O MENU AO CLICAR EM UM LINK

linksMenu.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("ativo");
    botaoMenu.classList.remove("ativo");

    botaoMenu.setAttribute(
      "aria-expanded",
      "false"
    );

    botaoMenu.setAttribute(
      "aria-label",
      "Abrir menu"
    );
  });
});

// ATUALIZA O TEXTO DO BOTÃO DE TEMA

function atualizarBotaoTema() {
  const modoClaroAtivo =
    document.body.classList.contains("modo-claro");

  if (modoClaroAtivo) {
    botaoTema.textContent = "Modo escuro";
    botaoTema.setAttribute(
      "aria-label",
      "Ativar modo escuro"
    );
  } else {
    botaoTema.textContent = "Modo claro";
    botaoTema.setAttribute(
      "aria-label",
      "Ativar modo claro"
    );
  }
}

// CARREGA O TEMA QUE FOI SALVO NO NAVEGADOR

function carregarTemaSalvo() {
  const temaSalvo = localStorage.getItem("tema");

  if (temaSalvo === "claro") {
    document.body.classList.add("modo-claro");
  } else {
    document.body.classList.remove("modo-claro");
  }

  atualizarBotaoTema();
}

// ALTERA ENTRE MODO ESCURO E CLARO

botaoTema.addEventListener("click", function () {
  document.body.classList.toggle("modo-claro");

  const modoClaroAtivo =
    document.body.classList.contains("modo-claro");

  if (modoClaroAtivo) {
    localStorage.setItem("tema", "claro");
  } else {
    localStorage.setItem("tema", "escuro");
  }

  atualizarBotaoTema();
});

// ENVIO DO FORMULÁRIO

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = document
    .getElementById("nome")
    .value
    .trim();

  const email = document
    .getElementById("email")
    .value
    .trim();

  const mensagem = document
    .getElementById("mensagem")
    .value
    .trim();

  if (!nome || !email || !mensagem) {
    mensagemFormulario.textContent =
      "Preencha todos os campos antes de enviar.";

    return;
  }

  const assunto = encodeURIComponent(
    "Contato pelo portfólio - " + nome
  );

  const corpo = encodeURIComponent(
    mensagem +
      "\n\nNome: " +
      nome +
      "\nE-mail: " +
      email
  );

  mensagemFormulario.textContent =
    "Abrindo seu aplicativo de e-mail...";

  window.location.href =
    "mailto:davi.fuscaldi@gmail.com" +
    "?subject=" +
    assunto +
    "&body=" +
    corpo;
});

// INICIA A PÁGINA COM O TEMA SALVO

carregarTemaSalvo();