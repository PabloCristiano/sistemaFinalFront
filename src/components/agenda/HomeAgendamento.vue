<template>
  <div class="container" style="margin-bottom: -90px">
    <b-overlay :show="false" rounded="sm">
      <div class="card mb-5">
        <div class="card-header">Cadastrar Agenda</div>
        <div class="card-body">
          <div class="">
            <div class="row col-md-12 col-sm-12 justify-content-end">
              <div class="col-md-6 col-sm-6 mt-2">
                <label>Data Emissão:</label>
                <b-form-input
                  id="data_emissão"
                  type="date"                 
                  :class="{
                    'fail-error': false,
                  }"
                ></b-form-input>
                <small class="small-msg">
                </small>
              </div>
              <div class="col-md-6 col-sm-6 mt-2">
                <label>Data Chegada:</label>
                <b-form-input
                  id="data_chegada"
                  type="date"
                  :class="{
                    'fail-error': false,
                  }"
                ></b-form-input>
                <small class="small-msg">
                 
                </small>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="col-md-12 text-end">
            <div class="col-md-2 offset-md-10"></div>
          </div>
        </div>
      </div>
    </b-overlay>
    <br /><br />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style></style>
