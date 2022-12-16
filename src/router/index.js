import Vue from 'vue'
import VueRouter from 'vue-router'

// Route Components
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import UpdateSubscription from '../views/UpdateSubscription.vue'
import CheckoutWithCreditCard from '../views/CheckoutWithCreditCard.vue'
import CheckoutWithPaypal from '../views/CheckoutWithPaypal.vue'
import OrderComplete from '../views/OrderComplete.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/updateSubscription',
    name: 'UpdateSubscription',
    component: UpdateSubscription
  },
  {
    path: '/checkoutWithCreditCard/:plan',
    name: 'CheckoutWithCreditCard',
    component: CheckoutWithCreditCard
  },
  {
    path: '/checkoutWithPaypal/:plan',
    name: 'CheckoutWithPaypal',
    component: CheckoutWithPaypal
  },
  {
    path: '/orderComplete',
    name: 'OrderComplete',
    component: OrderComplete
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

let names = [];

routes.forEach(route => {names.push(route.name) })

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['Login'];
  const authRequired = !publicPages.includes(to.name);
  //localStorage.removeItem('auth')
  let auth = localStorage.getItem('auth');
  let data = auth ? JSON.parse(auth) : false;

  if (authRequired && !data.token) {
    return next('/login');
  }

  names.indexOf(to.name) === -1 && next('/')
  next();
})

export default router
