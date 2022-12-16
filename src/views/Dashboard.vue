<template>
  <div>
    <h1>Stream Stats Dashboard</h1>
    <h5>Account Name</h5>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        {{summary.user.first_name}}
        {{summary.user.last_name}}
      </div>
      <div class="col-4"></div>
    </div>

    <br>
    <h5>Account Plan</h5>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        {{summary.plan.name}}
      </div>
      <div class="col-4"></div>
    </div>

    <br>
    <h5>Stats Available</h5>
    <div v-for="(feature, key) in summary.features" :key="key">
      {{feature.name}} = {{feature.count}}
    </div>

    <br>
    <div>
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
  }
}
</script>