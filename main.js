const moveButton = document.querySelector('#move-button');
const vanes = [...document.querySelectorAll('.kinetic-board .vane')];
const orbitBall = document.querySelector('.orbit-ball');
let turns = 0;
moveButton.addEventListener('click', () => {
  turns += 1;
  const angles = [-30 + turns * 90, -30 - turns * 75, 24 + turns * 100];
  vanes.forEach((vane, index) => { vane.style.transform = `rotate(${angles[index]}deg)`; });
  orbitBall.style.transform = `rotate(${turns * 60}deg)`;
  document.querySelector('#motion-status').textContent = `Move ${turns}: the vanes have turned into a new arrangement.`;
});
