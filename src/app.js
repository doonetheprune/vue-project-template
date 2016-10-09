/**
 * Created by ShaunBetts on 01-Apr-16.
 */

import 'bootstrap_simplex';

import './app.css';

import Vue from 'vue';
import VueRouter from 'vue-router';

var app = require('./app.html');

Vue.use(VueRouter);

var routesContext = require.context('./routes/', true, /page.js$/);

var routes = {};

routesContext.keys().forEach((route) => {
  var routePath = route
    .split('/')
    .filter(file => file !== '.' && file !== 'page.js')
    .map(file => file.replace('subRoutes', 'children'))
    .join('.');

  route = routesContext(route);

  _.set(routes, routePath, {
    path: route.path || _.last(routePath.split('.')),
    component: route.component
  });
});

var convertChildren = (route) => {
  if(route.children){
    route.children = _.values(route.children).map(childRoute => {
     return convertChildren(childRoute)
    });
  }
  return route;
};

routes = _.values(routes).map(route => convertChildren(route)).map(route => {
  route.path = '/' + route.path;
  return route;
});

var router = new VueRouter({
  routes
});

console.log('bla', routes);

//create a container for the app
var container = document.createElement('div');
document.body.appendChild(container);

//init the base vue component
var App = new Vue({
  router,
  template: app
}).$mount(container);
