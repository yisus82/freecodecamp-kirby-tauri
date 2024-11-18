import kaplay from 'kaplay';

const k = kaplay({
  width: 1280,
  height: 720,
  letterbox: true,
  global: false,
  scale: 2,
});

k.loadSprite('background', './background.png');
k.loadSprite('clouds', './clouds.png');
k.loadSprite('kirby', './kirby.png');
k.loadSprite('obstacles', './obstacles.png');

k.loadSound('confirm', './confirm.wav');
k.loadSound('hurt', './hurt.wav');
k.loadSound('jump', './jump.wav');

k.scene('start', () => {
  k.add([k.rect(k.width(), k.height()), k.color(k.Color.fromHex('#d7f2f7')), k.fixed()]);
});

k.scene('main', () => {});

k.go('start');
