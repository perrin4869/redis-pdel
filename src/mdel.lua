--!/usr/bin/env lua

local keys = redis.call("KEYS", KEYS[1])
for i, name in ipairs(keys) do
  redis.call("DEL", name)
end
if keys ~= nil then
  return #keys
else
  return 0
end
