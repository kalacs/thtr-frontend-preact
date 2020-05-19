export const getConfig = () => {
  console.log(`${window.location.origin}/config`);
  return fetch(`${window.location.origin}/config`).then((response) =>
    response.json()
  );
};
