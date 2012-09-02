var pastes  = {},
    counter = 0;

exports.put = function (paste) {
  counter++;
  paste.id = counter;
  pastes[counter] = paste;
  return paste;
};

exports.get = function (id) {
  if (pastes[id]) {
    return pastes[id];
  } else {
    return false;
  }
  return pastes[id];
};

exports.latest = function (amt) {
  var latest = [],
      i      = counter;

  while (amt != 0) {
    if (pastes[i]) {
      latest.push(pastes[i]);
      amt--;
    } else {
      break;
    }
    i--;
  }
  
  return latest;
};