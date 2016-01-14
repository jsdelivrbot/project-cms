export default function nextUrlMiddleware() {
  return (next) => (action) => {
    if (action.next_url) {
      //TODO react router method instead
      window.location.hash = action.next_url;
    }
    return next(action);
  };
}
