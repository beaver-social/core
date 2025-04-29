export function findObjectIdByName(objectChanges: any, name: string) {
  const object = objectChanges.find((obj: any) =>
    obj.objectType?.endsWith(`::${name}`)
  );

  const objectId = object?.objectId;

  if (typeof objectId != "string") {
    throw new Error(`Object with name ${name} not found`);
  }
  return objectId;
}
