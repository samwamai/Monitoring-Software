<template>
<div  class="container-flex d-flex justify-content-center align-items-center" id="not-found">
		<div class="container d-flex  justify-content-center">
				<div class="col-md-6 align-self-center">
					<h1>404</h1>
					<h2>Ooops! You're lost.</h2>
					<p>The page you are looking for does not exist.
						Click the button below to go back to the homepage.
					</p>
              <a href="/" type="button" class="btn btn-outline-dark">HOME</a>
				</div>
		</div>
</div>

</template>
<style scoped>
#not-found{
    background-color: #BAC2CD;
    position:fixed;
    padding:0;
    margin:0;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
}
h1 {
  font-size: 7.5em;
  margin: 15px 0px;
  font-weight: bold;
  font-family: 'Futura-bold';
  letter-spacing: 10px;
  font-weight: bold;
}
h2 {
  font-weight: bold;
  font-family: 'futuramedium';
}
p {
  font-family: 'futuramedium';
  font-size: 18px;
}
.btn.green {
  border: 4px solid var(--green);
  color: var(--blue);
}


</style>