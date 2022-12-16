<template>
  <div>
    <h3>Complete Purchase With Credit Card</h3>
    <div>{{plan.name}}</div>
    <div>{{plan.description}}</div>
    <div>{{plan.price}}</div>
    <div id="dropin-container"></div>
    <button id="submit-button" class="button button--small button--green">Purchase</button>

  </div>
</template>

<script>
export default {
  data: function () {
    return {
      plan: {}
    }
  },

  created () {
    this.plan = this.$route.params.plan
  },

  mounted () {
    let plan_id = this.plan.id;
    let external_id = this.plan.external_id;console.log(external_id)

    const next = () => {
      this.$router.push('/orderComplete')
    }

    this.$http.get('/v1/getClientToken', (response) => {
      window.braintree.dropin.create({
        // Step three: get client token from your server, such as via
        //    templates or async http request
        authorization: response.client_token,
        container: '#dropin-container'
      }).then((instance) => {
        let button = document.getElementById('submit-button');

        button.addEventListener('click',  () => {
          instance.requestPaymentMethod( (err, payload) => {
            this.$http.post('/v1/createSubscription', {payload, plan_id, external_id}, (response) => {
              if (response.ok) {
                next()
              }
            })
            console.log(err)
          });
        })

        // Use `dropinInstance` here
        // Methods documented at https://braintree.github.io/braintree-web-drop-in/docs/current/Dropin.html
      }).catch((error) => {
        console.log(error)
      });
    })
  }
}
</script>
