import { makeButton } from './button';
import {
  BACKGROUND_COLOR,
  FOREGROUND_COLOR,
  RESTART_BUTTON_FONT_SIZE,
  RESTART_BUTTON_HEIGHT,
  RESTART_BUTTON_POS_X,
  RESTART_BUTTON_POS_Y,
  RESTART_BUTTON_RADIUS,
  RESTART_BUTTON_TEXT,
  RESTART_BUTTON_WIDTH,
} from './constants';

/**
 * Makes a score box
 *
 * @param {import("kaplay").KAPLAYCtx} k The Kaplay context
 * @param {number} score The player's score
 * @param {() => void} handleClick The button click handler
 * @returns {import('kaplay').GameObj} The score box object
 */
export const makeScoreBox = (k, score, handleClick) => {
  const container = k.make([
    k.rect(600, 500),
    k.pos(k.center()),
    k.color(k.Color.fromHex(BACKGROUND_COLOR)),
    k.area(),
    k.anchor('center'),
    k.outline(4, k.Color.fromHex(FOREGROUND_COLOR)),
  ]);

  container.add([
    k.text(`Current score: ${score}`),
    k.color(k.Color.fromHex(FOREGROUND_COLOR)),
    k.area(),
    k.pos(-240, -150),
  ]);

  container.add(
    makeButton(
      k,
      RESTART_BUTTON_TEXT,
      RESTART_BUTTON_WIDTH,
      RESTART_BUTTON_HEIGHT,
      RESTART_BUTTON_RADIUS,
      RESTART_BUTTON_FONT_SIZE,
      RESTART_BUTTON_POS_X,
      RESTART_BUTTON_POS_Y,
      handleClick
    )
  );

  k.onKeyPress('space', handleClick);
  k.onGamepadButtonPress('south', handleClick);

  return container;
};
