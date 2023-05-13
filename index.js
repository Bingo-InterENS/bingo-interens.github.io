function testRedirect() {
  let pseudo, gameKind, startDate;

  pseudo = getCookie('pseudo');
  gameKind = getCookie('gameKind');
  startDate = getCookie('startDate');

  if(pseudo != "" && gameKind != "" && startDate != ""){
    window.location.href = './game.html';
    console.log(`Profil détecté: ${pseudo} joue en partie ${gameKind} et a commencé à ${startDate}.`);
  } else {
    console.log(`${pseudo}, ${gameKind}, ${startDate}`);
  }

}

testRedirect();

function startGame() {
  const pseudo = document.querySelector('#pseudo').value;

  if(pseudo === "") return;

  const gameKind = document.querySelector('#partie').value;

  if(window.confirm("Tu es sur le point de lancer le chronomètre de ta partie, es-tu sûr de vouloir démarrer maintenant ?")){
    window.location.href = './game.html';

    var expire = new Date();
    expire.setDate(expire.getDate() + 1);

    document.cookie = `pseudo=${pseudo}; expires=${expire}; SameSite=Strict`;
    document.cookie = `gameKind=${gameKind}; expires=${expire}; SameSite=Strict`;
    document.cookie = `startDate=${new Date()}; expires=${expire}; SameSite=Strict`;

    console.log(`start game for ${pseudo} with game mode ${gameKind}`);
  }
}