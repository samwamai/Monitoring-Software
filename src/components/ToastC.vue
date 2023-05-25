<template>
  <div id="snackbar">
    <div class="toast-header">
      <i class="fa fa-bell rounded me-2"></i>
      <strong class="me-auto">Notification</strong>
      <small>just now</small>
      <button v-on:click="dismissToast()" type="button" class="btn-close"></button>
    </div>
    <hr />
    <div class="toast-body">{{ message }}</div>
  </div>
</template>
<script>
export default {
  name: 'ToastC',
  data() {
    return {
      message: null,
    }
  },
  methods: {
    dismissToast() {
      const snackbar = document.getElementById("snackbar");
      if (!snackbar) { return; }
      snackbar.className = 'hide';
    },
    showToast(message) {
      this.message = message;
      if (!this.message) { return; }
      const snackbar = document.getElementById("snackbar");
      if (snackbar.className === "show") { this.dismissToast() }
      snackbar.className = "show";
      setTimeout(this.dismissToast, 7000);
    }
  }
}
</script>
<style scoped>
#snackbar {
  visibility: hidden;
  /* display:none; */
  min-width: 300px;
  max-width: 300px;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(33, 37, 41, 0.75);
  text-align: Start;
  border-radius: 2px;
  padding: 15px;
  position: fixed;
  z-index: 1;
  right: 5px;
  top: 10px;
}

#snackbar.show {
  visibility: visible;
  /* display:block; */
  -webkit-animation: fadein 0.5s;
  animation: fadein 0.5s;
}

#snackbar.hide {
  /* display:none; */
  visibility: hidden;
  -webkit-animation: fadeout 0.5s 2.5s;
  animation: fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {
    top: 0;
    opacity: 0;
  }

  to {
    top: 10px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    top: 0;
    opacity: 0;
  }

  to {
    top: 10px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    top: 10px;
    opacity: 1;
  }

  to {
    top: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    top: 10px;
    opacity: 1;
  }

  to {
    top: 0;
    opacity: 0;
  }
}

.fa.fa-bell {
  color: green;
}</style>
