import * as certsService from "../services/certsService.js";

export async function getCertificationsData(req, res, next) {
  try {
    const certifications = await certsService.getCertifications();
    res.json(certifications);
  } catch (error) {
    next(error);
  }
}

export async function createCertification(req, res, next) {
  const { title, issuer, date, credential_id, link, skills, icon_emoji, color_hex, display_order } = req.body;
  if (!title || !issuer || !date || !credential_id || !link) {
    return res.status(400).json({ error: "Missing required parameters: title, issuer, date, credential_id, and link are required." });
  }

  try {
    const cert = await certsService.addCertification({
      title,
      issuer,
      date,
      credential_id,
      link,
      skills,
      icon_emoji,
      color_hex,
      display_order
    });
    res.status(201).json({ message: "Certification catalog entry created.", certification: cert });
  } catch (error) {
    next(error);
  }
}

export async function updateCertification(req, res, next) {
  const { id } = req.params;
  try {
    const cert = await certsService.editCertification(id, req.body);
    res.json({ message: "Certification catalog entry updated.", certification: cert });
  } catch (error) {
    next(error);
  }
}

export async function deleteCertification(req, res, next) {
  const { id } = req.params;
  try {
    const cert = await certsService.removeCertification(id);
    res.json({ message: "Certification catalog entry purged.", certification: cert });
  } catch (error) {
    next(error);
  }
}
