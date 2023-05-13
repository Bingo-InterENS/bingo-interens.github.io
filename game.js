// Get the elements
const chronometer = document.querySelector('.chronometer');
const number = document.querySelector('.number');
const endRunButton = document.querySelector('#end-run');

let pseudo, gameKind, startDate;

pseudo = getCookie('pseudo');
gameKind = getCookie('gameKind');
startDate = new Date(getCookie('startDate'));

if(pseudo === "" || gameKind === "" || startDate === "")
    window.location.href = './index.html';

let currentDate = new Date();

var time = parseInt((currentDate.getTime() - startDate.getTime())/1000);

// Create the timer
const timer = setInterval(() => {
	time++;
	chronometer.textContent = formatTime(time);
}, 1000);

// Images des blocs
const grid = document.querySelector('.grid');
const imgFolder = `grille-${gameKind}/`;

// dur idx:  1 3 9 10 12 13 16 20 22 24
var images;

if(gameKind === "court"){
	images = ["grass.png", "mud.png", "prismarine_lamp.gif", "diamond_block.png", "jackolantern.png", 
		      "boat.webp", "slab_granite_polished.png", "smoker.png", "ancient_debris.png", "bee_nest_full.png",
		      "brick_stairs.png", "blue_ice.png", "terracotta.png", "fence_acacia.png", "green_bed.png",
		      "sculk.gif", "brewing_stand.gif", "red_stained_glass.png", "noteblock.png", "tuff.png", 
		      "lightning_rod.png", "anvil.png", "quartz_stairs.png", "végétarien (viande interdite) !", "slab_sandstone_cut.png"];

} else if (gameKind === "moyen"){
	images = ["damaged_anvil.png", "nametag.webp", "wither_skull.png", "candle_cake_orange_lit.png", "honey_block.png", 
		      "minecart_furnace.webp", "ore_diamond_deepslate.png", "quartz_ore.png", "sculk.gif", "Vegan + sans gluten (pain, gateaux... interdits)",
		      "sponge_wet.png", "copper_cut_stairs_weathered.png", "terracotta.png", "smithing_table.png", "scaffolding.png",
		      "polished_basalt.png", "honeycomb_block.png", "leaves_azalea_flowering.png", "emerald_block.png", "Netherite_Hoe.webp", 
		      "end_stone.png", "slime_block.png", "lily_pad.png", "bamboo_mosaic.png", "brown_concrete.png"];

} else if (gameKind === "long"){
	images = ["dragon_head.webp", "dripstone.png", "disc13.webp", "amethyst_block.png", "deepslate_bricks.png", 
		      "wood_stripped_acacia.png", "dried_kelp_block.png", "lectern-book.png", "honey_block.png", "brown_shulker.png",
		      "obsidian_crying.png", "turtle_helmet.png", "sculk_sensor.gif", "lodestone.png", "stairs_mud_brick.png",
		      "mycelium.png", "bamboo_mosaic.png", "wall_prismarine.gif", "candle_cake_cyan_lit.png", "froglight_ochre.png", 
		      "target.png", "magenta_terracotta.png", "leaves_mangrove.png", "beacon.png", "coral_block_horn.png"];

}

var imgItem = []; 

for (let i = 0; i < 25; i++) {
  const img = document.createElement("img");
  img.src = imgFolder + `${images[i]}`;
  img.title = images[i].replace(".png", "").replace(".gif", "").replace(".webp", "");
  img.alt = `${i+1}`;
  img.class = "bingoItem";
  grid.appendChild(img);
  img.addEventListener('click', () => {
	if(img.style.backgroundColor === 'rgb(85, 153, 85)')
		img.style.backgroundColor = '#f2f2f2';
	else
		img.style.backgroundColor = '#559955';
  });
  imgItem[i] = img;
}

if(gameKind === "court"){
	imgItem[23].alt = 'Végétarien';

} else if(gameKind === "moyen"){
	imgItem[3].title = "Ce block n'est pas récupérable, le créer suffit";
	imgItem[9].alt = 'Végan + sans gluten';

} else if(gameKind === "long"){
	imgItem[18].title = "Ce block n'est pas récupérable, le créer suffit";
}

// Seeds hardcodées
if(gameKind === "court"){
	number.textContent = "Seed: 123456789";
} else if(gameKind === "moyen"){
	number.textContent = "Seed: 234567891";
} else if(gameKind === "long"){
	number.textContent = "Seed: 345678912";
}

// sauvegarde de capture d'écrans --> not working :'(
// TODO: créer un backend pour que l'administrateur puisse vérifier les captures d'écrans et valider les runs

// Fin de Run
endRunButton.addEventListener('click', () => {

	if(window.confirm("Es-tu sûr d'avoir terminé ta partie ?")){
		clearInterval(timer);
		deleteAllCookies();

		document.getElementById("congrats").textContent = `Félicitations ${pseudo} !`;
		
		document.getElementById("chrono").textContent = `Tu as fini le bingo en: ${formatTime(time)}`;
		
		var bout = document.getElementById("end-run");
		bout.parentNode.removeChild(bout);
		
		document.getElementById("seed").textContent = `Mode de jeu: ${gameKind}`;

		var comm = document.getElementById("comment-field");
		document.getElementById("comm").textContent = `Commentaires: ${comm.value}`;
		document.getElementById("comm").style.marginTop = '30px';

		comm.parentNode.removeChild(comm);
	}

	

});