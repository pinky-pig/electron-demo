import { FunctionComponent } from 'react';

import { Burger } from './burger';
import { CommonBurgerProps } from './types';

const Squash = ((props) => (
  <Burger
    {...props}
    render={(o) => (
      <div
        aria-label={o.label}
        aria-expanded={o.isToggled}
        onClick={o.handler}
        onKeyUp={(e) => e.key === 'Enter' && o.handler()}
        role="button"
        style={o.burgerStyles}
        tabIndex={0}
      >
        <div
          style={{
            transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? '0s' : `${o.time / 2}s`}`,
            transform: `${o.isToggled ? `translateY(${o.barHeight + o.margin}px)` : 'none'}`,
          }}
        >
          <div
            style={{
              ...o.barStyles,
              width: `${o.width}px`,
              top: `${o.topOffset}px`,
              transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? `${o.time / 2}s` : '0s'}`,
              transform: `${o.isToggled ? `rotate(45deg)` : 'none'}`,
            }}
          />
        </div>

        <div
          style={{
            transition: `${o.time / 2}s ${o.easing}`,
            opacity: `${o.isToggled ? '0' : '1'}`,
          }}
        >
          <div
            style={{
              ...o.barStyles,
              width: `${o.width}px`,
              top: `${o.topOffset + o.barHeight + o.margin}px`,
              transition: `${o.time / 2}s ${o.easing}`,
            }}
          />
        </div>

        <div
          style={{
            transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? '0s' : `${o.time / 2}s`}`,
            transform: `${o.isToggled ? `translateY(-${o.barHeight + o.margin}px)` : 'none'}`,
          }}
        >
          <div
            style={{
              ...o.barStyles,
              width: `${o.width}px`,
              top: `${o.topOffset + o.barHeight * 2 + o.margin * 2}px`,
              transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? `${o.time / 2}s` : '0s'}`,
              transform: `${o.isToggled ? `rotate(-45deg)` : 'none'}`,
            }}
          />
        </div>
      </div>
    )}
  />
)) as FunctionComponent<CommonBurgerProps>;

export default Squash;
