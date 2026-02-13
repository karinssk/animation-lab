function cloneObject(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  if (typeof obj === 'function') return obj;
  if (Array.isArray(obj)) return obj.map(cloneObject);
  const proto = Object.getPrototypeOf(obj);
  const isPlainObject = proto === Object.prototype || proto === null;
  if (!isPlainObject) return obj;
  const result = Object.create(proto);
  for (const key of Reflect.ownKeys(obj)) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor && (descriptor.get || descriptor.set)) {
      Object.defineProperty(result, key, descriptor);
    } else {
      result[key] = cloneObject(obj[key]);
    }
  }
  return result;
}

const config = Object.freeze({
  generateBuildId: async () => null,
  turbopack: { root: '.' },
});

const cloned = cloneObject(config);
console.log('Original:', typeof config.generateBuildId);
console.log('Cloned:', typeof cloned.generateBuildId);
console.log('Cloned keys:', Object.keys(cloned));
