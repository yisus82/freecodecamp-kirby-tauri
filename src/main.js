import kaplay from 'kaplay';
import { makeButton } from './button';
import { colliders } from './colliders';
import {
  BACKGROUND_COLOR,
  CLOUDS_MAX_POS_X,
  CLOUDS_MIN_POS_X,
  CLOUDS_SPEED,
  GRAVITY,
  OBSTACLES_MAX_POS_X,
  OBSTACLES_MIN_POS_X,
  OBSTACLES_SPEED,
  OBSTACLES_SPEED_INCREASE,
  PLAY_BUTTON_FONT_SIZE,
  PLAY_BUTTON_HEIGHT,
  PLAY_BUTTON_OFFSET_X,
  PLAY_BUTTON_OFFSET_Y,
  PLAY_BUTTON_RADIUS,
  PLAY_BUTTON_TEXT,
  PLAY_BUTTON_WIDTH,
  PLAYER_INITIAL_POS_X,
  PLAYER_INITIAL_POS_Y,
  SCALE_FACTOR,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from './constants';
import { makePlayer } from './player';
import { makeScoreBox } from './scoreBox';

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

const goToMain = () => {
  k.play('confirm');
  k.go('main');
};

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

  k.add(
    makeButton(
      k,
      PLAY_BUTTON_TEXT,
      PLAY_BUTTON_WIDTH,
      PLAY_BUTTON_HEIGHT,
      PLAY_BUTTON_RADIUS,
      PLAY_BUTTON_FONT_SIZE,
      k.center().x + PLAY_BUTTON_OFFSET_X,
      k.center().y + PLAY_BUTTON_OFFSET_Y,
      goToMain
    )
  );

  k.onKeyPress('space', goToMain);
  k.onGamepadButtonPress('south', goToMain);
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
    if (obstacles.pos.x < OBSTACLES_MIN_POS_X) {
      // put the obstacles sprite far back so it scrolls again through the level
      obstacles.pos.x = OBSTACLES_MAX_POS_X;
      // progressively increase speed
      obstacles.speed += OBSTACLES_SPEED_INCREASE;
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

  let score = 0;
  k.loop(1, () => {
    score += 1;
  });

  const die = () => {
    if (player.isDead) {
      return;
    }
    k.play('hurt');
    obstacles.speed = 0;
    clouds.speed = 0;
    player.disableControls();
    player.isDead = true;
    k.add(makeScoreBox(k, score, goToMain));
  };

  const player = k.add(makePlayer(k));
  player.pos = k.vec2(PLAYER_INITIAL_POS_X, PLAYER_INITIAL_POS_Y);
  player.setControls();
  player.onCollide('obstacle', die);

  k.setGravity(GRAVITY);

  player.onUpdate(() => {
    if (player.pos.y > k.height()) {
      die();
    }
    if (player.pos.y < 0) {
      player.pos.y = 0;
    }
  });
});

k.go('start');
