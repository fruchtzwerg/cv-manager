export const normalizeHref = (href: string) => {
  const regex = /^(?<protocol>https?:\/\/)?(?<host>.*)$/;
  const matches = href.match(regex);

  if (!matches || !matches.groups)
    throw new Error(`${href} is not a valid link.`);

  const { protocol, host } = matches.groups;

  return (protocol ?? 'https://') + host;
};
