class Player{
    constructor(musiclist){
        this.musiclist = musiclist;
        this.musicIndex = 0;
    }
    getMusic(){
        return this.musiclist[this.musicIndex]
    }
    next(){
        if(this.musicIndex == musiclist.length-1){
             this.musicIndex=0;
        }else{
            this.musicIndex++;
        }
    }
    previus(){
        if(this.musicIndex == 0){
            this.musicIndex = musiclist.length-1;
        }else{
            this.musicIndex--;
        }
    }
}