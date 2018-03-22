# Pokemon list
Sample React SPA with Redux and Router with Jest/Enzyme testing to get the RESTful API like Pokemon API a spin.

### Pokemon images
To not abuse the pokeapi github account, you may want to clone their repo with images and put it in the `static` folder of the app.
git clone https://github.com/LukaszGrela/react-pokemon-list.git

- /public/static/pokemon
- /public/static/pokemon/back

### Evolution Chain
Currently the `pokeapi.co` has broken data of the evolution chains, which means that you can't see valid chains for selected pokemon. Also for simplicity I'm taking only first item of the `evolves_to` array. e.g. eevee can evolve into 7 different pokemons but I'm displaying only one.