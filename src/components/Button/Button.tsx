import { forwardRef } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss'

import { EButtonVariants } from './typings';

export type TButtonProps = {
  variant?: EButtonVariants;
} & JSX.IntrinsicElements['button'];

/**
 * A generic Button component
 * @category components
 */
export const Button = forwardRef<HTMLButtonElement, TButtonProps>( ( props ) => {
  const {
    disabled, className, variant = EButtonVariants.PRIMARY,
    onClick,
    ...rest
  } = props;

  const compProps = {
    disabled,
    className: classNames( styles.button, className, variant ),
    onClick,
    ...rest,
  };

  return <button {...compProps} />;
} );

Button.displayName = 'Button';
