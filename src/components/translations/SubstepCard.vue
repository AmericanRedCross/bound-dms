<template>
  <b-jumbotron>
    <h3>1.1</h3>
    <div class="row" align="center">
      <div class="col">
          <div class="row">
            <div class="col-md-6">
              <b-card>
                <div>
                  Substep Title: English Title
                </div>
              </b-card>
              <b-card>
                <fa-icon name="file"></fa-icon> Sample Substep Document
              </b-card>
            </div>
            <div class="col-md-6">
              <b-card>
                <b-form-input type="text" placeholder="Translated Module Name"></b-form-input>
              </b-card>
              <b-card>
                <b-form-file></b-form-file>
              </b-card>
            </div>
          </div>
      </div>
    </div>
  </b-jumbotron>
</template>

<script>
export default {
  return: {
    data: {
    }
  }
}
</script>

<style scoped>
.card {
    height: 8rem;
    border-radius: 5px;
    padding: 20px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
</style>
