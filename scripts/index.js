let buttonElement = document.querySelector('#search-button');
let inputElement = document.querySelector('#search-input');
let fieldElement = document.querySelector('#search-result-field');

buttonElement.addEventListener('click', requisita);
inputElement.addEventListener('keyup', (event) => {
   if(event.keyCode === 13){
      requisita();
   }
})

inputElement.value = localStorage.getItem('lastCEP') || '' ;

inputElement.addEventListener('change', saveOnStorage);

function saveOnStorage() {
   let saveText = inputElement.value;
   localStorage.setItem('lastCEP', saveText);
}

function requisita() {
   let inputText = inputElement.value;

   axios.get('https://viacep.com.br/ws/' + inputText + '/json/')
      .then(function (response){
         let endereco = response.data;
         renderElements(endereco);
      })
      .catch(function (error) {
         renderElements('');
      })
}

function renderElements(objEndereco) {

   let saida = '';

   if(inputElement.value !== ''){
      if(objEndereco === '' || objEndereco.erro === true){
         
         fieldElement.setAttribute('style', 'display: initial; height: 2vh');
         saida += `O valor: ${inputElement.value} não é um CEP válido!`;
   
      }else{

         fieldElement.setAttribute('style', 'display: initial;');
   
         if(objEndereco.cep !== "" || null){
            saida += `<div style="margin-bottom: 0.5vh;">Cep: ${objEndereco.cep}</div>`
         }
         if(objEndereco.localidade !== "" || null){
            saida += `<div style="margin-bottom: 0.5vh;">Cidade: ${objEndereco.localidade}</div>`
         }
         if(objEndereco.logradouro !== "" || null){
            saida += `<div style="margin-bottom: 0.5vh;">Logradouro: ${objEndereco.logradouro}</div>`
         }
         if(objEndereco.complemento !== "" || null){
            saida += `<div style="margin-bottom: 0.5vh;">Complemento: ${objEndereco.complemento}</div>`
         }
         if(objEndereco.bairro !== "" || null){
            saida += `<div style="margin-bottom: 0.5vh;">Bairro: ${objEndereco.bairro}</div>`
         }
         if(objEndereco.uf !== "" || null){
            saida += `<div style="margin-bottom: 0.5vh;">Uf: ${objEndereco.uf}</div>`
         }
         if(objEndereco.unidade !== "" || null){
            saida += `<div style="margin-bottom: 0.5vh;">Unidade: ${objEndereco.unidade}</div>`
         }
         if(objEndereco.ibge !== "" || null){
            saida += `<div style="margin-bottom: 0.5vh;">Ibge: ${objEndereco.ibge}</div>`
         }
         if(objEndereco.gia !== "" || null){
            saida += `<div style="margin-bottom: 0.5vh;">Gia: ${objEndereco.gia}</div>`
         }
   
      }
   }   

   fieldElement.innerHTML = saida;
}

$('#search-input').mask('99999-999')