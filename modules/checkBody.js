function checkBody(body, expectedNames) {
  for (let name of expectedNames) {
    if (body[name] === undefined || body[name] === "") return false;
  }
  //   if (
  //     body.email === undefined ||
  //     body.password == undefined ||
  //     body.email === "" ||
  //     body.password == ""
  //   ) {
  //     return false;
  //   }

  return true;
}

module.exports = { checkBody };
