let account = null;

/**
 * simple object to implement a map between URL paths and our templates
 */

const routes = {
    '/login': { templateId: 'login' },
    '/dashboard': { templateId: 'dashboard' },
    '/credits': { templateId: 'credits' }
};

/**This fn instanstiates the template with the id templateId and put its cloned
 * content within our app placeholder**/

function updateRoute() {//this attempts to display the templates
    const path = window.location.pathname;
    const route = routes[path];

    //if a path doesn't match any defined route redirect to login page
    if(!route){
        return navigate('/login');
    }
    
    const template = document.getElementById(route.templateId);
    const view = template.content.cloneNode(true);
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(view);
}

updateRoute('login');//calling the fn


/**
 * function to navigate in our app
 * this method updates the current URL based on the path given, then updates the template
 * 
 */
function navigate(path){
    window.history.pushState({}, path, path);
    updateRoute();
}

/**
 * this function get the URL when a link is clicked and prevents default behaviour
 * @param {*} event 
 */
function onLinkClick(event){
    event.preventDefault();
    navigate(event.target.href);
}

async function register() {
    const registerForm = document.getElementById('registerForm');//retrieve the data using getElementById()
    const formData = new FormData(registerForm);//extract values from form controls as a set of key/value pairs
    const data = Object.fromEntries(formData);//convert the data
    const jsonData = JSON.stringify(data);//serialize the data into JSON format
    const result = await createAccount(jsonData);

    if(result.error){
        return console.log('An error occurred:', result.error);
    }

    console.log('Account created!', result);

    account = result;
    navigate('/dashboard');
}

async function createAccount(account) {//async function--code that will execute asynchronously
    try {
      const response = await fetch('//localhost:5000/api/accounts', {//fetch api used to send JSON data to server
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: account
      });
      return await response.json();//to parse JSON content and return resulting object
      //this method is asynchronous so we use await here b4 returning to make sure any errors during parsing are also caught
    } catch (error) {
      return { error: error.message || 'Unknown error' };
    }
}

async function login(){
    const loginForm = document.getElementById('loginForm');
    const user = loginForm.user.value;
    const data = await getAccount(user);

    if(data.error){
        return console.log('loginError', data.error);
    }

    account = data;
    navigate('/dashboard');
}

async function getAccount(user) {
    try {
      const response = await fetch('//localhost:5000/api/accounts/' + encodeURIComponent(user));
      return await response.json();
    } catch (error) {
      return { error: error.message || 'Unknown error' };
    }
}

/**
 * makes sure that the displayed template is updated when browser history changes
 *
 */
window.onpopstate = () => updateRoute();
updateRoute();

