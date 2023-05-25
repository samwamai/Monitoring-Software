<template>
    <div class="pos-f-t" id="header">
        <nav class="navbar fixed-top">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-right"
                aria-controls="navbar-right" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
        <div class="collapse nav-content" id="navbar-right">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/login"  target="_blank">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register" target="_blank">Register</a>
                </li>
            </ul>
        </div>

    </div>
</template>
<style scoped>
#header {
    background-color: #333;
}

.navbar-toggler {
    background-color: aliceblue;
}

.nav-link {
    color: white;
}

.nav-content {
    position: fixed;
    right: 3px;
    top: 50px;
    background-color: #333;
    ;
    transition: all 0.4s;
    z-index: 9;
}</style>
  