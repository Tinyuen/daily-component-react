import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface IMaskProps {
  visible: boolean;
  duration?: number;
  onMaskClick?: () => void;
}
export interface PopupProps {
  visible: boolean;
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  animationDuration?: number;
  className?: string;
  width?: string | string;
  mask?: boolean;
  onShow?: () => void;
  onHide?: () => void;
  onMaskClick?: () => void;
}

const SLIDE_ANIMATION_ENTER_MAP = {
  top: 'ty-slideDown-enter',
  bottom: 'ty-slideUp-enter',
  left: 'ty-slideLeft-enter',
  right: 'ty-slideRight-enter',
};
const SLIDE_ANIMATION_LEAVE_MAP = {
  top: 'ty-slideDown-leave',
  bottom: 'ty-slideUp-leave',
  left: 'ty-slideLeft-leave',
  right: 'ty-slideRight-leave',
};

const Mask: FC<IMaskProps> = (props) => {
  const { visible, duration, onMaskClick } = props;
  const styles = useMemo<React.CSSProperties>(() => ({ animationDuration: `${duration}ms` }), [duration]);

  return useMemo(() => {
    return (
      <div
        style={styles}
        className={`ty-popup__mask ${visible ? 'ty-fade-enter' : 'ty-fade-leave'}`}
        onClick={() => {
          onMaskClick && onMaskClick();
        }}
      />
    );
  }, [onMaskClick, styles, visible]);
};

const PopupContainer: FC<PopupProps> = (props) => {
  const { visible, children, className, direction = 'bottom', width, animationDuration } = props;
  const [cls, setCls] = useState('');

  const containerStyle = useMemo<React.CSSProperties>(() => {
    const stl: React.CSSProperties = {
      animationDuration: `${animationDuration}ms`,
    };
    if (direction !== 'top' && direction !== 'bottom') {
      stl.width = typeof width === 'string' ? width : `${width}px`;
    }
    return stl;
  }, [animationDuration, direction, width]);

  useEffect(() => {
    const baseClass = [className || '', `direction-${direction}`];
    baseClass.push(visible
      ? SLIDE_ANIMATION_ENTER_MAP[direction]
      : SLIDE_ANIMATION_LEAVE_MAP[direction]);
    setCls(baseClass.join(' '));
  }, [visible, className, direction]);

  return useMemo(() => {
    return (
      <div
        className={`ty-popup__container ${cls}`}
        style={containerStyle}
      >
        {children}
      </div>
    );
  }, [containerStyle, cls, children]);
};

export const Popup: FC<PopupProps> = (props) => {
  const { visible, children, mask, onMaskClick, animationDuration, onShow, onHide } = props;
  const [show, setShow] = useState(visible);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (visible === false) {
      timerRef.current = setTimeout(() => {
        setShow(visible);
        onHide && onHide();
      }, animationDuration);
    } else {
      setShow(visible);
      onShow && onShow();
    }
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [visible, animationDuration, onShow, onHide]);

  if (!show) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="ty-popup">
      <div className="ty-popup__wrapper">
        {mask && <Mask visible={visible} duration={animationDuration} onMaskClick={onMaskClick} />}
        <PopupContainer {...props}>
          {children}
        </PopupContainer>
      </div>
    </div>,
    document.body,
  );
};

Popup.defaultProps = {
  className: '',
  direction: 'bottom',
  animationDuration: 200,
  mask: true,
};
export default Popup;
