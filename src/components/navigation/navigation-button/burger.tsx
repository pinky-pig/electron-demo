import { CSSProperties, FunctionComponent, ReactNode, useState } from 'react';

import { CommonBurgerProps } from './types';

interface RenderOptions {
  barHeight: number;
  barStyles: CSSProperties;
  burgerStyles: CSSProperties;
  handler: () => void;
  isLeft: boolean;
  isToggled: boolean;
  label: string | undefined;
  margin: number;
  move: number;
  time: number;
  easing: string;
  topOffset: number;
  width: number;
}

export interface BurgerProps extends CommonBurgerProps {
  render: (o: RenderOptions) => ReactNode;
  lines?: number;
}
const area = 48;

export const Burger = (({
  color = 'currentColor',
  direction = 'left',
  distance = 'md',
  duration = 0.4,
  easing = 'cubic-bezier(0, 0, 0, 1)',
  hideOutline = true,
  label,
  lines = 3,
  onToggle,
  render,
  rounded = false,
  size = 32,
  toggle,
  toggled,
}) => {
  const [toggledInternal, toggleInternal] = useState(false);

  const width = Math.max(12, Math.min(area, size));
  const room = Math.round((area - width) / 2);

  const barHeightRaw = width / 12;
  const barHeight = Math.round(barHeightRaw);

  let space = 0.5;

  if (distance === 'lg') {
    space = 0.25;
  } else if (distance === 'sm') {
    space = 0.75;
  }

  const marginRaw = width / (lines * (space + (lines === 3 ? 1 : 1.25)));
  const margin = Math.round(marginRaw);

  const height = barHeight * lines + margin * (lines - 1);
  const topOffset = Math.round((area - height) / 2);

  let translate = 7.6675;

  if (lines === 3) {
    if (distance === 'lg') {
      translate = 4.0425;
    } else if (distance === 'sm') {
      translate = 5.1625;
    } else {
      translate = 4.6325;
    }
  } else if (distance === 'lg') {
    translate = 6.7875;
  } else if (distance === 'sm') {
    translate = 8.4875;
  }

  const deviation = (barHeightRaw - barHeight + (marginRaw - margin)) / (lines === 3 ? 1 : 2);
  const move = parseFloat((width / translate - deviation / (4 / 3)).toFixed(2));
  const time = Math.max(0, duration);

  const burgerStyles: CSSProperties = {
    cursor: 'pointer',
    height: `${area}px`,
    position: 'relative',
    transition: `${time}s ${easing}`,
    userSelect: 'none',
    width: `${area}px`,
  };

  const barStyles: CSSProperties = {
    background: color,
    height: `${barHeight}px`,
    left: `${room}px`,
    position: 'absolute',
  };

  if (hideOutline) {
    burgerStyles.outline = 'none';
  }

  if (rounded) {
    barStyles.borderRadius = '9em';
  }

  const toggleFunction = toggle || toggleInternal;
  const isToggled = toggled !== undefined ? toggled : toggledInternal;

  const handler = () => {
    toggleFunction(!isToggled);

    if (typeof onToggle === 'function') onToggle(!isToggled);
  };

  return render({
    barHeight,
    barStyles,
    burgerStyles,
    easing,
    handler,
    isLeft: direction === 'left',
    isToggled,
    label,
    margin,
    move,
    time,
    topOffset,
    width,
  });
}) as FunctionComponent<BurgerProps>;
