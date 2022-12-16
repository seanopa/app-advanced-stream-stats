<template>
  <div class="container-fluid">
    <h1>Stream Stats Dashboard</h1>

    <h5>Account Name</h5>

    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-0"></div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        {{summary.user.first_name}}
        {{summary.user.last_name}}
      </div>
      <div class="col-lg-4 col-md-4 col-sm-0"></div>
    </div>

    <br>

    <h5>Subscription Summary</h5>

    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-0"></div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <table class="table-summary table">
          <tr><td>Plan:</td><td>{{summary.plan.name}}</td></tr>
          <tr><td>Start:</td><td>{{summary.subscription.start_date}}</td></tr>
          <tr><td>End:</td><td>{{summary.subscription.end_date}}</td></tr>
          <tr><td>Is Recurring:</td><td>{{summary.subscription.is_recurring}}</td></tr>
          <tr><td>Price:</td><td>{{summary.plan.currency_symbol}}{{summary.plan.price}} {{summary.plan.currency_code}}</td></tr>
          <tr><td>Description</td><td>{{summary.plan.description}}</td></tr>
        </table>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-0"></div>
    </div>

    <div class="row" v-if="!summary.subscription.is_cancelled">
      <div class="col-lg-4 col-md-4 col-sm-0"></div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <button class="btn btn-primary text-white" @click="cancelSubscription()">Cancel Subscription</button>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-0"></div>
    </div>

    <br>

    <h5>Stats Available With Subscription</h5>

    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-0"></div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <table class="table-summary table">
          <tr v-for="(feature, key) in summary.features" :key="key">
            <td>{{feature.name}}</td>
            <td>{{feature.count}}</td>
          </tr>
        </table>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-0"></div>
    </div>

    <br>

    <div v-if="summary.plan.is_upgradable">
      <h6>Get More Stats By Upgrading Your Plan</h6>
      <router-link to="/updateSubscription" class="btn btn-primary text-white">Upgrade</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      name: 'Sean Opa',
      summary: {}
    }
  },

  created () {
    this.$http.get('/v1/getAccountSummary', (response) => {
      this.summary = response
    })
  },

  methods: {
    cancelSubscription () {
      let cancel = confirm('Are you sure you want to cancel?');
      if (cancel) {
        this.$http.post('/v1/cancelSubscription', {}, (response) => {
          if (response.ok) {
            location.reload();
          }
        })
      }
    }
  }
}
</script>
<style type="text/css">
.table-summary tr td:first-child {
  font-weight: bold !important;
  text-align: right !important;
}
.table-summary tr td:last-child {
  text-align: right !important;
}
</style>