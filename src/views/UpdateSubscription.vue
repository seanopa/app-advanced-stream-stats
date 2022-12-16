<template>
  <div>
    <h3>Upgrade Your Plan</h3>
    <div v-for="(item, key) in subscriptions" :key="key" class="row">
      <div class="col-3">
        <h5>{{item.name}}</h5>
      </div>
      <div class="col-3" style="text-align: left">
        <h5>Features</h5>
        <ul>
          <li v-for="(feature, index) in item.features" :key="index">{{feature}}</li>
        </ul>
      </div>
      <div class="col-3">
        <div v-if="item.name !== 'Free'">
          <div>
          <select v-model="selected_plan">
            <option :value="{}">Choose Plan</option>
            <option v-for="(plan, idx) in item.plans" :value="plan" :key="idx">{{plan.name}} {{plan.currency_symbol}}{{plan.price}} {{plan.currency_code}}</option>
          </select>
            <p>{{selected_plan.description}}</p>
          </div>
          <br>
          <div>
          <button @click="checkout('CheckoutWithCreditCard')" class="btn btn-primary">Continue With Credit Card</button>
          </div>
          <br>
          <div>
          <button @click="checkout('CheckoutWithPaypal')" class="btn btn-primary">Continue With Paypal</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      subscriptions: {},
      selected_plan: {}
    }
  },
  created () {
    this.$http.get('/v1/getSubscriptionPlans', (response) => {
      this.subscriptions = response.subscriptions
    })
  },

  methods: {
    checkout (name) {
      this.$router.push({ name, params: {plan: this.selected_plan} })
    }
  }
}
</script>
