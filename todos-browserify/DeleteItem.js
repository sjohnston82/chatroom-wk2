const deleteItem = function () {
  const deletedItem = this.parentElement;
  deletedItem.remove();
};

module.exports = deleteItem;
