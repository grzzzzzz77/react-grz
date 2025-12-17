self.onmessage = ({ data }) => {
  const sortedData = data.sort((a: number, b: number) => a - b);
  self.postMessage(sortedData);
};
