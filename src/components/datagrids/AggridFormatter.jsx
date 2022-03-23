const converterCapacity = (capacity) => {
  const unit = capacity.substring(capacity.length - 2);
  const value = capacity.substring(0, capacity.length - 2);
  if (unit === "Ki") {
    return String((Number(value) / 1000000).toFixed(0) + "Gi");
  } else {
    return capacity;
  }
};

const drawStatus = (status) => {
  switch (status) {
    case "Bound":
    case "true":
    case "True":
    case "Active":
      // Green
      return `<span class="status_ico status_01">${status}</span>`;
    case "Available":
    case "1":
      // Blue
      return `<span class="status_ico status_02">${status}</span>`;
    case "Pending":
      // Orange
      return `<span class="status_ico status_03">${status}</span>`;
    case "false":
    case "False":
      // Red
      return `<span class="status_ico status_04">${status}</span>`;
  }
};

export { converterCapacity, drawStatus };
