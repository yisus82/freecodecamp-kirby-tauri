import kaplay from 'kaplay';

const SCALE_FACTOR = 4;

const k = kaplay({
  width: 1280,
  height: 720,
  letterbox: true,
  global: false,
  scale: SCALE_FACTOR,
});

k.loadSprite('background', './images/background.png');
k.loadSprite('clouds', './images/clouds.png');
k.loadSprite('kirby', './images/kirby.png');
k.loadSprite('obstacles', './images/obstacles.png');

k.loadSound('confirm', './images/confirm.wav');
k.loadSound('hurt', './images/hurt.wav');
k.loadSound('jump', './images/jump.wav');

k.scene('start', () => {
  k.add([k.rect(k.width(), k.height()), k.color(k.Color.fromHex('#d7f2f7')), k.fixed()]);

  const map = k.add([k.sprite('background'), k.pos(0, 0), k.scale(SCALE_FACTOR)]);

  const clouds = map.add([k.sprite('clouds'), k.pos(), { speed: 5 }]);
  clouds.onUpdate(() => {
    clouds.move(clouds.speed, 0);
    if (clouds.pos.x > 700) {
      // put the clouds far back so it scrolls again through the level
      clouds.pos.x = -500;
    }
  });
});

k.scene('main', () => {});

k.go('start');
