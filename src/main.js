import kaplay from 'kaplay';
import { colliders } from './colliders';
import {
  BACKGROUND_COLOR,
  BUTTON_COLOR,
  CLOUDS_MAX_POS_X,
  CLOUDS_MIN_POS_X,
  CLOUDS_SPEED,
  OBSTACLES_SPEED,
  PLAY_BUTTON_FONT_SIZE,
  PLAY_BUTTON_HEIGHT,
  PLAY_BUTTON_OFFSET_X,
  PLAY_BUTTON_OFFSET_Y,
  PLAY_BUTTON_RADIUS,
  PLAY_BUTTON_TEXT,
  PLAY_BUTTON_WIDTH,
  SCALE_FACTOR,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from './constants';
import { makePlayer } from './player';

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

k.loadSound('confirm', './sounds/confirm.wav');
k.loadSound('hurt', './sounds/hurt.wav');
k.loadSound('jump', './sounds/jump.wav');

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

  map.add([k.sprite('obstacles')]);

  const player = k.add(makePlayer(k));
  player.pos = k.center();

  const playButton = k.add([
    k.rect(PLAY_BUTTON_WIDTH, PLAY_BUTTON_HEIGHT, { radius: PLAY_BUTTON_RADIUS }),
    k.color(k.Color.fromHex(BUTTON_COLOR)),
    k.area(),
    k.anchor('center'),
    k.pos(k.center().x + PLAY_BUTTON_OFFSET_X, k.center().y + PLAY_BUTTON_OFFSET_Y),
  ]);

  playButton.add([
    k.text(PLAY_BUTTON_TEXT, { size: PLAY_BUTTON_FONT_SIZE }),
    k.color(k.Color.fromHex(BACKGROUND_COLOR)),
    k.area(),
    k.anchor('center'),
  ]);

  const goToGame = () => {
    k.play('confirm');
    k.go('main');
  };

  playButton.onClick(goToGame);
  k.onKeyPress('space', goToGame);
  k.onGamepadButtonPress('south', goToGame);
});

k.scene('main', () => {
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

  const obstacles = map.add([k.sprite('obstacles'), k.pos(), k.area(), { speed: OBSTACLES_SPEED }]);
  obstacles.onUpdate(() => {
    obstacles.move(-obstacles.speed, 0);
    if (obstacles.pos.x < -490) {
      // put the obstacles sprite far back so it scrolls again through the level
      obstacles.pos.x = 300;
      // progressively increase speed
      obstacles.speed += 30;
    }
  });

  for (const collider of colliders) {
    obstacles.add([
      k.area({
        shape: new k.Rect(k.vec2(0), collider.width, collider.height),
      }),
      k.body({ isStatic: true }),
      k.pos(collider.x, collider.y),
      'obstacle',
    ]);
  }
});

k.go('start');
