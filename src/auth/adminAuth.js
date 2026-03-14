const normalizeEmail = (value) => value?.trim().toLowerCase() || '';

const parseAdminUsers = () => {
  const rawAdminUsers = import.meta.env.VITE_ADMIN_USERS;
  const sharedPassword = import.meta.env.VITE_ADMIN_PASSWORD?.trim() || '';

  if (!rawAdminUsers) {
    return [];
  }

  const mapUser = (entry) => {
    if (typeof entry === 'string') {
      const email = normalizeEmail(entry);
      return email
        ? {
            email,
            password: sharedPassword,
            name: email,
          }
        : null;
    }

    if (entry && typeof entry === 'object') {
      const email = normalizeEmail(entry.email);
      if (!email) {
        return null;
      }

      return {
        email,
        password: `${entry.password ?? sharedPassword}`.trim(),
        name: entry.name?.trim() || email,
      };
    }

    return null;
  };

  try {
    const parsed = JSON.parse(rawAdminUsers);
    if (Array.isArray(parsed)) {
      return parsed.map(mapUser).filter(Boolean);
    }
  } catch {
    return rawAdminUsers
      .split(',')
      .map((entry) => mapUser(entry))
      .filter(Boolean);
  }

  return [];
};

export const getAdminUsers = () => parseAdminUsers();

export const validateAdminCredentials = ({ email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const trimmedPassword = password?.trim() || '';

  if (!normalizedEmail) {
    return null;
  }

  const matchedUser = parseAdminUsers().find((adminUser) => adminUser.email === normalizedEmail);

  if (!matchedUser) {
    return null;
  }

  if (matchedUser.password && matchedUser.password !== trimmedPassword) {
    return null;
  }

  return {
    email: matchedUser.email,
    name: matchedUser.name,
  };
};
