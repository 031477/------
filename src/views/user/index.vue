<template>
  <div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            username:"",
            password:"",
        }
    },
    mounted(){
        this.detailuser();
    },
    methods: {
        detailuser() {
            this.$axios.get("http://127.0.0.1:7001/api/user/show").then((res) => {
            this.tabledata = res.data;
            console.log(res.data)
      });
        },
    }
}
</script>

<style>

</style>