/* const getLinkedList = (arr) => {
  let start = {value: arr[0]};
  let pointer = start;
  const symbolsObj = {'☐': start};
  arr.slice(1).forEach((symbol) => {
    let node = {value: symbol};
    symbolDict[symbol] = node;
    pointer.next = node;
    pointer = node;
  })
  pointer.next = start;
  return symbolsObj;
} */


const meaning = {
  '•': 'todo',
  '○': 'appointment',
  '☐': 'task',
  '✓': 'complete',
  '→': 'move',
  '✕': 'cancel',
  'task': '☐',
  'appointment': '○',
  'todo': '•',
  'complete': '✓',
  'move': '→',
  'cancel':'✕'
}

export default meaning;
