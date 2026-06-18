import * as profileModel from "../models/profileModel.js";

export async function getFullProfile() {
  const profile = await profileModel.getProfile() || {};
  const roles = await profileModel.getHeroRoles() || [];
  const stats = await profileModel.getHeroStats() || [];

  const rawProfileData = {
    ...profile,
    roles: roles.map(r => r.role_name),
    stats: stats.map(s => ({ value: s.value, label: s.label })),
    rawRoles: roles, // expose IDs for admin CRUD updates
    rawStats: stats
  };

  // self-healing structure for compatibility with frontend (flat vs nested in .settings)
  return {
    ...rawProfileData,
    settings: profile
  };
}

export async function updateProfileDetails(fields) {
  return await profileModel.updateProfile(fields);
}

// --- CRUD Hero Roles ---
export async function addHeroRole(roleName, displayOrder) {
  return await profileModel.createHeroRole(roleName, displayOrder);
}

export async function editHeroRole(id, roleName, displayOrder) {
  return await profileModel.updateHeroRole(id, roleName, displayOrder);
}

export async function removeHeroRole(id) {
  return await profileModel.deleteHeroRole(id);
}

// --- CRUD Hero Stats ---
export async function addHeroStat(value, label, displayOrder) {
  return await profileModel.createHeroStat(value, label, displayOrder);
}

export async function editHeroStat(id, value, label, displayOrder) {
  return await profileModel.updateHeroStat(id, value, label, displayOrder);
}

export async function removeHeroStat(id) {
  return await profileModel.deleteHeroStat(id);
}
