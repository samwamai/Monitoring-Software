<template>
<div class="search-button">    
<form @submit="onSubmit">
  <input type="search" v-model="search" v-on:input="onChange()" :placeholder="text">
  <button type="submit">Search</button>
</form>
</div>
</template>
<script>
export default {
    name: "SearchButton",
    data(){
        return{
            search:'',
        }
    },
    props: {
        text: String,
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            if (this.search) {
                this.$emit('submit-search',this.search);    
            }
        },
        onChange() {
            if (this.search.length>0) {
                this.$emit('submit-search',this.search);    
            }
        },
        clearSearch() {
           
        }
    },
}
</script>
<style scoped>
.search-button form {
  color: #555;
  display: flex;
  padding: 2px;
  border: 1px solid currentColor;
  border-radius: 5px;
  width: 240px;
}
.search-button input[type="search"] {
  border: none;
  background: transparent;
  margin: 0;
  padding: 7px 8px;
  font-size: 14px;
  color: inherit;
  border: 1px solid transparent;
  border-radius: inherit;
}

.search-button input[type="search"]::placeholder {
  color: #bbb;
}
.search-button button[type="submit"] {
  text-indent: -999px;
  overflow: hidden;
  width: 40px;
  padding: 0;
  margin: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  background: transparent url(../assets/search.svg) no-repeat center;
  cursor: pointer;
  opacity: 0.7;
}

.search-button button[type="submit"]:hover {
  opacity: 1;
}

.search-button button[type="submit"]:focus,
.search-button input[type="search"]:focus {
  box-shadow: 0 0 3px 0 #1183d6;
  border-color: #1183d6;
  outline: none;
}

</style>