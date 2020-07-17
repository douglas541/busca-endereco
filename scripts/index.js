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
            saida += `Cep: ${objEndereco.cep}</br>`
         }
         if(objEndereco.localidade !== "" || null){
            saida += `Cidade: ${objEndereco.localidade}</br>`
         }
         if(objEndereco.logradouro !== "" || null){
            saida += `Logradouro: ${objEndereco.logradouro}</br>`
         }
         if(objEndereco.complemento !== "" || null){
            saida += `Complemento: ${objEndereco.complemento}</br>`
         }
         if(objEndereco.bairro !== "" || null){
            saida += `Bairro: ${objEndereco.bairro}</br>`
         }
         if(objEndereco.uf !== "" || null){
            saida += `Uf: ${objEndereco.uf}</br>`
         }
         if(objEndereco.unidade !== "" || null){
            saida += `Unidade: ${objEndereco.unidade}</br>`
         }
         if(objEndereco.ibge !== "" || null){
            saida += `Ibge: ${objEndereco.ibge}</br>`
         }
         if(objEndereco.gia !== "" || null){
            saida += `Gia: ${objEndereco.gia}</br>`
         }
   
      }
   }   

   fieldElement.innerHTML = saida;
}

$('#search-input').mask('99999-999')