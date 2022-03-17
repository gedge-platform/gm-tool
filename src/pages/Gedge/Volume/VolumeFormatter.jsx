const converterCapacity = (capacity) => {
    const unit = capacity.substring(capacity.length - 2);
    const value = capacity.substring(0, capacity.length - 2);
    if (unit === "Ki") {
        return String((Number(value) / 1000000).toFixed(0) + "Gi");
    } else {
        return capacity;
    }
};

export default converterCapacity;
