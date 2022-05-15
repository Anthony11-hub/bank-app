function updateRoute(templateId) {//this attempts to display the templates
    const path = window.location.pathname;
    const route = routes[path];
    
    const template = document.getElementById(route.templateId);
    const view = template.content.cloneNode(true);
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(view);
}

updateRoute('login');

const routes = {
    '/login': { templateId: 'login' },
    '/dashboard': { templateId: 'dashboard' },
};