import { forwardRef } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss'

export type TButtonProps = JSX.IntrinsicElements['button'];

/**
 * A generic Button component
 * @category components
 */
export const Button = forwardRef<HTMLButtonElement, TButtonProps>( ( props ) => {
  const {
    disabled, className,
    onClick,
    ...rest
  } = props;

  const compProps = {
    disabled,
    className: classNames( styles.button, className ),
    onClick,
    ...rest,
  };

  return <button {...compProps} />;
} );

Button.displayName = 'Button';
