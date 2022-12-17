<template>
  <div class="row">
    <div class="col-4 col-sm-4">
    <h3 class="text-center">Advanced Stream App</h3>
    <div class="login-form">
      <h2 class="text-center">Log in</h2>
      <div class="form-group">
        <input type="email" class="form-control" placeholder="Email" required="required" v-model="auth.email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Password" required="required" v-model="auth.password">
      </div>
      <div class="form-group">
        <button @click="login" class="btn btn-primary btn-block">Log in</button>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      auth: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const form = new FormData();
      form.append('email', this.auth.email)
      form.append('password', this.auth.password)

      axios.post('/v1/login', form)
          .then(response => {
            localStorage.setItem('auth', JSON.stringify(response.data))
            this.$router.push('/dashboard')
          })
    }
  }
}
</script>
<style>
.login-form {
  width: 340px;
  margin: 50px auto;
  font-size: 15px;
}
.login-form form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control, .btn {
  min-height: 38px;
  border-radius: 2px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
}
</style>