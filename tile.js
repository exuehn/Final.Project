class Tile {
    
  //creating tiles
  constructor (texture, row, column, size) {

    this.texture = texture;
    this.row = row;
    this.column = column;
    this.size = size;
    
    this.x = column * size;
    this.y = row * size;

  }
    
  display () {
    
    if (this.texture !== null) {
      
      imageMode(CORNER);
      image(this.texture, this.x, this.y, this.size, this.size);
      
    }
    
  }

}