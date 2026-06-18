import * as profileService from "../services/profileService.js";

export async function getProfile(req, res, next) {
  try {
    const data = await profileService.getFullProfile();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const profile = await profileService.updateProfileDetails(req.body);
    res.json({ message: "Profile updated successfully.", profile });
  } catch (error) {
    next(error);
  }
}

export async function uploadResume(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided for resume payload." });
  }

  try {
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const profile = await profileService.updateProfileDetails({ resume_url: fileUrl });
    
    res.json({
      message: "Resume PDF uploaded and updated successfully.",
      resumeUrl: fileUrl,
      profile
    });
  } catch (error) {
    next(error);
  }
}

// --- Hero Roles ---
export async function addRole(req, res, next) {
  const { roleName, displayOrder } = req.body;
  if (!roleName) return res.status(400).json({ error: "roleName parameter is required." });

  try {
    const role = await profileService.addHeroRole(roleName, displayOrder);
    res.status(201).json({ message: "Hero role created.", role });
  } catch (error) {
    next(error);
  }
}

export async function updateRole(req, res, next) {
  const { id } = req.params;
  const { roleName, displayOrder } = req.body;
  
  try {
    const role = await profileService.editHeroRole(id, roleName, displayOrder);
    res.json({ message: "Hero role updated.", role });
  } catch (error) {
    next(error);
  }
}

export async function deleteRole(req, res, next) {
  const { id } = req.params;
  try {
    const role = await profileService.removeHeroRole(id);
    res.json({ message: "Hero role purged.", role });
  } catch (error) {
    next(error);
  }
}

// --- Hero Stats ---
export async function addStat(req, res, next) {
  const { value, label, displayOrder } = req.body;
  if (!value || !label) return res.status(400).json({ error: "value and label are required." });

  try {
    const stat = await profileService.addHeroStat(value, label, displayOrder);
    res.status(201).json({ message: "Hero stat created.", stat });
  } catch (error) {
    next(error);
  }
}

export async function updateStat(req, res, next) {
  const { id } = req.params;
  const { value, label, displayOrder } = req.body;

  try {
    const stat = await profileService.editHeroStat(id, value, label, displayOrder);
    res.json({ message: "Hero stat updated.", stat });
  } catch (error) {
    next(error);
  }
}

export async function deleteStat(req, res, next) {
  const { id } = req.params;
  try {
    const stat = await profileService.removeHeroStat(id);
    res.json({ message: "Hero stat purged.", stat });
  } catch (error) {
    next(error);
  }
}
