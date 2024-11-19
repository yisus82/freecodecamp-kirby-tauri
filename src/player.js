import { PLAYER_JUMP_FORCE, PLAYER_SPEED, SCALE_FACTOR } from './constants';

/**
 * Makes a player object
 *
 * @param {import('kaplay').KAPLAYCtx} k The KAPLAY context
 * @return {import('kaplay').GameObj} The player object
 */
export function makePlayer(k) {
  return k.make([
    k.sprite('kirby'),
    k.area({ shape: new k.Rect(k.vec2(0, 1.5), 8, 5) }),
    k.anchor('center'),
    k.body({ jumpForce: PLAYER_JUMP_FORCE }),
    k.pos(),
    k.scale(SCALE_FACTOR),
    {
      isDead: false,
      speed: PLAYER_SPEED,
      inputControllers: [],
      setControls() {
        const jumpLogic = () => {
          k.play('jump');
          this.jump();
        };

        this.inputControllers.push(k.onKeyPress('space', jumpLogic));
        this.inputControllers.push(k.onClick(jumpLogic));
        this.inputControllers.push(k.onGamepadButtonPress('south', jumpLogic));
      },
      disableControls() {
        this.inputControllers.forEach(inputController => inputController.cancel());
      },
    },
  ]);
}
