export const formatBEMClassName = (block, element, modifier) => {
  const b = block ? `${block}__` : '';
  const e = element || '';
  const m = modifier ? `--${modifier}` : '';
  return `${b}${e}${m}`;
};
