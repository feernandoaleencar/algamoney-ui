export const environment = {
    production: true,
    apiUrl: 'http://localhost:8080',
    tokenAllowedDomains: [ /algamoney-api.herokuapp.com/ ],
    tokenDisallowedRoutes: [/\/oauth\/token/],
}
