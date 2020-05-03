import { h, cloneElement, toChildArray } from "preact";
import { createRef, Fragment, useEffect, useRef, memo } from "preact/compat";
import { useKeyPress } from "../../hooks/key-press";

const noop = () => {};

const KeyboardNavigation = (props) => {
  const {
    nextKey,
    previousKey,
    onChange = noop,
    enabled = false,
    children,
    currentRef = 0,
  } = props;
  let refs = useRef([]);
  useEffect(() => {
    for (let index = 0; index < children.length; index++) {
      refs.current.push(createRef());
    }
  }, [children.length]);
  const handleNext = () => {
    if (!enabled) return;
    if (currentRef !== refs.current.length) {
      const newValue = currentRef + 1;
      onChange({ index: newValue, ref: refs.current[newValue] }, props);
    }
  };
  const handlePrevious = () => {
    if (!enabled) return;
    if (currentRef !== 0) {
      const newValue = currentRef - 1;
      onChange({ index: newValue, ref: refs.current[newValue] }, props);
    }
  };
  useKeyPress(nextKey, noop, handleNext);
  useKeyPress(previousKey, noop, handlePrevious);

  const childrenWithProps = toChildArray(children).map((child, index) =>
    cloneElement(child, { navRef: refs.current[index] })
  );
  return <Fragment>{childrenWithProps}</Fragment>;
};

export default memo(KeyboardNavigation);
