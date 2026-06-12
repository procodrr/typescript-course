const roles = ["admin", "user", "guest", 4] as const;

const permissions = {
  admin: "Do everything",
  user: "Only can modify and view their data",
  guest: "Temp",
  4: "hi",
};

type Role = (typeof roles)[number];

function getPermissions(role: Role) {
  return permissions[role];
}

getPermissions(4);
