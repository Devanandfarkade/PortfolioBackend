import * as certsModel from "../models/certsModel.js";

export async function getCertifications() {
  return await certsModel.getAllCertifications();
}

export async function addCertification(certData) {
  return await certsModel.createCertification(certData);
}

export async function editCertification(id, certData) {
  return await certsModel.updateCertification(id, certData);
}

export async function removeCertification(id) {
  return await certsModel.deleteCertification(id);
}
