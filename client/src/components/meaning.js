import React from 'react';

const meaning = {
  'todo-text':'•',
  'appointment-text':'○',
  'task-text': '☐',
  'complete-text':'✓',
  'move-text':'→',
  'cancel-text':'✕',
  'task':<svg width="20" height="20"><rect x="5" y="5" width="10" height="10" stroke="rgb(63, 63, 63)" stroke-width="1" fill="none" /></svg>,
  'appointment': <svg width="20" height="20"><circle cx="10" cy="10" r="5" stroke="rgb(63, 63, 63)" stroke-width="1" fill="none" /></svg>,
  'todo': <svg width="20" height="20"><circle cx="10" cy="10" r="2" fill="rgb(63, 63, 63)" /></svg>,
  'complete': <svg className="status-indicator" width="20" height="20"><polyline stroke="rgb(63, 63, 63)" stroke-width="1" fill="none" points="5,5 10,10 18,2"/></svg>,
  'move': <svg className="status-indicator" width="20" height="20"><polyline stroke="rgb(63, 63, 63)" stroke-width="1" fill="none" points="0, 10 20,10 17, 7"/><polyline stroke="rgb(63, 63, 63)" stroke-width="1" fill="none" points="20,10 17, 13"/></svg>,
  'cancel':<svg className="status-indicator" width="20" height="20"><polyline stroke="rgb(63, 63, 63)" stroke-width="1" fill="none" points="4,4 16,16"/><polyline stroke="rgb(63, 63, 63)" stroke-width="1" fill="none" points="4,16 16,4"/></svg>,
  'new': '',
}

export default meaning;
