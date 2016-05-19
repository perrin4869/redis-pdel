export const name = 'pdel';
export const lua = `{{__LUA_PLACEHOLDER__}}`;
export const numberOfKeys = 1;
export function install(ioredis) {
  ioredis.defineCommand(name, {
    lua,
    numberOfKeys,
  });
}
