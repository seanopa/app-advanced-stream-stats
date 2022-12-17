<template>
  <div>
    <h3>Complete Purchase with Paypal</h3>
    <div>{{plan.name}}</div>
    <div>{{plan.description}}</div>
    <div>{{plan.price}}</div>
    <div id="paypal-button"></div>
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

  mounted() {
    this.$http.get('/v1/getClientToken', (response) => {
      // Create a client.
      window.braintree.client.create({
        authorization: response.client_token
      }).then((clientInstance) => {
        // Create a PayPal Checkout component.
        return window.braintree.paypalCheckout.create({
          client: clientInstance
        });
      }).then((paypalCheckoutInstance) => {
        return window.paypal.Buttons({
          createBillingAgreement: () => {
            return paypalCheckoutInstance.createPayment({
              flow: 'vault',
              amount: this.plan.price,
              intent: 'capture'
              // your other createPayment options here
            });
          },

          onApprove: (data, actions) => {
            console.log(actions, 'Taurai')
            // some logic here before tokenization happens below
            return paypalCheckoutInstance.tokenizePayment(data).then((payload) => {
              this.$http.post('/v1/createSubscription', {payload, plan_id: this.plan.id, external_id: this.plan.external_id}, (response) => {
                if (response.ok) {
                  this.$router.push('/orderComplete')
                }
              })
            });
          },

          onCancel: function () {
            // handle case where user cancels
          },

          onError: function (err) {
            console.log(err)
            // handle case where error occurs
          }
        }).render('#paypal-button');
      }).catch((err) => {
        console.log(err)
        // Handle component creation error
      })
      ;
    })
  }
}
</script>