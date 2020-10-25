import { onDestroy, onMount } from 'svelte'; 

export const onKeydown = (targetKey, handler) => {
  let node;
  // If pressed key is our target key then set to true
  const downHandler = ({ key, keyCode, which }) => {
    let keycode;
    if (window.event) {
      keycode = keyCode;
    } else if (which) {
      keycode = which;
    }

    if (key === targetKey || keycode === targetKey) {
      handler();
    }
  };

  onMount(() => {
    node = window;
    // Add event listeners
    node.addEventListener("keydown", downHandler);
  })

  onDestroy(() => {
    if(node) {
      node.removeEventListener("keydown", downHandler);
      node = null;
    }
  })
}