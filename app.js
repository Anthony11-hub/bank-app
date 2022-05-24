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

/**
 * makes sure that the displayed template is updated when browser history changes
 *
 */
window.onpopstate = () => updateRoute();
updateRoute();

