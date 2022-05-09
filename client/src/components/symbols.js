
const getLinkedList = (arr) => {
  let start = {value: arr[0]};
  let pointer = start;
  const symbolsObj = {'new': start};
  arr.forEach((symbol) => {
    let node = {value: symbol};
    symbolsObj[symbol] = node;
    pointer.next = node;
    pointer = node;
  })
  pointer.next = start;
  return symbolsObj;
}

const symbols = {
  todo: getLinkedList(['new', 'complete', 'move', 'cancel']),
  appointment: getLinkedList(['new', 'move', 'cancel']),
  task:  getLinkedList(['new', 'complete', 'move', 'cancel']),
}

export default symbols;