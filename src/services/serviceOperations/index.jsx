import { prisma } from "@/lib/prisma";

export async function getAllData(tableName) {
  try {
    return await prisma[tableName].findMany();
  } catch (error) {
    console.error(`Database fetch failed: ${error.message}`);
    throw new Error(`Database fetch failed: ${error.message}`);
  }
}

export async function createNewData(tableName, newData) {
  try {
    return await prisma[tableName].create({ data: newData });
  } catch (error) {
    console.error(`Database insert failed: ${error.message}`);
    throw new Error(`Database insert failed: ${error.message}`);
  }
}

export async function updateDataByAny(tableName, where, newData) {
  try {
    return await prisma[tableName].update({
      where: where,
      data: newData,
    });
  } catch (error) {
    console.error(`Database update failed: ${error.message}`);
    throw new Error(`Database update failed: ${error.message}`);
  }
}

export async function deleteDataByAny(tableName, where) {
  try {
    return await prisma[tableName].delete({ where: where });
  } catch (error) {
    console.error(`Database delete failed: ${error.message}`);
    throw new Error(`Database delete failed: ${error.message}`);
  }
}

export default {
  getAllData,
  createNewData,
  updateDataByAny,
  deleteDataByAny,
};
