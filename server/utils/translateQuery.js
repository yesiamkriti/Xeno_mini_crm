// VERY basic translator — can be improved
function translateQuery(q) {
  if (!q || !q.rules) return {};

  const processRule = (rule) => {
    switch (rule.operator) {
      case '>': return { [rule.field]: { $gt: parseFloat(rule.value) } };
      case '<': return { [rule.field]: { $lt: parseFloat(rule.value) } };
      case '=': return { [rule.field]: rule.value };
      default: return {};
    }
  };

  const logic = q.combinator === 'and' ? '$and' : '$or';
  const conditions = q.rules.map(processRule);

  return { [logic]: conditions };
}

module.exports = translateQuery;
