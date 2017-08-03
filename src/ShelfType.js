const ShelfType = {
  currentlyReading: {id: "currentlyReading", name: "Currently Reading"},
  wantToRead: {id: "wantToRead", name: "Want to Read"},
  read: {id: "read", name: "Read"},
  none: {id: "none", name: "None"}
};

ShelfType.all = [ShelfType.currentlyReading, ShelfType.wantToRead, ShelfType.read, ShelfType.none];
ShelfType.displayed = [ShelfType.currentlyReading, ShelfType.wantToRead, ShelfType.read]
ShelfType.getName = (id) => ShelfType.all.find(shelfType => shelfType.id === id).name;

export default ShelfType;
