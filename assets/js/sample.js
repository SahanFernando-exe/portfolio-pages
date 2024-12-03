const API_KEY = 'Vi9OkBp+735xufor1piW7g==Cf1vN6qgwQhtXgnO';
var base_url = 'https://api.api-ninjas.com/v1/';
api = null;

const radioButtons = document.querySelectorAll('input[name="API"]');
const myform = document.getElementById('myform');

radioButtons.forEach(radio => {
    radio.addEventListener('change', (event) => {
      switch (event.target.value) {
        case 'Cats':
          api = 'cats?name=';
          break;
        case 'Cars':
          api = 'cars?model=';
          break;
        default:
          console.log('NO API SELCTED');
      }
    });
  });

myform.addEventListener('submit', (event) => {
    event.preventDefault();
    url = base_url.concat(api).concat(document.getElementById("API_param").value);
    console.log(url);
    EmptyElement(document.getElementById("API_results"))
    document.getElementById("API_results").appendChild(document.createTextNode("LOADING..."))
    fetch(url, {headers: {'X-Api-Key': API_KEY}})
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      EmptyElement(document.getElementById("API_results"))
      if (data.length==0) {
        document.getElementById("API_results").appendChild(document.createTextNode("No Results"))
      }
      else {
        UseData(data);
      }
    })
    .catch(function (error) {
      EmptyElement(document.getElementById("API_results"))
      if (api == null)
      {
        document.getElementById("API_results").appendChild(document.createTextNode("Please select an API"))
      }
      else
      {
        document.getElementById("API_results").appendChild(document.createTextNode("We ran into a problem :/"))
        console.warn(error);
      }
    })
});


function UseData(data) {
  data.forEach(item =>{
    if (api == 'cats?name='){
      let image_link = item['image_link'];
      var elem = document.createElement("img");
      elem.src = image_link;
      document.getElementById("API_results").appendChild(elem);
    }
    for(let key in item){
      document.getElementById("API_results").appendChild(document.createTextNode(`${key}: ${String(item[key])}`));
      document.getElementById("API_results").appendChild(document.createElement('br'));
    }
    document.getElementById("API_results").appendChild(document.createElement('br'));
  })
}

function EmptyElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}