// Função para verificar informações de login (cabeçalho):
const loginVerification = () => {
  const emailInputBox = document.getElementById('emailInputBox');
  const passwordInputBox = document.getElementById('passwordInputBox');
  const loginBtn = document.getElementById('loginBtn');

  loginBtn.addEventListener('click', (event) => {
    if (emailInputBox.value === 'tryber@teste.com' && passwordInputBox.value === '123456') {
      alert('Olá, Tryber!');
    } else {
      alert('Email ou senha inválidos.');
    }
    event.preventDefault();
  });
};

// Função para habilitar botão de Enviar Forms (Seção Principal - Form Send Button):
const enableSendFormBtn = () => {
  const agreementCheckBox = document.getElementById('agreement');
  const sendFormBtn = document.getElementById('submit-btn');

  agreementCheckBox.addEventListener('click', () => {
    if (agreementCheckBox.checked) {
      sendFormBtn.classList.add('submit-btn-class');
      sendFormBtn.disabled = false;
    } else {
      sendFormBtn.classList.remove('submit-btn-class');
      sendFormBtn.disabled = true;
    }
  });
};

// Função para contar caracteres da Textarea (Form Forth Section):
const caracCounter = () => {
  const textAreaInputBox = document.getElementById('textarea');
  const counterDisplay = document.getElementById('counter');

  textAreaInputBox.addEventListener('keyup', (event) => {
    const textAreaContent = event.target.value;
    counterDisplay.innerHTML = 500 - textAreaContent.length;
  });
};

window.onload = () => {
  loginVerification();
  document.getElementById('submit-btn').disabled = true;
  enableSendFormBtn();
  caracCounter();
};
