import kaplay from 'kaplay';
import {
  BACKGROUND_COLOR,
  CLOUDS_MAX_POS_X,
  CLOUDS_MIN_POS_X,
  CLOUDS_SPEED,
  SCALE_FACTOR,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from './constants';

const k = kaplay({
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
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
  k.add([k.rect(k.width(), k.height()), k.color(k.Color.fromHex(BACKGROUND_COLOR)), k.fixed()]);

  const map = k.add([k.sprite('background'), k.pos(0, 0), k.scale(SCALE_FACTOR)]);

  const clouds = map.add([k.sprite('clouds'), k.pos(), { speed: CLOUDS_SPEED }]);
  clouds.onUpdate(() => {
    clouds.move(clouds.speed, 0);
    if (clouds.pos.x > CLOUDS_MAX_POS_X) {
      // put the clouds sprite far back so it scrolls again through the level
      clouds.pos.x = CLOUDS_MIN_POS_X;
    }
  });

  map.add([k.sprite('obstacles'), k.pos()]);
});

k.scene('main', () => {});

k.go('start');
