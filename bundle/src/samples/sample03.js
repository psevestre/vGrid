import {dummyDataGenerator} from 'data/dummyDataGenerator'

export class sample {
  static inject = [dummyDataGenerator];


  myCollection = [];
  myCurrentEntity = {};
  myGrid = {

  };

  onRowDraw (data) {
    if (data) {

      data.backgroundcolor = data.color;
      // data.avatarLetter = data.name.charAt(0);
      data.avatarLetter = data.name.charAt(0);
      data.phone="wowowow"
    }
  }


  constructor(dummyDataGenerator) {


    //this if just for giving us some data
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(100, (data) => {
      this.myCollection = data;
    this.collectionLength = this.myCollection.length;
  });

  }

  /********************************************************************
   *  COLLECTION MOD BUTTONS
   ********************************************************************/

  replaceBtn(x) {
    //generate and add
    this.dummyDataGenerator.reset();
    this.dummyDataGenerator.generateData(x, (data) => {
      this.myCollection = data;
    this.collectionLength = this.myCollection.length;
  })
  }

  addBtn(x, scrollBottom) {
    //generate and add
    this.dummyDataGenerator.generateData(x, (data) => {
      data.forEach((x) => {
      this.myCollection.push(x)
  })
    if(scrollBottom){
      this.myGrid.ctx.scrollBottomNext();
    }

    this.collectionLength = this.myCollection.length;
  })
  }


  insertOneBtn(){
    try {
      this.dummyDataGenerator.generateData(1, (data) => {
        this.myCollection.splice(2, 0, data[0])
    });
    } catch (e){
      console.log(e)
    }
  }

  insertFiveBtn(){
    try {
      for(var i = 0; i < 5; i++){
        this.dummyDataGenerator.generateData(1, (data) => {
          this.myCollection.splice(2, 0, data[0])
      });
      }
    } catch (e){
      console.log(e)
    }
  }


  removeFirstBtn() {
    this.myCollection.splice(0, 1);
    this.collectionLength = this.myCollection.length;
  }

  removeLastBtn() {
    this.myCollection.pop();
    this.collectionLength = this.myCollection.length;
  }

  removeFirstxBtn(x) {
    this.myCollection.splice(0, x);
    this.collectionLength = this.myCollection.length;

  }


  removeLastxBtn(x) {
    this.myCollection.splice(this.myCollection.length - x, x);
    this.collectionLength = this.myCollection.length;

  }



}
