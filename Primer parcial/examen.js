const readlineSync = require('readline-sync');
  
console.log("NFL To-Do List");
console.log("Please choose a option to see:");
console.log("1) List of all to-dos");
console.log("2) List of all unresolved issues");
console.log("3) List of all pending resolved issues");

const option = readlineSync.question('');

const numOption = parseInt(option);

switch (numOption) {
    case 1:
        console.log(IDsNTitles());
        break;
    case 2:
        console.log(unresolved());
        break;
    case 3:
        console.log(resolved());
        break;
    default:
        console.log("Error unknown option");
}

async function IDsNTitles() {
    try {
      const answer = await fetch('http://jsonplaceholder.typicode.com/todos');
  
      if (!answer.ok) {
        throw new Error(`Error getting data. Code: ${answer.status}`);
      }
  
      const datos = await answer.json();
  
      datos.forEach(item => {
        console.log(`ID: ${item.id}, Title: ${item.title}`);
      });
  
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
async function unres() {
    try {
      const respuesta = await fetch('https://jsonplaceholder.typicode.com/todos');
  
      if (!respuesta.ok) {
        throw new Error(`Error getting data. Code: ${respuesta.status}`);
      }
  
      const datos = await respuesta.json();
  
      const datosFiltrados = datos.filter(item => !item.completed);
  
      datosFiltrados.forEach(item => {
        console.log(`ID: ${item.id}, Title: ${item.title}`);
      });
  
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
async function res() {
    try {
      const answer = await fetch('https://jsonplaceholder.typicode.com/todos');
  
      if (!answer.ok) {
        throw new Error(`Error getting data. Code: ${answer.status}`);
      }
  
      const datos = await answer.json();
  
      const datosFiltrados = datos.filter(item => item.completed);
  
      datosFiltrados.forEach(item => {
        console.log(`ID: ${item.id}, Title: ${item.title}`);
      });
  
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

