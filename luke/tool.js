const log = (str) => {
  const colors = ["black", "red", "green", "yellow", "blue", "purple", "cyan"];
  // 设置默认打印(需要给log()加上hint, 如: + / `` / +"") => +log("hello");
  const tmp = {
    [Symbol.toPrimitive]() {
      console.log(
        `\x1b[35m【${new Date().toLocaleString()}】\x1b[32m ${str} \x1b[0m`
      );
    },
  };

  colors.forEach((item, index) => {
    tmp[item] = () => {
      console.log(
        `\x1b[35m【${new Date().toLocaleString()}】\x1b[3${index}m ${str} \x1b[0m`
      );
    };
  });

  return tmp;
};

function range(start, end, step = 1) {
  const result = [];
  if (step === 0) {
    throw new Error("Step cannot be zero.");
  }
  if (start < end && step < 0) {
    throw new Error("Step must be positive for increasing range.");
  }
  if (start > end && step > 0) {
    throw new Error("Step must be negative for decreasing range.");
  }
  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    result.push(i);
  }
  return result;
}

function padNum(num, max) {
  return String(num).padStart(String(max).length, "0");
}

module.exports = {
  log,
  range,
  padNum,
};
