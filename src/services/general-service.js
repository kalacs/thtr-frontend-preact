export const getConfig = () => {
  return fetch(`${window.location.origin}/config`).then((response) =>
    response.json()
  );
};
