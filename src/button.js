import { BACKGROUND_COLOR, FOREGROUND_COLOR } from './constants';

/**
 * Makes a button
 *
 * @param {import('kaplay').KAPLAYCtx} k The Kaplay context
 * @param {string} text The button text
 * @param {number} width The button width
 * @param {number} height The button height
 * @param {number} radius The button radius
 * @param {number} font_size The button font size
 * @param {number} pos_x The button x position
 * @param {number} pos_y The button y position
 * @param {() => void} handleClick The button click handler
 * @returns {import('kaplay').GameObj} The button object
 */
export const makeButton = (
  k,
  text,
  width,
  height,
  radius,
  font_size,
  pos_x,
  pos_y,
  handleClick
) => {
  const button = k.make([
    k.rect(width, height, { radius: radius }),
    k.color(k.Color.fromHex(FOREGROUND_COLOR)),
    k.area(),
    k.anchor('center'),
    k.pos(pos_x, pos_y),
  ]);

  button.add([
    k.text(text, { size: font_size }),
    k.color(k.Color.fromHex(BACKGROUND_COLOR)),
    k.area(),
    k.anchor('center'),
  ]);

  button.onClick(handleClick);

  return button;
};
