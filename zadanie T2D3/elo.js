function funkszyn(){
    const selectContainer = document.getElementById('select-container');

    //TWOREZENIE SELECTA
    const cSelect = document.createElement('select'); 
    cSelect.setAttribute('id', 'category-select')
    cSelect.setAttribute('name', 'category')
    cSelect.classList.add('pr-10', 'py-2', 'text-sm', 'text-gray-200', 'bg-transparent', 'border-0', 'border-b-2', 'border-gray-200',
     'appearance-none', 'focus:outline-none', 'focus:ring-0', 'focus:border-gray-200', 'w-full', 'peer')
    selectContainer.appendChild(cSelect)
    //DEFAULTOWA OPCJA
    const defaultOption = document.createElement('option')
    defaultOption.selected;
    defaultOption.text = 'Wybierz kategorie UwU'
    cSelect.appendChild(defaultOption)


//FETCH TAGOW 
const tagApi = 'https://api.waifu.im/tags';

fetch(tagApi)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Request failed with status code: ' + response.status);
    }
  })
  .then(data => {

    console.log(data);
    tagsObj = data;
    safeTags = tagsObj.versatile;
    //DODANIE OPCJI DO SELECTA Z API
    for(item of safeTags){
        const option = document.createElement('option')
        option.value = item;
        option.text = item;
        cSelect.appendChild(option)
    }
  })
  .catch(error => {
    console.error('An error occurred:', error.message);
  });

  
  //WYSWIETLANIE RANDOM OBRAZKA
  const apiUrl = 'https://api.waifu.im/search';  
  const loading = document.getElementById('loading-xd').classList;

  async function fetchAnimu() {
    loading.remove('hidden')

    const selectedCategory = document.getElementById('category-select').value 
    const params = {
      included_tags: selectedCategory,
      height: '>=200'
    };
    const queryParams = new URLSearchParams(params);
    const requestUrl = `${apiUrl}?${queryParams}`;

    const response = await fetch(requestUrl);

    //ERRORKI
    const error = {
      error: false,
      text: ''
    }
    const pError = document.getElementById('jaerror');
    if (pError !== null) {
      pError.remove();
    }

    if (!response.ok) {
        error.error = true
        error.text = 'Chyba coś namieszałeś aok'
      }else {
        const animu = await response.json()
        const animuObrazekInfo = animu.images[0];
        const konatjner = document.getElementById('tu-obrazek');
        const imydz = document.getElementById('imydz');
          if(imydz != null){
            imydz.src = animuObrazekInfo.url;
          }else {
            const animuImydz = document.createElement('img')
            animuImydz.setAttribute('id', 'imydz')
            animuImydz.setAttribute('width', 250)
            animuImydz.classList.add('rounded-lg', 'shadow-lg')
            animuImydz.src = animuObrazekInfo.url;
            konatjner.appendChild(animuImydz);
          }
        setTimeout(() => {
            loading.add('hidden')
    
        }, 1000)
        console.log(animu)
      }

    if(error.error){
      loading.add('hidden')
      const errorMessage = document.createElement('p')
      errorMessage.id = 'jaerror'
      errorMessage.innerHTML = error.text
      errorMessage.classList.add('bg-red-500', 'px-2', 'py-1', 'text-white', 'font-medium', 'rounded-lg', 'text-center', 'mt-10')
      const sekcja = document.getElementById('sekcyjka')
      sekcja.appendChild(errorMessage)
      }


  }

  const baton = document.getElementById('baton')

  baton.addEventListener('click', fetchAnimu)




}







  addEventListener('DOMContentLoaded', funkszyn)